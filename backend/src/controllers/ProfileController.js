/**
 * ProfileController.js
 * Gerencia perfis de usuários, avatares e dados pessoais
 */

const AvatarService = require('../services/AvatarService');
const CompanyService = require('../services/CompanyService');
const logger = require('../utils/logger');

class ProfileController {
  /**
   * Upload de avatar
   */
  static async uploadAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado' });
      }

      const userId = req.user?.id || req.body.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const result = await AvatarService.saveAvatar(
        userId,
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      res.json({
        success: true,
        message: 'Avatar atualizado com sucesso',
        data: result
      });
    } catch (error) {
      logger.error('Erro ao fazer upload de avatar:', error);
      res.status(500).json({ error: error.message || 'Erro ao fazer upload' });
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  static async updateProfile(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      const { name, phone, bio, social_links } = req.body;

      const result = await AvatarService.updateProfile(userId, {
        name,
        phone,
        bio,
        social_links
      });

      res.json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        data: result
      });
    } catch (error) {
      logger.error('Erro ao atualizar perfil:', error);
      res.status(500).json({ error: error.message || 'Erro ao atualizar perfil' });
    }
  }

  /**
   * Obter perfil público
   */
  static async getProfile(req, res) {
    try {
      const userId = req.params.userId || req.user?.id;
      if (!userId) {
        return res.status(400).json({ error: 'ID do usuário não fornecido' });
      }

      const profile = await AvatarService.getPublicProfile(userId);

      if (!profile || !profile.id) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({
        success: true,
        data: profile
      });
    } catch (error) {
      logger.error('Erro ao buscar perfil:', error);
      res.status(500).json({ error: error.message || 'Erro ao buscar perfil' });
    }
  }

  /**
   * Deletar avatar
   */
  static async deleteAvatar(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      await AvatarService.deleteAvatar(userId);

      res.json({
        success: true,
        message: 'Avatar removido com sucesso'
      });
    } catch (error) {
      logger.error('Erro ao deletar avatar:', error);
      res.status(500).json({ error: error.message || 'Erro ao deletar avatar' });
    }
  }

  /**
   * Obter informações da empresa
   */
  static async getCompanyInfo(req, res) {
    try {
      const isAdmin = req.user?.role === 'admin';
      
      let companyInfo;
      if (isAdmin) {
        // Admin vê tudo, incluindo dados bancários
        companyInfo = await CompanyService.getCompanyInfo();
      } else {
        // Usuários veem apenas dados públicos
        companyInfo = await CompanyService.getPublicInfo();
      }

      res.json({
        success: true,
        data: companyInfo
      });
    } catch (error) {
      logger.error('Erro ao buscar informações da empresa:', error);
      res.status(500).json({ error: error.message || 'Erro ao buscar informações' });
    }
  }

  /**
   * Atualizar informações da empresa (apenas admin)
   */
  static async updateCompanyInfo(req, res) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem atualizar informações da empresa' });
      }

      const result = await CompanyService.updateCompanyInfo(req.body);

      logger.info(`Informações da empresa atualizadas pelo admin ${req.user.id}`);

      res.json({
        success: true,
        message: 'Informações da empresa atualizadas',
        data: result
      });
    } catch (error) {
      logger.error('Erro ao atualizar informações da empresa:', error);
      res.status(500).json({ error: error.message || 'Erro ao atualizar informações' });
    }
  }

  /**
   * Obter dados bancários da empresa (apenas admin)
   */
  static async getBankingInfo(req, res) {
    try {
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar dados bancários' });
      }

      const bankingInfo = await CompanyService.getBankingInfo();

      res.json({
        success: true,
        data: bankingInfo
      });
    } catch (error) {
      logger.error('Erro ao buscar dados bancários:', error);
      res.status(500).json({ error: error.message || 'Erro ao buscar dados bancários' });
    }
  }
}

module.exports = ProfileController;
