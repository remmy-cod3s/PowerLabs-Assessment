const Database = require('better-sqlite3');
const db = new Database('tasks.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        dueDate TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  )
    `);
module.exports = db;

