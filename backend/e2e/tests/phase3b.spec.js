/**
 * E2E Tests for Phase 3B Features
 * Webhooks, Integrations, Payments, Email, 2FA
 */

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

let authToken = '';

test.describe('Phase 3B: Advanced Features', () => {
  test.beforeAll(async ({ request }) => {
    // Tenta login; se falhar, registra o usuário e tenta novamente
    let response = await request.post(`${API_URL}/auth/login`, {
      data: { email: 'test@example.com', password: 'Password123!' }
    });

    if (response.status() === 401 || response.status() === 404) {
      await request.post(`${API_URL}/auth/register`, {
        data: { email: 'test@example.com', password: 'Password123!', name: 'Test User' }
      }).catch(() => {});
      response = await request.post(`${API_URL}/auth/login`, {
        data: { email: 'test@example.com', password: 'Password123!' }
      });
    }

    if (response.ok()) {
      const data = await response.json();
      authToken = data.data.token;
    }
  });

  test.describe('Webhooks', () => {
    test('should register webhook', async ({ request }) => {
      const response = await request.post(`${API_URL}/webhooks`, {
        headers: { Authorization: `Bearer ${authToken}` },
        data: {
          url: 'https://webhook.example.com/events',
          events: ['booking.created', 'booking.cancelled'],
          secret: 'webhook_secret_key'
        }
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.id).toBeDefined();
      expect(data.data.secret).toBe('webhook_secret_key');
    });

    test('should list user webhooks', async ({ request }) => {
      const response = await request.get(`${API_URL}/webhooks`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data)).toBeTruthy();
    });

    // ... mais testes omitidos por brevidade (copiado do e2e/tests)
  });
});
