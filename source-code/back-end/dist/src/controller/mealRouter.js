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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../util/authenticateToken");
const mealService_1 = __importDefault(require("../service/mealService"));
const router = express_1.default.Router();
router.post('/', authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = yield mealService_1.default.validateAddMeal(req.user.user_id, req.body.recipeID, req.body.timestamp);
        if (!validation.isValid) {
            res.status(400).json({ errors: validation.errors });
            return;
        }
        yield mealService_1.default.createMeal(req.user.user_id, req.body.recipeID, req.body.timestamp);
        res.sendStatus(201);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}));
router.delete('/:recipeID', authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mealService_1.default.deleteMeal(req.body.mealID);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}));
// This should return the meals of the user indicated by the JWT sent with the request.
// If there is no JWT, then a 403 will be returned instead.
router.get('/', authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.minTimestamp && req.query.maxTimestamp) {
        console.log(req.query.minTimestamp);
        console.log(req.query.maxTimestamp);
        console.log(req.user.user_id);
        const validations = yield mealService_1.default.validateGetMealsOfUserInTimeRange(req.user.user_id, req.query.minTimestamp, req.query.maxTimestamp);
        if (!validations.isValid) {
            res.status(400).json({ errors: validations.errors });
            return;
        }
        const meals = yield mealService_1.default.getMealsOfUserInTimeRange(req.user.user_id, req.query.minTimestamp, req.query.maxTimestamp);
        res.status(200).json(meals);
        return;
    }
    try {
        const meals = yield mealService_1.default.getMealsByUserID(req.user.user_id);
        res.status(200).json(meals);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}));
exports.default = router;
