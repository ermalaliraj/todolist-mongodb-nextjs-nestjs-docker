import appRoot from 'app-root-path'
import * as winston from 'winston'

const loggerConfig = {
  winston: {
    console: {
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleExceptions: true,
      level: 'debug',
    },
    file: {
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      maxsize: 5242880, 
      maxFiles: 100,
    },
    errorFile: {
      filename: `${appRoot}/logs/error.log`,
      handleExceptions: true,
      maxsize: 5242880, 
      maxFiles: 100,
    },
  },
}

const customFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`
});

const logger = winston.createLogger({
  format: customFormat, // Use the custom format
  transports: [
    new winston.transports.Console(loggerConfig.winston.console),
    new winston.transports.File(loggerConfig.winston.file),
  ],
})

export default logger;