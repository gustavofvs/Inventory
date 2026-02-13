const path = require("path");
const cors = require("cors");
const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = process.env.PORT || 3001;

// conexao com sqlite
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

app.use(cors());
app.use(express.json({ limit: "100kb" }));

// helper pra rodar queries com promise (evita callback hell)
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

// GET /produtos
app.get("/produtos", async (_req, res) => {
    try {
        const rows = await query("SELECT * FROM stock ORDER BY productID DESC");
        res.json(rows);
    } catch (err) {
        console.error("erro ao buscar produtos:", err.message);
        res.status(500).json({ error: "falha ao buscar produtos" });
    }
});

// POST /produtos
app.post("/produtos", async (req, res) => {
    const { nameProduct, qntdProduct, priceProduct } = req.body;

    const name = typeof nameProduct === "string" ? nameProduct.trim() : "";
    if (!name || name.length > 200) {
        return res.status(400).json({ error: "nome inválido (obrigatório, max 200 chars)" });
    }

    const qty = Number(qntdProduct);
    if (!Number.isFinite(qty) || qty < 0 || !Number.isInteger(qty)) {
        return res.status(400).json({ error: "quantidade deve ser inteiro >= 0" });
    }

    const price = Number(priceProduct);
    if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({ error: "preço deve ser >= 0" });
    }

    try {
        const result = await run(
            "INSERT INTO stock (nameProduct, qntdProduct, priceProduct) VALUES (?, ?, ?)",
            [name, qty, price]
        );
        res.status(201).json({ id: result.lastID });
    } catch (err) {
        console.error("erro ao criar produto:", err.message);
        res.status(500).json({ error: "falha ao criar produto" });
    }
});

// DELETE /produtos/:id
app.delete("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "id inválido" });
    }

    try {
        const result = await run("DELETE FROM stock WHERE productID = ?", [id]);
        if (result.changes === 0) {
            return res.status(404).json({ error: "produto não encontrado" });
        }
        res.json({ message: "produto removido" });
    } catch (err) {
        console.error("erro ao deletar produto:", err.message);
        res.status(500).json({ error: "falha ao deletar produto" });
    }
});

app.listen(PORT, () => {
    console.log(`api rodando em http://localhost:${PORT}`);
});