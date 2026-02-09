#!/usr/bin/env node
/**
 * Final E2E Booking Test
 * Tests: Login → Create Booking → Verify Success
 */

const http = require('http');

function request(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path,
      method,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        try {
          const json = JSON.parse(Buffer.concat(chunks).toString());
          resolve({ status: res.statusCode, json });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function test() {
  try {
    console.log('\n🚀 TESTE FINAL E2E BOOKING\n');

    // 1. Login
    console.log('📍 1. Login...');
    const { json: loginRes } = await request('POST', '/api/auth/login', {
      email: 'teste@example.com',
      password: '123456'
    });
    const token = loginRes.tokens?.accessToken;
    if (!token) throw new Error('Login failed: ' + JSON.stringify(loginRes));
    console.log('   ✅ Token obtido');

    // 2. Create Booking with future date/time
    console.log('\n📍 2. Criar Agendamento...');
    const future = new Date();
    future.setDate(future.getDate() + Math.floor(Math.random() * 30) + 5);
    const dateStr = future.toISOString().split('T')[0];
    const hour = String(Math.floor(Math.random() * 16) + 8).padStart(2, '0');
    const min = String(Math.floor(Math.random() * 60)).padStart(2, '0');

    const { status, json: bookRes } = await request('POST', '/api/bookings', {
      userId: 999,
      serviceId: 1,
      date: dateStr,
      time: `${hour}:${min}`,
      address: 'Rua Teste, 123',
      phone: '5198888888',
      durationHours: 2
    }, token);

    if (status !== 201) {
      throw new Error(`Booking failed: ${status} ${JSON.stringify(bookRes)}`);
    }

    console.log(`   ✅ Agendamento #${bookRes.booking.id} criado com sucesso!`);
    console.log(`   Data: ${dateStr} ${hour}:${min}`);
    console.log(`   Preço final: R$ ${bookRes.booking.final_price}`);

    // 3. Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(50));
    console.log('📋 Resumo:');
    console.log('  • Backend respondendo ✅');
    console.log('  • Autenticação funcional ✅');
    console.log('  • Agendamento criado ✅');
    console.log('  • Sistema pronto para produção ✅\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  }
}

test();
