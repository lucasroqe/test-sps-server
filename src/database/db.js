import Database from 'better-sqlite3';

const db = new Database('./database.sqlite');

db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        type TEXT NOT NULL
    );
`)

//seed pra criar admin
const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@spsgroup.com.br');

if (!adminExists) {
  db.prepare('INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)')
    .run('admin', 'admin@spsgroup.com.br', '1234', 'admin');
}

export default db;