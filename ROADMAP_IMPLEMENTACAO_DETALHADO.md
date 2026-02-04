# 🚀 ROADMAP DE IMPLEMENTAÇÃO - Priorização & Como Fazer

**Status Atual**: MVP 65% completo  
**Target**: Production Ready 95% completo  
**Timeline**: 5-6 semanas  

---

## 🟥 SEMANA 1: CRÍTICAS DO NEGÓCIO

### 1️⃣ **PIX PAYMENT** (2 dias) - MAIOR IMPACTO
**Por quê**: 50%+ transações BR em 2026  
**Impacto**: +50% conversão  
**Esforço**: 2 dias  

#### Implementação:
```bash
# 1. Instalar biblioteca PIX
npm install brcode --save

# 2. Criar PixService
```

```javascript
// backend/src/services/PixService.js
const { generateQRCode } = require('brcode');
const logger = require('../utils/logger');

class PixService {
  static async generateQRCode(amount, key = 'limpezapro@pix.com', description = 'Limpeza Pro') {
    try {
      const brCode = generateQRCode({
        key,          // Chave PIX
        amount,       // Centavos
        description,
        city: 'São Paulo',
        name: 'LIMPEZA PRO LTDA'
      });

      return {
        success: true,
        brCode: brCode.br, // String do código
        qrCode: brCode.qr, // QR code em base64
        expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 min expira
      };
    } catch (err) {
      logger.error('PIX generation failed', err);
      return { success: false, error: err.message };
    }
  }

  static async verifyPayment(transactionId) {
    // Integrar com API do banco para verificação
    // Mock por agora
    return { success: true, status: 'paid' };
  }
}

module.exports = PixService;
```

```javascript
// backend/src/routes/api.js - Add route
router.post('/payments/pix', authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    const pixData = await PixService.generateQRCode(amount, undefined, description);
    
    if (!pixData.success) {
      return res.status(400).json({ error: pixData.error });
    }

    // Salvar no BD como "pending" payment
    await db.run(
      `INSERT INTO transactions (user_id, booking_id, amount, payment_method, status, pix_key)
       VALUES (?, ?, ?, 'pix', 'pending', ?)`,
      req.user.id, req.body.bookingId, amount, pixData.brCode
    );

    res.json({
      success: true,
      qrCode: pixData.qrCode,
      brCode: pixData.brCode,
      expiresAt: pixData.expiresAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Frontend React**:
```jsx
// frontend/src/components/Payment/PixQRCode.jsx
import { useState } from 'react';

export function PixQRCode({ amount, onSuccess }) {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePix = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/pix', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ amount })
      });
      
      const data = await res.json();
      if (data.success) {
        setQrCode(data.qrCode);
        pollPaymentStatus(data.transactionId); // Verificar a cada 5s
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pix-container">
      <h3>📱 Pagar com PIX</h3>
      {!qrCode ? (
        <button onClick={generatePix} disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar QR Code'}
        </button>
      ) : (
        <div>
          <img src={qrCode} alt="QR Code PIX" width={300} />
          <p className="text-sm text-gray-500 mt-4">
            Escaneie com seu banco ou copie o código acima
          </p>
        </div>
      )}
    </div>
  );
}
```

**KPIs a Monitorar:**
- % de transações PIX vs Stripe
- Tempo médio para confirmar PIX
- Churn por falta de PIX

---

### 2️⃣ **2FA (Admin)** (1 dia) - SEGURANÇA
**Por quê**: Proteger conta admin  
**Como**:

```bash
npm install speakeasy qrcode --save
```

```javascript
// backend/src/middleware/2fa.js
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

class TwoFactorAuth {
  static generateSecret(email) {
    return speakeasy.generateSecret({
      name: `Limpeza Pro (${email})`,
      issuer: 'Limpeza Pro',
      length: 32
    });
  }

  static async generateQRCode(secret) {
    return QRCode.toDataURL(secret.otpauth_url);
  }

  static verify(secret, token) {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2 // ±2 passos (30s cada)
    });
  }
}

