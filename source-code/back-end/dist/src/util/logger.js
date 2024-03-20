"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const { createLogger, transports, format } = require("winston");
const logger = createLogger({
    level: "info", // log only messages with level 'info' and above
    format: format.combine(format.timestamp(), format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [
        new transports.File({ filename: "error.log", level: "error" }), // log only errors to this log file
        new transports.File({ filename: "app.log" }), // log to a file
    ],
});
exports.logger = logger;
