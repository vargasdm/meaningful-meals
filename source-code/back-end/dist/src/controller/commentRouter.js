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
// endpoint: /comment
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const logger_1 = require("../util/logger");
const authenticateToken_1 = require("../util/authenticateToken");
const router = express_1.default.Router();
const commentDAO_1 = __importDefault(require("../repository/commentDAO"));
const commentService_1 = __importDefault(require("../service/commentService"));
const commentService = (0, commentService_1.default)(commentDAO_1.default);
router.post("/", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield commentService.validateInputComment(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield commentService.createComment(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
router.delete("/", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield commentService.validateDeleteComment(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield commentService.deleteComment(req.body);
        res.sendStatus(202);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
router.put("/", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield commentService.validateUpdateComment(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield commentService.updateComment(req.body);
        res.sendStatus(202);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
router.get("/", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.query.user;
        const item = req.query.user;
        if (!user && !item) {
            res.status(400).json({ errors: "MISSING QUERIES" });
            return;
        }
        let validation = {
            isValid: false,
            errors: ["MISSING QUERIES"],
        };
        if (user && item) {
            validation = yield commentService.validateUserContent({
                user_id: user,
                content_id: item,
            });
        }
        else if (!user && item) {
            validation = yield commentService.validateId(item);
        }
        else if (user && !item) {
            validation = yield commentService.validateId(user);
        }
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        let data;
        if (user && item) {
            data = yield commentService.getUserContentComment({
                user_id: user,
                content_id: item,
            });
        }
        else if (!user && item) {
            data = yield commentService.getContentComments(item);
        }
        else if (user && !item) {
            data = yield commentService.getUserComments(user);
        }
        res.status(200).json(data);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
exports.default = router;
