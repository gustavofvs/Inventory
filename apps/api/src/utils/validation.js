const { z } = require("zod");

const productSchema = z.object({
    name: z.string().min(1, "Name is required").max(200, "Name must be less than 200 characters"),
    quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    price: z.number().nonnegative("Price must be a non-negative number"),
});

const idSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string").transform(Number),
});

module.exports = { productSchema, idSchema };
