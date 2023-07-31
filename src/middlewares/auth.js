import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger.js';
import config from '../../config/config.js';

/**
 * Middleware to authenticate the request using a JSON Web Token (JWT).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function to call.
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.headers && req.headers['authorization'];
    if (!authHeader) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: { data: config.jwt.invalidTokenMessage } });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: { data: config.jwt.invalidTokenMessage } });
    }

    // Verify the token using the JWT tokenSecret from config
    const tokenDetails = jwt.verify(token, config.jwt.tokenSecret);

    // Add the token details to the request object for further use
    req.admin = tokenDetails;

    // Call the next middleware in the chain
    next();
  } catch (error) {
    // If an error occurs during token verification or decoding
    logger.error(`Error occurred while authenticating token: ${error}`);

    // Send a forbidden response with the error message
    return res.status(StatusCodes.FORBIDDEN).json({ error: { data: config.jwt.invalidTokenMessage } });
  }
};

export { authenticateToken };