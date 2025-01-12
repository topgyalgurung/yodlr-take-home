const winston = require("winston");
const expressWinston = require("express-winston");

/*
 *  Setup logging for the application
 *  Returns a logging instance
 */

const transport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

const api = (module.exports = function init(app) {
  if (app) {
    // Log all HTTP requests
    app.use(
      expressWinston.logger({
        transports: [transport],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: true,
      })
    );

    // Log all errors
    app.use(
      expressWinston.errorLogger({
        transports: [transport],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
      })
    );
  }

  // Create and return a logger instance
  const logger = winston.createLogger({
    level: "info", // Default log level
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [transport],
  });

  return logger;
});