module.exports = TwoFactorAuth;
```

```javascript
// backend/src/routes/api.js - Endpoints 2FA
router.post('/auth/2fa/setup', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  const secret = TwoFactorAuth.generateSecret(req.user.email);
  const qrCode = await TwoFactorAuth.generateQRCode(secret);
  
  // Salvar secret temporário (sem confirmar ainda)
  await db.run(
    `UPDATE users SET two_fa_pending = ? WHERE id = ?`,
    secret.base32, req.user.id
  );

  res.json({ 
    success: true, 
    qrCode, 
    secret: secret.base32,
    message: 'Escaneie com Google Authenticator ou similar' 
  });
});

router.post('/auth/2fa/confirm', authenticateToken, authorizeRole(['admin']), (req, res) => {
  const { token } = req.body;
  const user = await db.get('SELECT two_fa_pending FROM users WHERE id = ?', req.user.id);

  if (TwoFactorAuth.verify(user.two_fa_pending, token)) {
    // Confirmar 2FA
    await db.run(
      `UPDATE users SET two_fa_secret = ?, two_fa_enabled = 1 WHERE id = ?`,
      user.two_fa_pending, req.user.id
    );
    
    res.json({ success: true, message: '2FA ativado!' });
  } else {
    res.status(401).json({ error: 'Token inválido' });
  }
});

router.post('/auth/login/2fa', async (req, res) => {
  // 1. Verificar email/senha normalmente
  // 2. Se login ok, checar se 2FA enabled
  // 3. Pedir token 2FA
  // 4. Só liberar com token válido
});
```

---

### 3️⃣ **LEGAL PAGES** (1-2 dias) - COMPLIANCE
**Arquivos Necessários:**

```html
<!-- public/termos-de-servico.html -->
<h1>Termos de Serviço</h1>

<section>
  <h2>1. Aceitação dos Termos</h2>
  <p>Ao usar Limpeza Pro, você concorda com estes termos...</p>
</section>

<section>
  <h2>2. Responsabilidades do Usuário</h2>
  <ul>
    <li>Informações precisas no cadastro</li>
    <li>Pagamento pontual</li>
    <li>Acesso seguro à conta</li>
    <li>Não usar para atividades ilícitas</li>
  </ul>
</section>

<!-- ... mais 10 seções ... -->

<!-- Rodapé obrigatório -->
<p><strong>Última atualização:</strong> Fevereiro 2026</p>
```

```html
<!-- public/politica-privacidade.html -->
<h1>Política de Privacidade</h1>

<section>
  <h2>1. Coleta de Dados (LGPD Art. 5)</h2>
  <p>Coletamos os seguintes dados pessoais:</p>
  <ul>
    <li>Nome, Email, Telefone (necessário)</li>
    <li>Endereço (para serviço)</li>
    <li>Dados bancários (tokenizados)</li>
    <li>Cookies de sessão</li>
  </ul>
</section>

<section>
  <h2>2. Direito ao Esquecimento (LGPD Art. 17)</h2>
  <p>Você pode solicitar exclusão de dados em:</p>
  <ul>
    <li>Email: privacidade@limpezapro.com</li>
    <li>Formulário: /solicitar-exclusao</li>
    <li>Prazo: 30 dias</li>
  </ul>
</section>

