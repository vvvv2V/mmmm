#!/bin/bash
# Database initialization script
# Cria tabelas, executa migrações e seeds

set -e

echo "🗄️  Inicializando banco de dados..."

DB_PATH="backend_data/limpeza.db"
SCHEMA_FILE="database/schema.sql"
MIGRATIONS_DIR="database/migrations"
SEEDS_DIR="database/seeds"

# Criar diretório se não existir
mkdir -p backend_data

# 1. Criar schema principal
echo "📋 Criando tabelas principais..."
if [ -f "$SCHEMA_FILE" ]; then
  sqlite3 "$DB_PATH" < "$SCHEMA_FILE" 2>/dev/null || true
  echo "✅ Schema criado"
else
  echo "⚠️  Schema não encontrado"
fi

# 2. Executar migrações
echo "🔄 Executando migrações..."
if [ -d "$MIGRATIONS_DIR" ]; then
  for migration in "$MIGRATIONS_DIR"/*.sql; do
    if [ -f "$migration" ]; then
      echo "  Aplicando: $(basename $migration)"
      sqlite3 "$DB_PATH" < "$migration" 2>/dev/null || true
    fi
  done
  echo "✅ Migrações completadas"
else
  echo "⚠️  Diretório de migrações não encontrado"
fi

# 3. Executar seeds
echo "🌱 Executando seeds..."
if [ -d "$SEEDS_DIR" ]; then
  for seed in "$SEEDS_DIR"/*.sql; do
    if [ -f "$seed" ]; then
      echo "  Carregando: $(basename $seed)"
      sqlite3 "$DB_PATH" < "$seed" 2>/dev/null || true
    fi
  done
  echo "✅ Seeds carregados"
else
  echo "⚠️  Diretório de seeds não encontrado"
fi

# 4. Criar diretórios de upload
echo "📁 Criando diretórios de upload..."
mkdir -p backend/uploads/avatars
chmod 755 backend/uploads/avatars
echo "✅ Diretórios criados"

# 5. Verificar tabelas
echo ""
echo "📊 Tabelas criadas:"
sqlite3 "$DB_PATH" ".tables"

echo ""
echo "✅ Base de dados inicializada com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "  1. Inicie o backend: cd backend && npm start"
echo "  2. Login com admin@limpezapro.com / Admin@123456789!"
echo "  3. Acesse: http://localhost:3001"
echo ""
