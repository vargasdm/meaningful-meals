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
const authenticateToken_1 = require("../util/authenticateToken");
const authenticateBody_1 = require("../util/authenticateBody");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const recipeService_1 = __importDefault(require("../service/recipeService"));
const logger_1 = require("../util/logger");
// This should return search results if there's a 'query' query parameter,
// or a specific recipe if there's an 'id' query parameter
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.query) {
            const recipes = yield recipeService_1.default.searchRecipes(req.query.query);
            res.status(200).json(recipes);
            return;
        }
        if (req.query.id) {
            const recipe = yield recipeService_1.default.getRecipe(req.query.id);
            res.status(200).json(recipe);
            return;
        }
        res.status(400).json({ error: "QUERY PARAMS INVALID" });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}));
// this is endpoint for when user is looking at thier recipe tab
// this is a protected endpoint, but I didnt want to make a token so I will need to add the authenticateNoToken later
router.get("/user-recipes/:username", authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    console.log(req.params.username);
    if (req.params) {
        const recipes = yield recipeService_1.default.getUserRecipes(req.params);
        res.status(200).json(recipes);
        return;
    }
}));
router.put("/update", authenticateBody_1.validateRecipeBody, authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("recipeRouter.post(/update)...");
    console.log(req.body);
    const data = yield recipeService_1.default.putRecipe(req.body);
    if (data) {
        logger_1.logger.info(`Updated Recipe: ${data.title}`);
        res.status(201).json({ message: `Recipe Updated Successfully` });
    }
    else {
        res.status(401).json({
            message: "Recipe was not updated. Invalid Inputs.",
        });
    }
}));
router.post("/create", authenticateBody_1.validateRecipeBody, authenticateToken_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("recipeRouter.post(/create)...");
    console.log(req.body);
    const data = yield recipeService_1.default.createRecipe(req.body);
    if (data) {
        logger_1.logger.info(`New Recipe: ${data.title}`);
        res.status(201).json({ message: `New Recipe Created Successfully` });
    }
    else {
        res.status(401).json({
            message: "Recipe was not created. Invalid Inputs.",
        });
    }
}));
router.delete("/user-recipes/delete/:id", authenticateBody_1.validateRecipeID, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const idParam = req.params;
    const data = yield recipeService_1.default.deleteRecipe(idParam);
    if (data) {
        logger_1.logger.info(`Deleted Recipe: ${data.title}`);
        res.status(201).json({ message: `Recipe Deleted Successfully` });
    }
    else {
        res.status(401).json({
            message: "Recipe was not deleted. Invalid Inputs.",
        });
    }
}));
exports.default = router;