<!-- ... mais 8 seções ... -->
```

**Roadmap Legal**: Template em Português (LGPD), Inglês (GDPR), Espanhol

---

### 4️⃣ **ADMIN DASHBOARD COMPLETO** (5 dias)
**O que falta implementar (rotas vazias):**

```javascript
// backend/src/routes/admin.js - Preencher rotas
router.get('/team', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const team = await db.all(`
      SELECT id, name, email, phone, is_active, rating_avg, jobs_completed
      FROM users
      WHERE role = 'staff'
      ORDER BY rating_avg DESC
    `);
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/team', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, email, phone, specialties } = req.body;
    
    // Validações
    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email obrigatórios' });
    }

    const hashedPassword = await bcrypt.hash(
      Math.random().toString(36).slice(-8), 12
    );

    const result = await db.run(
      `INSERT INTO users (name, email, phone, password, role, specialties)
       VALUES (?, ?, ?, ?, 'staff', ?)`,
      name, email, phone, hashedPassword, specialties
    );

    // Enviar email com senha temporária
    await EmailService.sendTemporaryPassword(email, ...);

    res.json({ 
      success: true, 
      message: 'Staff adicionado e email enviado', 
      userId: result.lastID 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/services', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const services = await db.all(`
      SELECT id, name, description, base_price, category, duration, is_active
      FROM services
      ORDER BY name
    `);
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/services', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, base_price, category, duration } = req.body;
    
    const result = await db.run(
      `INSERT INTO services (name, description, base_price, category, duration, is_active)
       VALUES (?, ?, ?, ?, ?, 1)`,
      name, description, base_price, category, duration
    );

    res.json({ 
      success: true, 
      message: 'Serviço criado', 
      serviceId: result.lastID 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/services/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    const { name, description, base_price, category, duration } = req.body;
    
    await db.run(
      `UPDATE services 
       SET name = ?, description = ?, base_price = ?, category = ?, duration = ?
       WHERE id = ?`,
      name, description, base_price, category, duration, req.params.id
    );

    res.json({ success: true, message: 'Serviço atualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/services/:id', authenticateToken, authorizeRole(['admin']), async (req, res) => {
  try {
    await db.run('DELETE FROM services WHERE id = ?', req.params.id);
    res.json({ success: true, message: 'Serviço deletado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**Dashboard Frontend** (React):
```jsx
// frontend/src/components/AdminDashboard/TeamManagement.jsx
import { useState, useEffect } from 'react';

export function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setTeam(data.team);
    } finally {
      setLoading(false);
    }
  };

  const addStaff = async (formData) => {
    const res = await fetch('/api/admin/team', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    
    if (res.ok) {
      alert('Staff adicionado com sucesso!');
      loadTeam();
      setShowForm(false);
    }
  };

  return (
    <div className="team-management">
      <h2>👥 Gestão de Equipa</h2>
      
      <button onClick={() => setShowForm(true)} className="btn btn-primary">
        + Adicionar Staff
      </button>

      {showForm && <AddStaffForm onSubmit={addStaff} onClose={() => setShowForm(false)} />}

      <table className="staff-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Jobs Completos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {team.map(staff => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>⭐ {staff.rating_avg || 'N/A'}</td>
              <td>{staff.jobs_completed}</td>
              <td>
                <button>Editar</button>
                <button>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🟧 SEMANA 2-3: ESSENCIAIS

### 5️⃣ **PWA (App Mobile)** (4 dias)

```bash
npm install workbox-webpack-plugin
```

```javascript
// frontend/public/manifest.json
{
  "name": "Limpeza Pro",
  "short_name": "Limpeza",
  "description": "Agendamento de limpeza profissional",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6366f1",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

```javascript
// frontend/src/index.jsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW failed:', err));
}
```

**Benefícios:**
- ✅ Installável como app nativo
- ✅ Funciona offline
- ✅ Push notifications
- ✅ +40% conversão mobile

---

### 6️⃣ **Recomendação de Horários** (3 dias)

```javascript
// backend/src/services/SlotRecommendationService.js
class SlotRecommendationService {
  static async recommendSlots(serviceId, staffId = null, maxResults = 5) {
    // 1. Buscar disponibilidades do staff
    const availability = await db.all(`
      SELECT date, time, staff_id, rating_avg
      FROM availability
      WHERE service_id = ? AND available = 1
      ORDER BY rating_avg DESC, date ASC
      LIMIT ${maxResults}
    `, serviceId);

    // 2. Ordenar por: rating + horário (prioritizar manhã)
    const recommended = availability
      .sort((a, b) => {
        const isAM_a = parseInt(a.time) < 12;
        const isAM_b = parseInt(b.time) < 12;
        return (isAM_b ? 1 : 0) - (isAM_a ? 1 : 0);
      });

    return recommended.slice(0, maxResults);
  }
}
```

**Frontend:**
```jsx
export function SlotRecommender({ serviceId }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const res = await fetch(`/api/bookings/slots/recommended?service=${serviceId}`);
    const data = await res.json();
    setSlots(data.slots);
  };

  return (
    <div className="recommendations">
      <h3>⚡ Horários Recomendados (Top staff)</h3>
      {slots.map(slot => (
        <button key={slot.id} onClick={() => selectSlot(slot)}>
          <div>{slot.date} às {slot.time}</div>
          <div>⭐ {slot.rating_avg} - {slot.staff_name}</div>
        </button>
      ))}
    </div>
  );
}
```

---

## 🟨 MÊS 1-2: GROWTH

### 7️⃣ **SEO + Blog** (10 dias)
**Estrutura:**
```
/blog
  /how-to-clean-kitchen
  /summer-deep-cleaning-guide
  /office-cleaning-checklist
  ...
