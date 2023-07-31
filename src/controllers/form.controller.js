import axios from 'axios';
import config from '../../config/config.js';
import logger from '../../config/logger.js';

/**
 * Route handler to interact with the form API service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const formAPI = async (req, res) => {
  try {
    // Extract the URL path after '/api' to determine the specific form API endpoint
    const parsedUrl = req.originalUrl.split('api')[1];

    let result;

    // Prepare headers for the request to be forwarded to the form API service
    const headers = {
      authorization: req.headers['authorization'],
      timeout: config.services.requestTimeOut,
      localeip: req.headers['x-forwarded-for'] || 'dummy ip', // Use 'dummy ip' if 'x-forwarded-for' header is not provided
      localeuseragent: req.get('User-Agent') || 'dummy user agent', // Use 'dummy user agent' if User-Agent header is not provided
    };

    // Construct the complete URL to make a PUT request to the form API service
    const url = `${config.services.apiURL}${parsedUrl}`;

    // Send a PUT request to the form API service with the provided headers and request body
    result = await axios.put(url, req.body, { headers });

    // Send the response data from the form API service to the client
    return res.send(result.data);
  } catch (error) {
    // If an error occurs during the request to the form API service
    logger.error(`Error occurred in formAPI request: ${error}`);

    // Send an error response with the status and data from the form API service response
    return res.status(error.response.status).send({ ...error.response.data });
  }
};

export { formAPI };