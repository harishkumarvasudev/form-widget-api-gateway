import express from 'express';
import config from '../../config/config.js';
import { widgetConfig } from '../controllers/widgetConfig.controller.js';
import { formAPI } from '../controllers/form.controller.js';
import { authenticateToken } from '../middlewares/auth.js';

// Function to register all routes
const allRoutes = (app) => {
  // Register widget configuration routes under the dashboard URL prefix
  // Requires authentication using authenticateToken middleware
  app.use(config.services.dasboardURLPrefix, authenticateToken, widgetConfig);

  // Register form API routes under the API URL prefix
  // Requires authentication using authenticateToken middleware
  app.use(config.services.apiURLPrefix, authenticateToken, formAPI);
};

export default allRoutes;
