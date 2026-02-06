/**
 * Email Queue Dashboard
 * 
 * Dashboard web para monitorar filas de emails em tempo real
 * Baseado em Bull Board (https://github.com/felixmosh/bull-board)
 * 
 * Acesso: http://localhost:3001/queues (durante desenvolvimento)
 */

const express = require('express');
const { createBullBoard } = require('@bull-board/express');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const EmailQueueService = require('../services/EmailQueueService');
const logger = require('../utils/logger');

/**
 * Registrar dashboard Bull Board em uma aplicação Express
 * 
 * Uso:
 * const app = express();
 * setupEmailQueueDashboard(app, '/queues'); // Dashboard em http://localhost:3000/queues
 * 
 * @param {express.Application} app - Aplicação Express
 * @param {string} basePath - Caminho base do dashboard (padrão: /queues)
 */
function setupEmailQueueDashboard(app, basePath = '/queues') {
  try {
    // Criar adaptador Bull Board
    const bullBoardAdapters = [
      new BullAdapter(EmailQueueService.queue),
    ];

    // Criar dashboard
    const { router } = createBullBoard({
      queues: bullBoardAdapters,
      serverAdapter: {
        baseUrl: basePath,
      },
    });

    // Registrar rotas
    app.use(basePath, router);

    logger.info(`✅ Dashboard de filas disponível em http://localhost:${process.env.PORT || 3001}${basePath}`);

    // Retornar router para propósitos de teste/desacoplamento
    return router;
  } catch (error) {
    logger.error('❌ Erro ao configurar dashboard de filas', { error: error.message });
    // Continuar sem dashboard se falhar
    return null;
  }
}

module.exports = {
  setupEmailQueueDashboard,
};
