"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateNoToken = exports.authenticateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt = require("jsonwebtoken");
const logger_1 = require("./logger");
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) {
            logger_1.logger.error(err);
            return res.status(403).json({ message: "Forbiden Access" });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authenticateNoToken = (req, res, next) => {
<<<<<<< HEAD
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        logger_1.logger.error({ message: "Unauthorized Access" });
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    else {
        logger_1.logger.error('Confirmed no token.');
=======
    console.log('authenticateToken.authenticateNoToken...');
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
        return res.status(401).json({ message: "Unauthorized Access" });
    }
    else {
        console.log('Confirmed no token.');
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    }
    next();
};
exports.authenticateNoToken = authenticateNoToken;
