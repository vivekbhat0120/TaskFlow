import ApiError from '../utils/apiError.js';

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === 'CastError') {
    error = new ApiError(404, 'Resource not found.');
  }

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((item) => item.message);
    error = new ApiError(400, 'Validation failed.', details);
  }

  if (err.code === 11000) {
    error = new ApiError(409, 'A resource with this value already exists.');
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal server error.',
    details: error.details || null,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
