const express = require("express");
const router = express.Router();
const productController = require("./controllers/product.controller");

// Product Routes
router.get("/products", (req, res, next) => productController.getAll(req, res, next).catch(next));
router.post("/products", (req, res, next) => productController.create(req, res, next).catch(next));
router.delete("/products/:id", (req, res, next) => productController.delete(req, res, next).catch(next));

module.exports = router;