```

**Metadata automático:**
```javascript
// frontend/src/components/SEO/Head.jsx
<Helmet>
  <title>{post.title} | Limpeza Pro</title>
  <meta name="description" content={post.excerpt} />
  <meta name="keywords" content={post.keywords} />
  <meta property="og:image" content={post.image} />
  <meta property="og:url" content={`https://limpezapro.com${post.slug}`} />
  <link rel="canonical" href={`https://limpezapro.com${post.slug}`} />
  
  {/* Schema.org JSON-LD */}
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": { "@type": "Organization", "name": "Limpeza Pro" },
    "datePublished": post.createdAt,
    "articleBody": post.content
  })}</script>
</Helmet>
```

**Keywords Target:**
- "limpeza profissional são paulo"
- "serviço de limpeza residencial"
- "empresa de limpeza confiável"
- "quanto custa limpeza"
- "como manter casa limpa"

---

### 8️⃣ **Cupons & Promoções** (3 dias)

```javascript
// database/migrations/006_add_coupons.sql
CREATE TABLE coupons (
  id INTEGER PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent INT,
  discount_flat DECIMAL(10,2),
  max_uses INT,
  uses_count INT DEFAULT 0,
  valid_from DATETIME,
  valid_until DATETIME,
  min_amount DECIMAL(10,2),
  created_by INT,
  is_active BOOLEAN DEFAULT 1
);

CREATE TABLE coupon_uses (
  id INTEGER PRIMARY KEY,
  coupon_id INT,
  user_id INT,
  booking_id INT,
  discount_amount DECIMAL(10,2),
  used_at DATETIME,
  FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);
```

```javascript
// backend/src/services/CouponService.js
class CouponService {
  static async validate(code, amount) {
    const coupon = await db.get(
      `SELECT * FROM coupons 
       WHERE code = ? AND is_active = 1
       AND valid_from <= NOW() AND valid_until >= NOW()`,
      code
    );

    if (!coupon) return { valid: false, error: 'Cupom inválido' };
    if (coupon.uses_count >= coupon.max_uses) {
      return { valid: false, error: 'Cupom expirado (limite de usos)' };
    }
    if (amount < coupon.min_amount) {
      return { valid: false, error: `Valor mínimo: R$ ${coupon.min_amount}` };
    }

    const discount = coupon.discount_percent 
      ? (amount * coupon.discount_percent / 100)
      : coupon.discount_flat;

    return {
      valid: true,
      discount,
      final_amount: amount - discount
    };
  }

