"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// endpoint: /user
<<<<<<< HEAD
=======
// require("dotenv").config();
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../util/logger");
const router = express_1.default.Router();
const userService_1 = __importDefault(require("../service/userService"));
const userDAO_1 = __importDefault(require("../repository/userDAO"));
<<<<<<< HEAD
const authenticateToken_1 = require("../util/authenticateToken");
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
const userService = (0, userService_1.default)(userDAO_1.default);
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield userService.validateLogin(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        const targetUser = yield userService.getUserByUsername(req.body.username);
        if (yield userService.credentialsMatch(req.body, targetUser)) {
<<<<<<< HEAD
            const token = jsonwebtoken_1.default.sign({ user_id: targetUser.user_id }, process.env.JWT_KEY, { expiresIn: "30m" });
            res.status(200).json({
                token: token,
                user_id: targetUser.user_id,
                username: targetUser.username,
            });
            return;
        }
        res.status(401).json({ error: "CREDENTIALS DO NOT MATCH" });
    }
    catch (err) {
=======
            const token = jsonwebtoken_1.default.sign({ user_id: targetUser.user_id }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                user_id: targetUser.user_id,
                username: targetUser.username
            });
            return;
        }
        res.status(401).json({ error: 'CREDENTIALS DO NOT MATCH' });
    }
    catch (err) {
        console.error(err);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
// Create
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield userService.validateRegistration(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield userService.createUser(req.body);
        res.sendStatus(201);
    }
    catch (err) {
<<<<<<< HEAD
=======
        console.error(err);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
<<<<<<< HEAD
router.put("/update", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = userService.validateUpdate(req.body);
        const newUsername = req.query.newUsername;
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        if (!newUsername) {
            yield userService.updateUser(req.body);
            res.sendStatus(201);
        }
        else {
            yield userService.updateUser({ username: req.body.username, pasword: req.body.password, newUsername: newUsername });
            res.sendStatus(201);
        }
    }
    catch (error) {
        logger_1.logger.error(error);
        res.sendStatus(500);
    }
}));
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
exports.default = router;
