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
// endpoint: /social
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const logger_1 = require("../util/logger");
const router = express_1.default.Router();
const authenticateToken_1 = require("../util/authenticateToken");
const authenticateBody_1 = require("../util/authenticateBody");
const favoriteDAO_1 = __importDefault(require("../repository/favoriteDAO"));
const favoriteService_1 = __importDefault(require("../service/favoriteService"));
const favoriteService = (0, favoriteService_1.default)(favoriteDAO_1.default);
<<<<<<< HEAD
=======
/**
 * postlike
 * deletelike
 * getalluserlike
 * getallrecipelike
 */
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
router.post("/", authenticateToken_1.authenticateToken, authenticateBody_1.validateFavoriteBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield favoriteService.validateInputFavorite(req.body);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield favoriteService.createFavorite(req.body);
        res.sendStatus(201);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
<<<<<<< HEAD
router.delete("/", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.query.user;
        const item = req.query.item;
        if (!user || !item) {
            res.status(400).json({ errors: "MISSING QUERIES" });
            return;
        }
        const validation = yield favoriteService.validateUpdateFavorite({ user_id: user, content_id: item });
=======
router.delete("/", authenticateToken_1.authenticateToken, authenticateBody_1.validateFavoriteBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield favoriteService.validateUpdateFavorite(req.body);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
<<<<<<< HEAD
        yield favoriteService.deleteFavorite({ user_id: user, content_id: item });
=======
        yield favoriteService.deleteFavorite(req.body);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
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
<<<<<<< HEAD
        const item = req.query.item;
=======
        const item = req.query.user;
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        if (!user && !item) {
            res.status(400).json({ errors: "MISSING QUERIES" });
            return;
        }
        let validation = {
            isValid: false,
            errors: ["MISSING QUERIES"],
        };
        if (user && item) {
<<<<<<< HEAD
            validation = yield favoriteService.validateGetFavorite({
=======
            validation = yield favoriteService.validateInputFavorite({
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
                user_id: user,
                content_id: item,
            });
        }
        else if (!user && item) {
            validation = yield favoriteService.validateId(item);
        }
        else if (user && !item) {
            validation = yield favoriteService.validateId(user);
        }
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        let data;
        if (user && item) {
            data = yield favoriteService.getUserContentFavorite({
                user_id: user,
                content_id: item,
            });
        }
        else if (!user && item) {
            data = yield favoriteService.getContentFavorites(item);
        }
        else if (user && !item) {
            data = yield favoriteService.getUserFavorites(user);
        }
        res.status(200).json(data);
    }
    catch (err) {
        logger_1.logger.error(err);
        res.sendStatus(500);
    }
}));
exports.default = router;
