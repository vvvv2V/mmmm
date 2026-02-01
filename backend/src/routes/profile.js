/**
 * Profile Routes
 * Gerenciar perfis, avatares e dados de empresa
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Configurar multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'));
    }
  }
});

// ===== PERFIL DO USUÁRIO =====

/**
 * GET /api/profile/:userId
 * Obter perfil público do usuário
 */
router.get('/profile/:userId', async (req, res) => {
  await ProfileController.getProfile(req, res);
});

/**
 * GET /api/profile/current
 * Obter perfil do usuário autenticado
 */
router.get('/profile/current', authenticateToken, async (req, res) => {
  req.params.userId = req.user.id;
  await ProfileController.getProfile(req, res);
});

/**
 * PUT /api/profile/update
 * Atualizar perfil do usuário autenticado
 */
router.put('/profile/update', authenticateToken, async (req, res) => {
  await ProfileController.updateProfile(req, res);
});

// ===== AVATAR =====

/**
 * POST /api/avatar/upload
 * Upload de avatar (multipart/form-data)
 */
router.post('/avatar/upload', authenticateToken, upload.single('avatar'), async (req, res) => {
  await ProfileController.uploadAvatar(req, res);
});

/**
 * DELETE /api/avatar
 * Remover avatar do usuário
 */
router.delete('/avatar', authenticateToken, async (req, res) => {
  await ProfileController.deleteAvatar(req, res);
});

// ===== INFORMAÇÕES DA EMPRESA =====

/**
 * GET /api/company/info
 * Obter informações da empresa (público ou completo se admin)
 */
router.get('/company/info', async (req, res) => {
  await ProfileController.getCompanyInfo(req, res);
});

/**
 * GET /api/company/banking (admin only)
 * Obter dados bancários da empresa
 */
router.get('/company/banking', authenticateToken, async (req, res) => {
  await ProfileController.getBankingInfo(req, res);
});

/**
 * PUT /api/company/info (admin only)
 * Atualizar informações da empresa
 */
router.put('/company/info', authenticateToken, async (req, res) => {
  await ProfileController.updateCompanyInfo(req, res);
});

// Error handler para multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    logger.error('Multer error:', error);
    return res.status(400).json({ error: 'Erro ao fazer upload: ' + error.message });
  }
  if (error) {
    logger.error('Upload error:', error);
    return res.status(400).json({ error: error.message });
  }
  next();
});

module.exports = router;
