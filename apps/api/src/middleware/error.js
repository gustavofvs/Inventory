const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors
        });
    }

    res.status(500).json({
        error: "Internal Server Error"
    });
};

module.exports = errorHandler;
