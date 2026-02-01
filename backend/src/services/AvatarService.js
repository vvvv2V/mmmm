/**
 * AvatarService.js
 * Gerencia upload e armazenamento de avatares de usuários
 */

const fs = require('fs');
const path = require('path');
const db = require('../db');
const logger = require('../utils/logger');

const UPLOAD_DIR = path.join(__dirname, '../../uploads/avatars');
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Criar diretório de uploads se não existir
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

class AvatarService {
  /**
   * Salvar avatar do usuário
   */
  static async saveAvatar(userId, fileBuffer, fileName, mimeType) {
    try {
      // Validar tipo de arquivo
      if (!ALLOWED_TYPES.includes(mimeType)) {
        throw new Error('Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP');
      }

      // Validar tamanho
      if (fileBuffer.length > MAX_FILE_SIZE) {
        throw new Error('Arquivo muito grande. Máximo 5MB');
      }

      // Gerar nome único
      const timestamp = Date.now();
      const sanitized = fileName.replace(/[^a-zA-Z0-9.-]/g, '');
      const extension = path.extname(sanitized) || '.jpg';
      const uniqueName = `user-${userId}-${timestamp}${extension}`;
      const filePath = path.join(UPLOAD_DIR, uniqueName);
      const relativePath = `/uploads/avatars/${uniqueName}`;

      // Salvar arquivo
      fs.writeFileSync(filePath, fileBuffer);
      logger.info(`Avatar salvo: ${uniqueName}`);

      // Atualizar banco de dados
      return new Promise((resolve, reject) => {
        db.get().run(
          'UPDATE users SET avatar_url = ?, avatar_updated_at = datetime("now") WHERE id = ?',
          [relativePath, userId],
          function(err) {
            if (err) {
              logger.error('Erro ao atualizar avatar no banco:', err);
              reject(err);
            } else {
              logger.info(`Avatar do usuário ${userId} atualizado`);
              resolve({
                userId,
                avatar_url: relativePath,
                file_name: uniqueName,
                file_size: fileBuffer.length
              });
            }
          }
        );
      });
    } catch (error) {
      logger.error('Erro ao salvar avatar:', error);
      throw error;
    }
  }

  /**
   * Obter avatar do usuário
   */
  static async getAvatar(userId) {
    return new Promise((resolve, reject) => {
      db.get().get(
        'SELECT avatar_url, avatar_updated_at FROM users WHERE id = ?',
        [userId],
        (err, row) => {
          if (err) {
            logger.error('Erro ao buscar avatar:', err);
            reject(err);
          } else {
            resolve(row || {});
          }
        }
      );
    });
  }

  /**
   * Deletar avatar do usuário
   */
  static async deleteAvatar(userId) {
    try {
      // Buscar avatar atual
      const user = await this.getAvatar(userId);
      if (user.avatar_url) {
        // Remover arquivo
        const filePath = path.join(__dirname, '../../', user.avatar_url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          logger.info(`Avatar deletado: ${filePath}`);
        }
      }

      // Atualizar banco
      return new Promise((resolve, reject) => {
        db.get().run(
          'UPDATE users SET avatar_url = NULL, avatar_updated_at = NULL WHERE id = ?',
          [userId],
          function(err) {
            if (err) {
              logger.error('Erro ao deletar avatar:', err);
              reject(err);
            } else {
              logger.info(`Avatar do usuário ${userId} removido`);
              resolve({ success: true });
            }
          }
        );
      });
    } catch (error) {
      logger.error('Erro ao deletar avatar:', error);
      throw error;
    }
  }

  /**
   * Atualizar bio/dados do perfil do usuário
   */
  static async updateProfile(userId, profileData) {
    const { name, phone, bio, social_links } = profileData;

    return new Promise((resolve, reject) => {
      db.get().run(
        `UPDATE users SET 
          name = COALESCE(?, name),
          phone = COALESCE(?, phone),
          bio = COALESCE(?, bio),
          social_links = COALESCE(?, social_links),
          updated_at = datetime('now')
        WHERE id = ?`,
        [name, phone, bio, social_links ? JSON.stringify(social_links) : null, userId],
        function(err) {
          if (err) {
            logger.error('Erro ao atualizar perfil:', err);
            reject(err);
          } else {
            logger.info(`Perfil do usuário ${userId} atualizado`);
            resolve({
              userId,
              name,
              phone,
              bio,
              social_links
            });
          }
        }
      );
    });
  }

  /**
   * Obter perfil do usuário (público)
   */
  static async getPublicProfile(userId) {
    return new Promise((resolve, reject) => {
      db.get().get(
        `SELECT 
          id, 
          name, 
          phone, 
          bio, 
          avatar_url, 
          role,
          social_links
        FROM users WHERE id = ?`,
        [userId],
        (err, row) => {
          if (err) {
            logger.error('Erro ao buscar perfil:', err);
            reject(err);
          } else {
            if (row && row.social_links) {
              try {
                row.social_links = JSON.parse(row.social_links);
              } catch (e) {
                row.social_links = {};
              }
            }
            resolve(row || {});
          }
        }
      );
    });
  }
}

module.exports = AvatarService;
