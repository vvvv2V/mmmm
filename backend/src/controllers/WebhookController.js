/**
 * Webhook Controller
 * Manages webhook endpoints and delivery
 */

const express = require('express');
const WebhookService = require('../services/WebhookService');
const logger = require('../utils/logger');

const router = express.Router();

/**
 * @swagger
 * /webhooks:
 *   post:
 *     summary: Register new webhook
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               events:
 *                 type: array
 *               version:
 *                 type: string
 *     responses:
 *       201:
 *         description: Webhook registered
 */
router.post('/', async (req, res) => {
  try {
    const { url, events, version } = req.body;
    const userId = req.user.id;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    const result = await WebhookService.registerWebhook(userId, {
      url,
      events: events || ['*'],
      version: version || '1.0'
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    logger.error(`Webhook registration error: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks:
 *   get:
 *     summary: List user webhooks
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of webhooks
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const webhooks = await WebhookService.listWebhooks(userId);

    res.status(200).json({ success: true, data: webhooks });
  } catch (error) {
    logger.error(`Error listing webhooks: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/{id}:
 *   get:
 *     summary: Get webhook details
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Webhook details
 */
router.get('/:id', async (req, res) => {
  try {
    const webhook = await WebhookService.getWebhook(req.params.id);

    if (!webhook) {
      return res.status(404).json({ success: false, error: 'Webhook not found' });
    }

    res.status(200).json({ success: true, data: webhook });
  } catch (error) {
    logger.error(`Error getting webhook: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/{id}:
 *   patch:
 *     summary: Update webhook
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Webhook updated
 */
router.patch('/:id', async (req, res) => {
  try {
    const webhook = await WebhookService.updateWebhook(req.params.id, req.body);

    res.status(200).json({ success: true, data: webhook });
  } catch (error) {
    logger.error(`Error updating webhook: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/{id}:
 *   delete:
 *     summary: Delete webhook
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Webhook deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const success = await WebhookService.deleteWebhook(req.params.id);

    if (!success) {
      return res.status(404).json({ success: false, error: 'Webhook not found' });
    }

    res.status(200).json({ success: true, message: 'Webhook deleted' });
  } catch (error) {
    logger.error(`Error deleting webhook: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/{id}/test:
 *   post:
 *     summary: Test webhook delivery
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Test event delivered
 */
router.post('/:id/test', async (req, res) => {
  try {
    const delivery = await WebhookService.testWebhook(req.params.id);

    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    logger.error(`Error testing webhook: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/{id}/logs:
 *   get:
 *     summary: Get delivery logs
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Delivery logs
 */
router.get('/:id/logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await WebhookService.getDeliveryLogs(req.params.id, limit);

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    logger.error(`Error getting delivery logs: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/queue/dead-letter:
 *   get:
 *     summary: Get dead letter queue
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dead letter queue
 */
router.get('/queue/dead-letter', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const dlq = await WebhookService.getDeadLetterQueue(limit);

    res.status(200).json({ success: true, data: dlq });
  } catch (error) {
    logger.error(`Error getting DLQ: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /webhooks/stats:
 *   get:
 *     summary: Get webhook statistics
 *     tags:
 *       - Webhooks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Webhook statistics
 */
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await WebhookService.getStats();

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    logger.error(`Error getting stats: ${error.message}`);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
