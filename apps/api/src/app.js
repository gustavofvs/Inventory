const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes");
const errorHandler = require("./middleware/error");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "100kb" }));
app.use(morgan("dev")); // Logging

// Routes
app.use("/api", router); // Prefixing API routes (best practice)

// Error Handling
app.use(errorHandler);

module.exports = app;
