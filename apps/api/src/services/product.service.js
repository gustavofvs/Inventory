const { run, query, get } = require("../db");

class ProductService {
    async getAll() {
        // Renaming columns to match frontend expectations directly in SQL would be cleaner,
        // but let's do it here to keep the "legacy DB" simulation if that was intended,
        // OR just map it cleanly. Code said "legacy DB columns".
        // Let's abstract that away from the controller.
        const rows = await query("SELECT * FROM stock ORDER BY productID DESC");
        return rows.map(row => ({
            id: row.productID,
            name: row.nameProduct,
            quantity: row.qntdProduct,
            price: row.priceProduct
        }));
    }

    async create({ name, quantity, price }) {
        const result = await run(
            "INSERT INTO stock (nameProduct, qntdProduct, priceProduct) VALUES (?, ?, ?)",
            [name, quantity, price]
        );
        return { id: result.lastID, name, quantity, price };
    }

    async delete(id) {
        const result = await run("DELETE FROM stock WHERE productID = ?", [id]);
        return result.changes > 0;
    }
}

module.exports = new ProductService();
