import RootPath from 'app-root-path';
import { createLogger, transports, config, format, addColors } from 'winston';
import configuration from './config.js';
import DailyRotateFile from 'winston-daily-rotate-file';

/*
  Log Levels: 
  0: emerg (highest)
  1: alert
  2: crit
  3: error
  4: warning
  5: notice
  6: info
  7: debug (lowest)
*/

// Configuration options for various Winston log transports
const options = {
  file: {
    level: configuration.log.logLevel || 'error', // Log level for the file transport (default: error)
    filename: `${RootPath}/logs/combined.log`, // File to store combined logs
    datePattern: 'YYYY-MM-DD-HH', // File rotation pattern
    maxFiles: configuration.log.logInterval, // Number of days to keep logs (default: specified in config.log.logInterval)
    handleExceptions: true, // Handle exceptions in the logger
    json: true, // Log in JSON format
    maxsize: 5242880, // Maximum file size in bytes (5MB)
    maxFiles: 5, // Number of files to rotate
    colorize: true, // Colorize console logs
  },

  errorOnlyFile: {
    level: 'error', // Log level for the error-only file transport
    filename: `${RootPath}/logs/app-error.log`, // File to store error logs
    datePattern: 'YYYY-MM-DD', // File rotation pattern
    maxFiles: '30d', // Number of days to keep logs
    handleExceptions: true, // Handle exceptions in the logger
    json: true, // Log in JSON format
    colorize: true, // Colorize console logs
  },

  console: {
    level: configuration.log.logLevel || 'debug', // Log level for the console transport (default: debug)
    handleExceptions: true, // Handle exceptions in the logger
    json: false, // Log in plain text format
    colorize: true, // Colorize console logs
  },

  morgan: {
    level: 'http', // Log level for Morgan HTTP logs
    format: format.cli(), // Format for Morgan logs
    transports: [new transports.Console()], // Transport to send Morgan logs to the console
  },
};

// List of Winston transports to be used
const winstonTransports = [
  new transports.DailyRotateFile(options.file), // Rotating file transport for combined logs
  new transports.File(options.errorOnlyFile), // File transport for error-only logs
  new transports.Console(options.console), // Console transport for logs
];

// Winston log format
const winstonFormat = format.combine(
  format.timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A', // Timestamp format
  }),
  format.align(),
  format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`) // Custom log message format
);

// Create a Winston logger instance with the specified configuration
const logger = new createLogger({
  levels: config.syslog.levels, // Log levels for syslog compatibility
  transports: winstonTransports, // List of transports to use
  defaultMeta: { component: 'user-service' }, // Default metadata for logs
  format: winstonFormat, // Log message format
  exitOnError: false, // Do not exit on handled exceptions
});

// Add custom colors for log levels
addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
});

// Morgan stream to redirect HTTP logs to Winston logger
const morganStream = {
  write: function (message, encoding) {
    // Log the message using the Winston logger (excluding the trailing newline character)
    logger.info(message.slice(0, -1));
  },
};

export { morganStream };
export default logger;