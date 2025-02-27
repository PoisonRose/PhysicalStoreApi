import dbPromise from "./db";

async function initDb() {
    const db = await dbPromise;
  
    await db.run(`
      CREATE TABLE IF NOT EXISTS lojas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cep TEXT NOT NULL UNIQUE,
        rua TEXT NOT NULL,
        numero TEXT NOT NULL,
        cidade TEXT NOT NULL,
        latitude REAL,
        longitude REAL
      );
    `);
  
    console.log("Database inicializada");
  }
  
initDb();
