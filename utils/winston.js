let winston = require('winston');

let options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}

const logConfiguration = {
    'transports': [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
};

const logger = winston.createLogger(logConfiguration);

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;