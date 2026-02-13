const sqlite3 = require("sqlite3").verbose();
const { promisify } = require("util");
const path = require("path");

const dbPath = path.resolve(__dirname, "../data/inventory.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Promisify common methods for cleaner async/await usage
const query = promisify(db.all).bind(db);
const run = promisify(db.run).bind(db);
const get = promisify(db.get).bind(db); // useful for single result

// Initialize DB schema if needed (could be moved to a migration script)
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS stock (
            productID INTEGER PRIMARY KEY AUTOINCREMENT,
            nameProduct TEXT NOT NULL,
            qntdProduct INTEGER NOT NULL DEFAULT 0,
            priceProduct REAL NOT NULL DEFAULT 0.0
        )
    `);
});

module.exports = { db, query, run, get };
