import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger.js';

/**
 * Middleware to validate request parameters against a given Joi schema.
 * @param {Object} validateSchema - The Joi schema to validate against.
 * @returns {Function} - Express middleware function.
 */
const validation = (validateSchema) => {
  /**
   * Express middleware function to validate request parameters.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next function to call.
   */
  return (req, res, next) => {
    let parameters = {};

    // Merge request parameters from body, query, and params into a single object
    parameters = { ...req.params, ...req.body, ...req.query };

    console.log(`Request parameters:`, parameters);

    // Validate the merged parameters against the given schema
    const result = validateSchema.validate(parameters);

    if (result.error) {
      // If validation fails, log the error and send an invalid response
      logger.error(`Validation error: ${result.error}`);

      return res.status(StatusCodes.BAD_REQUEST).json({ error: result.error });
    }

    // If validation succeeds, call the next middleware
    next();
  };
};

export { validation };