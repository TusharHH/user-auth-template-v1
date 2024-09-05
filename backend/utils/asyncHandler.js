const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error('AsyncHandler error:', error);
            res.json(
                { error: error.message || 'Internal Server Error' }
            );
        }
    };
};

module.exports = asyncHandler;
