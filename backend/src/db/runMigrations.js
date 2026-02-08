const fs = require('fs');
const path = require('path');
const { getDb } = require('./sqlite');

const MIGRATIONS_PATH = path.join(__dirname, 'migrations.sql');

async function runMigrations() {
  try {
    
    const db = await getDb();
    const sql = fs.readFileSync(MIGRATIONS_PATH, 'utf8');
    
    // Executar cada statement SQL
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));
    
    for (const statement of statements) {
      try {
        await db.exec(statement + ';');
      } catch (error) {
        // Ignorar erros de "table already exists"
        if (!error.message.includes('already exists')) {
          console.warn('⚠️  Aviso:', error.message);
        }
      }
    }
    
    
    await db.close();
  } catch (error) {
    console.error('❌ Erro ao executar migrations:', error);
    process.exit(1);
  }
}

module.exports = { runMigrations };

// Executa migrations quando o script for chamado diretamente
if (require.main === module) {
  runMigrations().catch(err => {
    console.error('Erro ao executar migrations diretamente:', err);
    process.exit(1);
  });
}
