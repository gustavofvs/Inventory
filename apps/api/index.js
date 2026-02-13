const path = require("path");
const cors = require("cors");
const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
const PORT = 3001;

// banco de dados
const dbPath = path.join(__dirname, "data", "inventory.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("erro ao conectar no banco:", err.message);
        process.exit(1);
    }
    console.log("conectado no sqlite");
});

// cria a tabela se nao existir
db.run(`
    CREATE TABLE IF NOT EXISTS stock (
        productID    INTEGER PRIMARY KEY AUTOINCREMENT,
        nameProduct  VARCHAR(100) NOT NULL,
        qntdProduct  INTEGER NOT NULL DEFAULT 0,
        priceProduct INTEGER NOT NULL DEFAULT 0
    )
`);

app.use(cors());
app.use(express.json());

// listar produtos
app.get("/produtos", (req, res) => {
    db.all("SELECT * FROM stock ORDER BY productID DESC", (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "erro ao buscar produtos" });
        }
        res.json(rows);
    });
});

// criar produto
app.post("/produtos", (req, res) => {
    const { nameProduct, qntdProduct, priceProduct } = req.body;

    // validacao basica
    if (!nameProduct || nameProduct.trim() === "") {
        return res.status(400).json({ error: "nome do produto é obrigatório" });
    }

    const qty = Number(qntdProduct);
    const price = Number(priceProduct);

    if (isNaN(qty) || qty < 0) {
        return res.status(400).json({ error: "quantidade inválida" });
    }
    if (isNaN(price) || price < 0) {
        return res.status(400).json({ error: "preço inválido" });
    }

    db.run(
        "INSERT INTO stock (nameProduct, qntdProduct, priceProduct) VALUES (?, ?, ?)",
        [nameProduct.trim(), qty, price],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "erro ao criar produto" });
            }
            res.status(201).json({ message: "produto criado", id: this.lastID });
        }
    );
});

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});