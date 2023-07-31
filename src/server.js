import https from 'https';
import path from 'path';
import fs from 'fs';
import express from 'express';
import compressPayLoad from './middlewares/payloadCompress.js';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import config from '../config/config.js';
import cors from 'cors';
import { setCache } from './middlewares/cache.js';
import { customHttpLogger } from './middlewares/customHttpLogger.js';
import { routeErrorHandler } from './middlewares/routeErrorHandler.js';
import response from './middlewares/response.js';
import allRoutes from './routes/routes.js';
import logger, { morganStream } from '../config/logger.js';
import os from 'os';

const startServer = () => {
  // Check if the app name is set correctly in the .env file
  if (config.app.name !== 'api-gateway') {
    logger.crit(`.env file is not properly passed or check the app name`);
    console.log(`.env file is not properly passed or check the app name`);
    process.exit(0);
  }

  const app = express();

  // Middlewares
  app.use(express.urlencoded({ extended: true, limit: '2MB' }));
  app.use(helmet());
  app.use(express.json({ limit: config.services.payloadLimit }));
  app.use(customHttpLogger);
  app.use(morgan('combined', { stream: morganStream }));
  app.use(compression({ filter: compressPayLoad, threshold: 0 }));
  app.use(response);
  app.use(setCache);
  app.use(cors());

  // Register all routes
  allRoutes(app);

  // Handle 404 - Not Found
  app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  });

  // Error handling middleware
  app.use(routeErrorHandler);

  let server;
  if (config.app.https === 'true') {
    // TODO: Implement HTTPS configuration if needed
    // const sslOptions = {
    //   key: fs.readFileSync(path.resolve(__dirname, 'ssl', 'key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'ssl', 'cert.pem'))
    // };
    // sslServer = https.createServer(sslOptions, app);
    // sslServer.listen(config.app.port, () => {
    //   logger.info(`https server started on port ${config.app.port}`);
    // });
  } else {
    // Start HTTP server
    server = app.listen(config.app.port, () => {
      logger.info(`http server started on port ${config.app.port}`);
    });
  }

  process.on('uncaughtException', (err) => {
    logger.crit(`Uncaught exception in the application: ${err}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.crit(`Unhandled rejection in the application: ${err}`);
  });

  process.on('SIGTERM', () => {
    logger.notice('Received SIGTERM signal');
    const serverRunning = server;
    serverRunning.close(() => {
      logger.notice('Closing server');
      dbConnectionClose(); // Assuming there is a function to close the database connection
      process.exit(0);
    });
  });
};

startServer();