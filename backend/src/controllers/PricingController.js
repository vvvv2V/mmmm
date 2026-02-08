/**
 * Pricing Controller
 * Endpoint para cálculo dinâmico de preços
 * GET /api/pricing/calculate?serviceId=1&date=2024-02-15&time=14:00
 */

const PricingService = require('../services/PricingService');
const logger = require('../utils/logger');
const { getDb } = require('../db/sqlite');

class PricingController {
  /**
   * POST /api/pricing/calculate
   * Calcula preço dinâmico para um agendamento
   *
   * Body:
   * {
   *   serviceId: number (ou array de serviceIds),
   *   date: "2024-02-15",
   *   time: "14:00",
   *   userId: number (opcional, para calcular desconto lealdade),
   *   metragem: number (opcional),
   *   cleaningType: "standard|deep|move_in_out|commercial",
   *   frequency: "once|weekly|biweekly|monthly",
   *   urgency: "normal|express|emergency"
   * }
   */
  async calculatePrice(req, res) {
    try {
      const { serviceId, date, time, userId, metragem, cleaningType = 'standard', frequency = 'once', urgency = 'normal' } = req.body;

      if (!serviceId || !date || !time) {
        return res.status(400).json({
          error: 'Missing required parameters: serviceId, date, time',
          code: 'MISSING_PARAMS'
        });
      }

      const db = await getDb();
      const serviceIds = Array.isArray(serviceId) ? serviceId : [serviceId];

      // Buscar preços base dos serviços
      const services = await new Promise((resolve, reject) => {
        const placeholders = serviceIds.map(() => '?').join(',');
        db.all(
          `SELECT id, name, base_price FROM services WHERE id IN (${placeholders})`,
          serviceIds,
          (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
          }
        );
      });

      if (services.length === 0) {
        return res.status(404).json({
          error: 'Services not found',
          code: 'NOT_FOUND'
        });
      }

      // Calcular preço dinâmico
      const pricingResult = await PricingService.calculateDynamicPrice({
        basePrice: services.reduce((sum, s) => sum + (s.base_price || 0), 0),
        services: services.map(s => ({ basePrice: s.base_price, name: s.name })),
        date,
        time,
        userId,
        metragem,
        cleaningType,
        frequency,
        urgency,
        isNewCustomer: userId ? await this.isNewCustomer(db, userId) : false,
        daysUntilService: this.calculateDaysUntilService(date)
      });

      // Retornar resultado com breakdown
      return res.json({
        success: true,
        pricing: pricingResult,
        services: services.map(s => ({
          id: s.id,
          name: s.name,
          basePrice: s.base_price
        })),
        factors: {
          date,
          time,
          cleaningType,
          frequency,
          urgency,
          hasLoyalty: userId ? true : false
        }
      });
    } catch (error) {
      logger.error('Pricing calculation error:', error);
      return res.status(500).json({
        error: 'Failed to calculate pricing',
        code: 'CALCULATION_ERROR'
      });
    }
  }

  /**
   * GET /api/pricing/simulate
   * Simula múltiplas opções de preço
   */
  async simulatePriceOptions(req, res) {
    try {
      const { serviceId, date, time, userId } = req.query;

      if (!serviceId || !date || !time) {
        return res.status(400).json({
          error: 'Missing required parameters',
          code: 'MISSING_PARAMS'
        });
      }

      const db = await getDb();
      const service = await new Promise((resolve, reject) => {
        db.get('SELECT id, name, base_price FROM services WHERE id = ?', [serviceId], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }

      const options = await PricingService.simulatePriceOptions({
        basePrice: service.base_price,
        services: [{ basePrice: service.base_price, name: service.name }],
        date,
        time,
        userId,
        isNewCustomer: userId ? await this.isNewCustomer(db, userId) : false,
        daysUntilService: this.calculateDaysUntilService(date)
      });

      return res.json({
        success: true,
        service: {
          id: service.id,
          name: service.name,
          basePrice: service.base_price
        },
        options
      });
    } catch (error) {
      logger.error('Price simulation error:', error);
      return res.status(500).json({
        error: 'Failed to simulate pricing',
        code: 'SIMULATION_ERROR'
      });
    }
  }

  /**
   * Verificar se usuário é novo
   */
  async isNewCustomer(db, userId) {
    const result = await new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM bookings WHERE user_id = ? AND status = ?', [userId, 'completed'], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    return !result || result.count === 0;
  }

  /**
   * Calcular dias até o serviço
   */
  calculateDaysUntilService(dateStr) {
    try {
      const bookingDate = new Date(dateStr);
      const today = new Date();
      const diffTime = bookingDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(diffDays, 0);
    } catch (error) {
      return 0;
    }
  }
}

module.exports = new PricingController();
