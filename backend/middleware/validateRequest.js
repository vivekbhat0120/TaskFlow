import ApiError from '../utils/apiError.js';

const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message
    }));

    return next(new ApiError(400, 'Request validation failed.', details));
  }

  req.validated = result.data;
  req.body = result.data.body || req.body;
  req.params = result.data.params || req.params;
  return next();
};

export default validateRequest;
