/**
 * Webhook Service
 * Advanced webhook delivery with retry logic, signing, versioning
 */

const logger = require('../utils/logger');
const crypto = require('crypto');

class WebhookService {
  constructor() {
    this.webhooks = new Map();
    this.eventQueue = [];
    this.deliveryLog = new Map();
    this.deadLetterQueue = [];
    this.retryState = new Map();
  }

  /**
   * Register webhook endpoint
   */
  async registerWebhook(userId, config) {
    try {
      const webhookId = crypto.randomUUID();
      const secret = crypto.randomBytes(32).toString('hex');

      const webhook = {
        id: webhookId,
        userId,
        url: config.url,
        events: config.events || ['*'],
        secret,
        version: config.version || '1.0',
        active: true,
        headers: config.headers || {},
        createdAt: new Date(),
        updatedAt: new Date(),
        stats: {
          total: 0,
          successful: 0,
          failed: 0,
          retried: 0
        }
      };

      this.webhooks.set(webhookId, webhook);

      logger.info(`Webhook registered: ${webhookId} for user: ${userId}`);
      return { webhookId, secret };
    } catch (error) {
      logger.error(`Error registering webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Trigger webhook event
   */
  async triggerEvent(eventType, data, metadata = {}) {
    try {
      const event = {
        id: crypto.randomUUID(),
        type: eventType,
        data,
        metadata,
        timestamp: new Date(),
        deliveries: []
      };

      this.eventQueue.push(event);

      // Find matching webhooks
      for (const [webhookId, webhook] of this.webhooks.entries()) {
        if (!webhook.active) continue;

        if (webhook.events.includes('*') || webhook.events.includes(eventType)) {
          // Queue delivery
          await this.queueDelivery(webhook, event);
        }
      }

      logger.info(`Event triggered: ${eventType} (${event.id})`);
      return event.id;
    } catch (error) {
      logger.error(`Error triggering event: ${error.message}`);
      throw error;
    }
  }

  /**
   * Queue webhook delivery with retry
   */
  async queueDelivery(webhook, event) {
    try {
      const delivery = {
        id: crypto.randomUUID(),
        webhookId: webhook.id,
        eventId: event.id,
        attempt: 1,
        maxAttempts: 5,
        status: 'pending',
        nextRetry: new Date(),
        createdAt: new Date()
      };

      await this.sendWebhook(webhook, event, delivery);
    } catch (error) {
      logger.error(`Error queueing delivery: ${error.message}`);
    }
  }

  /**
   * Send webhook with signature
   */
  async sendWebhook(webhook, event, delivery) {
    try {
      const payload = this._preparePayload(webhook.version, event);
      const signature = this._generateSignature(webhook.secret, payload);

      const headers = {
        'Content-Type': 'application/json',
        'X-Webhook-ID': webhook.id,
        'X-Event-ID': event.id,
        'X-Delivery-ID': delivery.id,
        'X-Signature': `sha256=${signature}`,
        'X-Webhook-Version': webhook.version,
        'X-Timestamp': new Date().toISOString(),
        ...webhook.headers
      };

      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        timeout: 30000
      });

      delivery.status = response.ok ? 'success' : 'failed';
      delivery.statusCode = response.status;
      delivery.completedAt = new Date();

      if (response.ok) {
        webhook.stats.successful++;
        this._logDelivery(webhook.id, delivery);
        logger.info(`Webhook delivered: ${webhook.id} → event: ${event.id}`);
      } else {
        webhook.stats.failed++;
        await this._handleFailure(webhook, event, delivery);
      }
    } catch (error) {
      logger.error(`Webhook delivery error: ${error.message}`);
      webhook.stats.failed++;
      await this._handleFailure(webhook, event, delivery);
    }
  }

  /**
   * Handle failed delivery with exponential backoff
   */
  async _handleFailure(webhook, event, delivery) {
    try {
      if (delivery.attempt < delivery.maxAttempts) {
        // Exponential backoff: 2^attempt minutes
        const backoffMinutes = Math.pow(2, delivery.attempt);
        const nextRetry = new Date(Date.now() + backoffMinutes * 60 * 1000);

        delivery.attempt++;
        delivery.status = 'scheduled_retry';
        delivery.nextRetry = nextRetry;
        webhook.stats.retried++;

        this.retryState.set(delivery.id, {
          webhook,
          event,
          delivery
        });

        logger.info(`Scheduled retry for webhook ${webhook.id}: attempt ${delivery.attempt} at ${nextRetry}`);
      } else {
        // Move to dead letter queue
        delivery.status = 'dead_lettered';
        this.deadLetterQueue.push({
          webhook,
          event,
          delivery,
          timestamp: new Date()
        });

        logger.warn(`Webhook moved to DLQ: ${webhook.id} after ${delivery.maxAttempts} attempts`);
      }

      this._logDelivery(webhook.id, delivery);
    } catch (error) {
      logger.error(`Error handling webhook failure: ${error.message}`);
    }
  }

  /**
   * Process retry queue
   */
  async processRetries() {
    try {
      const now = new Date();

      for (const [deliveryId, state] of this.retryState.entries()) {
        if (state.delivery.nextRetry <= now) {
          await this.sendWebhook(state.webhook, state.event, state.delivery);

          if (state.delivery.status !== 'scheduled_retry') {
            this.retryState.delete(deliveryId);
          }
        }
      }
    } catch (error) {
      logger.error(`Error processing retries: ${error.message}`);
    }
  }

  /**
   * Update webhook configuration
   */
  async updateWebhook(webhookId, updates) {
    try {
      const webhook = this.webhooks.get(webhookId);
      if (!webhook) throw new Error('Webhook not found');

      Object.assign(webhook, updates, { updatedAt: new Date() });
      logger.info(`Webhook updated: ${webhookId}`);
      return webhook;
    } catch (error) {
      logger.error(`Error updating webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete webhook
   */
  async deleteWebhook(webhookId) {
    try {
      this.webhooks.delete(webhookId);
      logger.info(`Webhook deleted: ${webhookId}`);
      return true;
    } catch (error) {
      logger.error(`Error deleting webhook: ${error.message}`);
      return false;
    }
  }

  /**
   * Get webhook by ID
   */
  async getWebhook(webhookId) {
    return this.webhooks.get(webhookId);
  }

  /**
   * List webhooks for user
   */
  async listWebhooks(userId) {
    try {
      const userWebhooks = [];
      for (const [id, webhook] of this.webhooks.entries()) {
        if (webhook.userId === userId) {
          userWebhooks.push(webhook);
        }
      }
      return userWebhooks;
    } catch (error) {
      logger.error(`Error listing webhooks: ${error.message}`);
      return [];
    }
  }

  /**
   * Get delivery logs
   */
  async getDeliveryLogs(webhookId, limit = 50) {
    try {
      const logs = this.deliveryLog.get(webhookId) || [];
      return logs.slice(-limit);
    } catch (error) {
      logger.error(`Error getting delivery logs: ${error.message}`);
      return [];
    }
  }

  /**
   * Get dead letter queue
   */
  async getDeadLetterQueue(limit = 100) {
    try {
      return this.deadLetterQueue.slice(-limit);
    } catch (error) {
      logger.error(`Error getting DLQ: ${error.message}`);
      return [];
    }
  }

  /**
   * Test webhook delivery
   */
  async testWebhook(webhookId) {
    try {
      const webhook = this.webhooks.get(webhookId);
      if (!webhook) throw new Error('Webhook not found');

      const testEvent = {
        id: crypto.randomUUID(),
        type: 'test_event',
        data: { message: 'Webhook test delivery' },
        timestamp: new Date()
      };

      const delivery = {
        id: crypto.randomUUID(),
        webhookId,
        eventId: testEvent.id,
        attempt: 1,
        maxAttempts: 1,
        status: 'pending',
        createdAt: new Date()
      };

      await this.sendWebhook(webhook, testEvent, delivery);
      return delivery;
    } catch (error) {
      logger.error(`Error testing webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate HMAC signature
   */
  _generateSignature(secret, payload) {
    const message = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return crypto
      .createHmac('sha256', secret)
      .update(message)
      .digest('hex');
  }

  /**
   * Verify webhook signature
   */
  verifySignature(secret, payload, signature) {
    const expectedSignature = this._generateSignature(secret, payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(`sha256=${expectedSignature}`)
    );
  }

  /**
   * Prepare payload based on version
   */
  _preparePayload(version, event) {
    if (version === '2.0') {
      return {
        event: {
          id: event.id,
          type: event.type,
          timestamp: event.timestamp.toISOString(),
          version: '2.0'
        },
        data: event.data,
        metadata: event.metadata
      };
    }

    // Version 1.0 (default)
    return {
      id: event.id,
      type: event.type,
      timestamp: event.timestamp.toISOString(),
      data: event.data
    };
  }

  /**
   * Log delivery
   */
  _logDelivery(webhookId, delivery) {
    if (!this.deliveryLog.has(webhookId)) {
      this.deliveryLog.set(webhookId, []);
    }
    this.deliveryLog.get(webhookId).push(delivery);
  }

  /**
   * Get webhook statistics
   */
  async getStats() {
    try {
      const stats = {
        totalWebhooks: this.webhooks.size,
        activeWebhooks: Array.from(this.webhooks.values()).filter(w => w.active).length,
        eventQueueSize: this.eventQueue.length,
        retryQueueSize: this.retryState.size,
        deadLetterQueueSize: this.deadLetterQueue.length,
        webhookStats: {}
      };

      for (const [id, webhook] of this.webhooks.entries()) {
        stats.webhookStats[id] = webhook.stats;
      }

      return stats;
    } catch (error) {
      logger.error(`Error getting stats: ${error.message}`);
      return {};
    }
  }
}

module.exports = new WebhookService();
