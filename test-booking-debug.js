#!/usr/bin/env node
const http = require('http');

function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let chunks = [];
      res.on('data', (d) => chunks.push(d));
      res.on('end', () => {
        try {
          const body = Buffer.concat(chunks).toString();
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function test() {
  try {
    // Login first
    const login = await request('POST', '/api/auth/login', {
      email: 'teste@example.com',
      password: '123456'
    });
    
    const token = login.data?.tokens?.accessToken;
    console.log('📍 Token obtido:', !!token);
    
    // Try booking
    console.log('\n📤 Enviando booking...');
    const bookingPayload = {
      userId: 999,
      serviceId: 1,
      date: '2026-02-21',
      time: '14:00',
      address: 'Rua Teste, 123',
      phone: '5198888888',
      durationHours: 2
    };
    console.log('Payload:', JSON.stringify(bookingPayload, null, 2));
    
    const booking = await request('POST', '/api/bookings', bookingPayload, token);
    
    console.log('\n📥 Resposta do servidor:');
    console.log('Status:', booking.status);
    console.log('Dados:', JSON.stringify(booking.data, null, 2));

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

test();
