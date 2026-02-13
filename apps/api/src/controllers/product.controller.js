const productService = require("../services/product.service");
const { productSchema, idSchema } = require("../utils/validation");

class ProductController {
    async getAll(req, res) {
        const products = await productService.getAll();
        res.json(products);
    }

    async create(req, res) {
        const validatedData = productSchema.parse(req.body);
        const newProduct = await productService.create(validatedData);
        res.status(201).json(newProduct);
    }

    async delete(req, res) {
        const { id } = idSchema.parse(req.params);
        const deleted = await productService.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    }
}

module.exports = new ProductController();
