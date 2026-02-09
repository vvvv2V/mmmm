import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoyaltyDashboard.css';

const LoyaltyDashboard = ({ userId, token }) => {
  const [loyaltyData, setLoyaltyData] = useState({
    points: 0,
    rewards: [],
    redeemHistory: []
  });
  const [selectedReward, setSelectedReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  const fetchLoyaltyData = async () => {
    try {
      setLoading(true);
      
      // Buscar saldo de pontos
      const pointsRes = await axios.get('/api/loyalty/balance', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Buscar recompensas disponíveis
      const rewardsRes = await axios.get('/api/loyalty/rewards', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLoyaltyData({
        points: pointsRes.data.points || 0,
        rewards: rewardsRes.data.rewards || [],
        redeemHistory: []
      });
    } catch (error) {
      console.error('Erro ao buscar dados de fidelidade:', error);
      setMessage('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (rewardId, pointsRequired) => {
    if (loyaltyData.points < pointsRequired) {
      setMessage('❌ Pontos insuficientes');
      return;
    }

    try {
      const res = await axios.post(
        '/api/loyalty/redeem',
        { pointsToRedeem: pointsRequired, rewardId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Recompensa resgatada com sucesso!');
      setSelectedReward(null);
      fetchLoyaltyData();
    } catch (error) {
      setMessage('❌ Erro ao resgatar');
    }
  };

  if (loading) {
    return <div className="loyalty-loading">Carregando...</div>;
  }

  return (
    <div className="loyalty-dashboard">
      <div className="loyalty-header">
        <h2>🎁 Programa de Fidelidade</h2>
        <div className="points-display">
          <div className="points-value">{loyaltyData.points}</div>
          <div className="points-label">Pontos Disponíveis</div>
        </div>
      </div>

      {message && (
        <div className={`loyalty-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="rewards-section">
        <h3>🏆 Recompensas Disponíveis</h3>
        <div className="rewards-grid">
          {loyaltyData.rewards.map((reward) => (
            <div key={reward.id} className="reward-card">
              <div className="reward-title">{reward.title}</div>
              <div className="reward-description">{reward.description}</div>
              <div className="reward-details">
                <span className="reward-points">
                  {reward.points_required} {reward.discount_percent ? '🏷️ %' : '⏱️ Horas'}
                </span>
                {reward.discount_percent && (
                  <span className="reward-value">{reward.discount_percent}% OFF</span>
                )}
                {reward.free_hours && (
                  <span className="reward-value">{reward.free_hours}h Grátis</span>
                )}
              </div>
              <button
                className={`redeem-btn ${
                  loyaltyData.points >= reward.points_required ? '' : 'disabled'
                }`}
                onClick={() => {
                  if (loyaltyData.points >= reward.points_required) {
                    setSelectedReward(reward);
                  }
                }}
                disabled={loyaltyData.points < reward.points_required}
              >
                {loyaltyData.points >= reward.points_required
                  ? 'Resgatar'
                  : `Faltam ${reward.points_required - loyaltyData.points}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedReward && (
        <div className="modal-overlay" onClick={() => setSelectedReward(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmar Resgate</h3>
            <p>Tem certeza que deseja resgatar <strong>{selectedReward.title}</strong>?</p>
            <p>Será debitado <strong>{selectedReward.points_required} pontos</strong></p>
            <div className="modal-actions">
              <button
                className="confirm-btn"
                onClick={() =>
                  handleRedeem(selectedReward.id, selectedReward.points_required)
                }
              >
                Confirmar
              </button>
              <button
                className="cancel-btn"
                onClick={() => setSelectedReward(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyDashboard;
