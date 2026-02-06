const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Resolve DB path from a few common locations (repo-root or inside backend folder)
const candidatePaths = [
  path.join(__dirname, '..', '..', 'backend_data', 'database.sqlite'), // backend/backend_data
  path.join(__dirname, '..', 'backend_data', 'database.sqlite'),       // backend/src/db/../backend_data
  path.join(__dirname, '..', '..', '..', 'backend_data', 'database.sqlite'), // repo-root backend_data
  path.join(__dirname, '..', '..', 'backend_data', 'limpeza.db'),
  path.join(__dirname, '..', 'backend_data', 'limpeza.db')
];

let DB_PATH = candidatePaths.find(p => fs.existsSync(p));
if (!DB_PATH) {
  DB_PATH = candidatePaths[0];
}

function ensureDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function promisifyDb(db) {
  return {
    run(sql, ...params) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
          if (err) return reject(err);
          resolve({ lastID: this.lastID, changes: this.changes });
        });
      });
    },
    get(sql, ...params) {
      return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    },
    all(sql, ...params) {
      return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    },
    exec(sql) {
      return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    close() {
      return new Promise((resolve, reject) => {
        db.close((err) => err ? reject(err) : resolve());
      });
    }
  };
}

async function getDb() {
  ensureDir();
  const db = new sqlite3.Database(DB_PATH);
  const pdb = promisifyDb(db);
  // As migrations devem criar as tabelas (ver backend/src/db/migrations.sql)
  // Aqui apenas retornamos a instância promisificada do DB.
  return pdb;
}

module.exports = { getDb };
