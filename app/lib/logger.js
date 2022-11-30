const winston = require('winston');
const path = require('path');

class WinstonLogger {
  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(__dirname, '../logs', 'error.log'),
          level: 'error',
        }),
        new winston.transports.File({
          filename: path.join(__dirname, '../logs', 'info.log'),
          level: 'info',
        }),
      ],
    });
  }

  log(lvl, msg) {
    this.logger.log({ level: lvl, message: msg });
  }
}

class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = new WinstonLogger();
    }
  }

  getInstance() {
    return Logger.instance;
  }
}

module.exports = Logger;
