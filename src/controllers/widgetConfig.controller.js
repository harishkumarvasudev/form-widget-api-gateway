import axios from 'axios';
import config from '../../config/config.js';
import logger from '../../config/logger.js';

/**
 * Route handler to fetch widget configuration from the dashboard service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const widgetConfig = async (req, res) => {
  try {
    // Extract the URL path after '/widget-app' to determine the widget configuration endpoint
    const parsedUrl = req.originalUrl.split('widget-app')[1];

    let result;

    // Prepare headers for the request to be forwarded to the dashboard service
    const headers = {
      authorization: req.headers['authorization'],
      timeout: config.services.requestTimeOut,
      localeip: req.headers['x-forwarded-for'] || 'dummy ip', // Use 'dummy ip' if 'x-forwarded-for' header is not provided
      localeuseragent: req.get('User-Agent') || 'dummy user agent', // Use 'dummy user agent' if User-Agent header is not provided
    };

    // Construct the complete URL to request widget configuration from the dashboard service
    const url = `${config.services.dasboardURL}${parsedUrl}`;

    // Send a GET request to the dashboard service with the provided headers
    result = await axios.get(url, { headers });

    // Send the response data from the dashboard service to the client
    return res.send(result.data);
  } catch (error) {
    // If an error occurs during the request to the dashboard service
    logger.error(`Error occurred in widgetConfig request: ${error}`);

    // Send an error response with the status and data from the dashboard service response
    return res.status(error.response.status).send({ ...error.response.data });
  }
};

export { widgetConfig };