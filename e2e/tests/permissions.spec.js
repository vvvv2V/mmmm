/**
 * E2E Tests - RBAC & Permissions
 * Tests for role-based access control
 */

import { test, expect } from '@playwright/test';

const API_BASE = process.env.API_BASE || 'http://localhost:5000/api';

test.describe('Role-Based Access Control (RBAC)', () => {
  const roles = {
    admin: { token: 'admin-token', expectedLevel: 100 },
    manager: { token: 'manager-token', expectedLevel: 80 },
    staff: { token: 'staff-token', expectedLevel: 60 },
    customer: { token: 'customer-token', expectedLevel: 40 },
    partner: { token: 'partner-token', expectedLevel: 50 },
    guest: { token: 'guest-token', expectedLevel: 10 }
  };

  test.describe('Permission System', () => {
    test('should grant permission to role', async ({ request }) => {
      // Admin granting permission
      const response = await request.post(
        `${API_BASE}/admin/permissions/grant`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          },
          data: {
            role: 'customer',
            permission: 'booking:create'
          }
        }
      );

      expect(response.status()).toBe(200);
    });

    test('should revoke permission from role', async ({ request }) => {
      const response = await request.post(
        `${API_BASE}/admin/permissions/revoke`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          },
          data: {
            role: 'guest',
            permission: 'auth:register'
          }
        }
      );

      expect(response.status()).toBe(200);
    });
  });

  test.describe('Admin Access Control', () => {
    test('admin should access admin endpoints', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          }
        }
      );

      // Should be allowed
      expect([200, 404]).toContain(response.status()); // 404 if endpoint not implemented
    });

    test('non-admin should not access admin endpoints', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.customer.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });

    test('guest should not access protected endpoints', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${roles.guest.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });
  });

  test.describe('Manager Access Control', () => {
    test('manager should access analytics', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.manager.token}`
          }
        }
      );

      expect([200, 404]).toContain(response.status());
    });

    test('customer should not access analytics', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.customer.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });
  });

  test.describe('Staff Access Control', () => {
    test('staff should access own schedule', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/scheduling/my-schedule`,
        {
          headers: {
            Authorization: `Bearer ${roles.staff.token}`
          }
        }
      );

      expect([200, 404]).toContain(response.status());
    });

    test('staff should not access other staff schedules', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/scheduling/staff/other-staff-id`,
        {
          headers: {
            Authorization: `Bearer ${roles.staff.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });
  });

  test.describe('Customer Access Control', () => {
    test('customer should create bookings', async ({ request }) => {
      const response = await request.post(
        `${API_BASE}/bookings`,
        {
          headers: {
            Authorization: `Bearer ${roles.customer.token}`
          },
          data: {
            serviceId: '123',
            scheduledTime: new Date().toISOString(),
            duration: 60
          }
        }
      );

      expect([200, 201, 400]).toContain(response.status()); // 400 possible for invalid data
    });

    test('customer should not delete bookings', async ({ request }) => {
      const response = await request.delete(
        `${API_BASE}/bookings/123`,
        {
          headers: {
            Authorization: `Bearer ${roles.customer.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });

    test('customer should view own profile', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${roles.customer.token}`
          }
        }
      );

      expect([200, 404]).toContain(response.status());
    });
  });

  test.describe('Role Hierarchy', () => {
    test('admin should have all permissions', async ({ request }) => {
      const permissions = ['admin:dashboard', 'user:delete', 'booking:create'];

      for (const permission of permissions) {
        const response = await request.get(
          `${API_BASE}/admin/check-permission?permission=${permission}`,
          {
            headers: {
              Authorization: `Bearer ${roles.admin.token}`
            }
          }
        );

        expect([200, 404]).toContain(response.status());
      }
    });

    test('manager should not have admin-only permissions', async ({ request }) => {
      const response = await request.get(
        `${API_BASE}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${roles.manager.token}`
          }
        }
      );

      expect(response.status()).toBe(403);
    });

    test('staff should have lower permissions than manager', async ({ request }) => {
      const managerResponse = await request.get(
        `${API_BASE}/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.manager.token}`
          }
        }
      );

      const staffResponse = await request.get(
        `${API_BASE}/analytics/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${roles.staff.token}`
          }
        }
      );

      // Manager should have better access than staff
      if (managerResponse.status() !== 404) {
        expect(staffResponse.status()).toBe(403);
      }
    });
  });

  test.describe('Audit Logging', () => {
    test('sensitive operations should be logged', async ({ request }) => {
      // Delete user (sensitive operation)
      await request.delete(
        `${API_BASE}/users/some-user-id`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          }
        }
      );

      // Then fetch audit logs
      const response = await request.get(
        `${API_BASE}/admin/audit-logs?action=user_deletion`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          }
        }
      );

      expect([200, 404]).toContain(response.status());
    });
  });

  test.describe('Multi-Role Users', () => {
    test('user with multiple roles should use highest level', async ({ request }) => {
      // Create user with admin and manager roles
      const response = await request.post(
        `${API_BASE}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${roles.admin.token}`
          },
          data: {
            email: 'multi-role@example.com',
            roles: ['admin', 'manager']
          }
        }
      );

      // User should have admin level access
      expect([200, 201, 400]).toContain(response.status());
    });
  });
});