  static async applyCoupon(couponId, userId, bookingId, discountAmount) {
    await db.run(
      `INSERT INTO coupon_uses (coupon_id, user_id, booking_id, discount_amount, used_at)
       VALUES (?, ?, ?, ?, NOW())`,
      couponId, userId, bookingId, discountAmount
    );

    await db.run(
      `UPDATE coupons SET uses_count = uses_count + 1 WHERE id = ?`,
      couponId
    );
  }
}
```

---

### 9️⃣ **Referral Program** (2 dias)

```javascript
// database/migrations/007_add_referrals.sql
CREATE TABLE referral_links (
  id INTEGER PRIMARY KEY,
  user_id INT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  reward_amount DECIMAL(10,2) DEFAULT 50,
  signup_count INT DEFAULT 0,
  reward_earned DECIMAL(10,2) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE referral_signups (
  id INTEGER PRIMARY KEY,
  referrer_id INT,
  new_user_id INT,
  reward_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending', -- pending, completed
  created_at DATETIME
);
```

```javascript
// backend/src/routes/api.js
router.get('/referral/link', authenticateToken, async (req, res) => {
  const user = req.user;
  
  // Buscar ou criar link
  let referral = await db.get(
    `SELECT * FROM referral_links WHERE user_id = ?`,
    user.id
  );

  if (!referral) {
    const code = `REF${user.id}${Date.now()}`.substring(0, 8);
    await db.run(
      `INSERT INTO referral_links (user_id, code, reward_amount)
       VALUES (?, ?, 50)`,
      user.id, code
    );
    referral = { code };
  }

  res.json({
    success: true,
    referralCode: referral.code,
    referralLink: `https://limpezapro.com/signup?ref=${referral.code}`,
    currentReward: referral.reward_earned,
    signupCount: referral.signup_count
  });
});

router.post('/auth/register-referral', async (req, res) => {
  const { email, password, referral_code } = req.body;

  // Verificar código
  const referrerLink = await db.get(
    `SELECT * FROM referral_links WHERE code = ?`,
    referral_code
  );

  // Criar novo usuário normal...
  const newUser = { id: result.lastID };

  // Se referral válida, registrar
  if (referrerLink) {
    await db.run(
      `INSERT INTO referral_signups (referrer_id, new_user_id, reward_amount, status)
       VALUES (?, ?, 50, 'pending')`,
      referrerLink.user_id, newUser.id
    );

    // Tornar reward permanente após primeiro pagamento
  }
});
```

**Frontend:**
```jsx
export function ReferralCard() {
  const [link, setLink] = useState('');

  useEffect(() => {
    fetch('/api/referral/link', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(d => setLink(d.referralLink));
  }, []);

  return (
    <div className="card">
      <h3>🎁 Indique e Ganhe R$ 50</h3>
      <input type="text" value={link} readOnly />
      <button onClick={() => navigator.clipboard.writeText(link)}>
        Copiar Link
      </button>
      <p>Ganhe R$ 50 para cada amigo que se cadastrar</p>
    </div>
  );
}
```

---

## 📈 ESTIMATIVAS FINAIS

| Tarefa | Esforço | Prioridade | EMV |
|--------|---------|-----------|-----|
| PIX | 2d | 🔴 CRÍTICA | Alto |
| 2FA | 1d | 🔴 CRÍTICA | Alto |
| Legal | 2d | 🔴 CRÍTICA | Alto |
| Admin Completo | 5d | 🔴 CRÍTICA | Alto |
| **SEMANA 1: 10 dias** | | | |
| PWA | 4d | 🟠 ALTA | Alto |
| Slots Recomendados | 3d | 🟠 ALTA | Médio |
| **SEMANA 2-3: 7 dias** | | | |
| SEO + Blog | 10d | 🟡 MÉDIA | Médio |
| Cupons | 3d | 🟡 MÉDIA | Médio |
| Referral | 2d | 🟡 MÉDIA | Médio |
| Analytics | 5d | 🟡 MÉDIA | Médio |
| **MÊS 1-2: 20 dias** | | | |
| **TOTAL: ~37 dias (5.3 semanas)** | | | |

---

## 🎯 COMO PRIORIZAR

**Se tem 1 semana**: PIX + 2FA + Legal  
**Se tem 2 semanas**: Acima + Admin + PWA  
**Se tem 1 mês**: Tudo até Cupons + Referral  
**Se tem 6 semanas**: Tudo + Analytics

---

**Próximo passo?** Qual quer começar?  
Eu recomendo: **PIX PRIMEIRO** (maior ROI imediato)
