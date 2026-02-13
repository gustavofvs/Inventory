const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "data", "inventory.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("erro ao conectar no banco:", err.message);
        process.exit(1);
    }
    console.log("sqlite conectado:", dbPath);
});

// cria tabela na primeira execucao
db.run(`
    CREATE TABLE IF NOT EXISTS stock (
        productID    INTEGER PRIMARY KEY AUTOINCREMENT,
        nameProduct  VARCHAR(100) NOT NULL,
        qntdProduct  INTEGER NOT NULL DEFAULT 0,
        priceProduct REAL    NOT NULL DEFAULT 0
    )
`);

// wrappers pra usar async/await ao inves de callback
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ lastID: this.lastID, changes: this.changes });
        });
    });
}

module.exports = { query, run };
