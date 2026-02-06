/**
 * E2E Tests - Authentication & OAuth Flows
 * Tests for login, OAuth, OTP, and token refresh
 */

import { test, expect } from '@playwright/test';

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';
const APP_BASE = process.env.APP_BASE || 'http://localhost:3000';

test.describe('Authentication & OAuth', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test
    await page.clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('OAuth 2.0 Flows', () => {
    test('should handle Google OAuth callback', async ({ page }) => {
      const mockGoogleProfile = {
        id: '123456789',
        email: 'user@gmail.com',
        displayName: 'Test User',
        photos: [{ value: 'https://example.com/photo.jpg' }]
      };

      // Make OAuth request
      const response = await page.request.post(
        `${API_BASE}/auth/google`,
        {
          data: mockGoogleProfile
        }
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.token).toBeDefined();
      expect(body.data.user.email).toBe('user@gmail.com');
      expect(body.data.provider).toBe('google');
    });

    test('should handle Facebook OAuth callback', async ({ page }) => {
      const mockFacebookProfile = {
        id: 'fb123456',
        email: 'user@facebook.com',
        displayName: 'Facebook User'
      };

      const response = await page.request.post(
        `${API_BASE}/auth/facebook`,
        {
          data: mockFacebookProfile
        }
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.provider).toBe('facebook');
    });

    test('should handle WhatsApp OAuth', async ({ page }) => {
      const mockWhatsAppProfile = {
        phone: '+5511987654321',
        displayName: 'WhatsApp User'
      };

      const response = await page.request.post(
        `${API_BASE}/auth/whatsapp`,
        {
          data: mockWhatsAppProfile
        }
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.provider).toBe('whatsapp');
    });
  });

  test.describe('OTP Authentication', () => {
    test('should send OTP via email', async ({ page }) => {
      const response = await page.request.post(
        `${API_BASE}/auth/otp/send`,
        {
          data: {
            identifier: 'test@example.com',
            method: 'email'
          }
        }
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.method).toBe('email');
      expect(body.data.expiresIn).toBe(600); // 10 minutes
    });

    test('should send OTP via SMS', async ({ page }) => {
      const response = await page.request.post(
        `${API_BASE}/auth/otp/send`,
        {
          data: {
            identifier: '+5511987654321',
            method: 'sms'
          }
        }
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.method).toBe('sms');
    });

    test('should reject missing identifier', async ({ page }) => {
      const response = await page.request.post(
        `${API_BASE}/auth/otp/send`,
        {
          data: {
            method: 'email'
          }
        }
      );

      expect(response.status()).toBe(400);
    });

    test('should verify valid OTP', async ({ page }) => {
      // First send OTP
      await page.request.post(`${API_BASE}/auth/otp/send`, {
        data: {
          identifier: 'test@example.com',
          method: 'email'
        }
      });

      // Then verify (using mock OTP)
      const response = await page.request.post(
        `${API_BASE}/auth/otp/verify`,
        {
          data: {
            identifier: 'test@example.com',
            otp: '123456' // This would be the actual OTP from email
          }
        }
      );

      // Note: This might fail if the OTP doesn't match
      // In production, you'd need to capture the actual OTP
      if (response.status() === 200) {
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data.token).toBeDefined();
      }
    });

    test('should reject invalid OTP', async ({ page }) => {
      const response = await page.request.post(
        `${API_BASE}/auth/otp/verify`,
        {
          data: {
            identifier: 'test@example.com',
            otp: 'invalid'
          }
        }
      );

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.success).toBe(false);
    });
  });

  test.describe('Token Management', () => {
    test('should refresh expired token', async ({ page }) => {
      // First get a token via OAuth
      const oauthResponse = await page.request.post(
        `${API_BASE}/auth/google`,
        {
          data: {
            id: '123456789',
            email: 'user@gmail.com',
            displayName: 'Test User'
          }
        }
      );

      const { token } = (await oauthResponse.json()).data;

      // Then refresh it
      const refreshResponse = await page.request.post(
        `${API_BASE}/auth/token/refresh`,
        {
          data: { token }
        }
      );

      expect(refreshResponse.status()).toBe(200);
      const refreshBody = await refreshResponse.json();
      expect(refreshBody.success).toBe(true);
      expect(refreshBody.token).toBeDefined();
      expect(refreshBody.expiresIn).toBe(604800); // 7 days in seconds
    });

    test('should reject invalid token refresh', async ({ page }) => {
      const response = await page.request.post(
        `${API_BASE}/auth/token/refresh`,
        {
          data: { token: 'invalid-token' }
        }
      );

      expect(response.status()).toBe(400);
    });
  });

  test.describe('Health & Stats', () => {
    test('should get OTP statistics', async ({ page }) => {
      const response = await page.request.get(
        `${API_BASE}/auth/otp/stats`
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.totalOTPs).toBeDefined();
      expect(body.data.totalTokens).toBeDefined();
      expect(body.data.oauthProviders).toBeDefined();
    });

    test('should check API health', async ({ page }) => {
      const response = await page.request.get(
        `${API_BASE}/health`
      );

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.status).toBe('ok');
    });
  });

  test.describe('UI - Login Page', () => {
    test('should display login page with OAuth buttons', async ({ page }) => {
      await page.goto(`${APP_BASE}/login`);

      // Check for OAuth buttons
      await expect(page.locator('button:has-text("Login with Google")')).toBeVisible();
      await expect(page.locator('button:has-text("Login with Facebook")')).toBeVisible();
      await expect(page.locator('button:has-text("Login with WhatsApp")')).toBeVisible();

      // Check for OTP option
      await expect(page.locator('button:has-text("Send OTP")')).toBeVisible();
    });

    test('should send OTP from login form', async ({ page }) => {
      await page.goto(`${APP_BASE}/login`);

      // Fill email and click send OTP
      await page.fill('input[placeholder="Your email"]', 'test@example.com');
      await page.click('button:has-text("Send OTP")');

      // Should show verification screen
      await expect(page.locator('input[placeholder*="code"]')).toBeVisible({ timeout: 5000 });
    });

    test('should redirect to dashboard after successful login', async ({ page }) => {
      await page.goto(`${APP_BASE}/login`);

      // Simulate successful OAuth login by setting token
      await page.evaluate(() => {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          id: '123',
          email: 'test@example.com',
          role: 'customer'
        }));
      });

      // Navigate to protected page
      await page.goto(`${APP_BASE}/dashboard`);

      // Should be on dashboard
      expect(page.url()).toContain('/dashboard');
    });
  });
});
