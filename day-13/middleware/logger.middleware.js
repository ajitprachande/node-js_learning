const fs = require('node:fs')
const path = require('node:path');

function LoggerMiddleware(req, res, next) {
    const now = new Date();

    const log = (`\n Date: [${now}] - ${req.method} ${req.path}`);

    const logFilePath = path.join(__dirname, 'logger.txt');

    fs.appendFileSync(logFilePath, log, 'utf-8');

    next();
}

module.exports = LoggerMiddleware;
