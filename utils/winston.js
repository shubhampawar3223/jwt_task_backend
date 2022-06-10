let winston = require('winston');

let options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}

//configuring transport
const logConfiguration = {
    'transports': [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
};

const logger = winston.createLogger(logConfiguration);

//to add  morgan logs to winston
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;