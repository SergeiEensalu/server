import {Database} from "sqlite3";

export const database = new Database('./database.sqlite');

database.serialize(() => {
  database.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      telegram_id TEXT UNIQUE,
      first_name TEXT,
      password TEXT DEFAULT NULL,
      token TEXT DEFAULT NULL,
      is_admin BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

