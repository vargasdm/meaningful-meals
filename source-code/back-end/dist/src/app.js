"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* For any source file that accesses process.env,
import and call config() on dotenv as early as possible*/
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recipeRouter_1 = __importDefault(require("./controller/recipeRouter"));
const userRouter_1 = __importDefault(require("./controller/userRouter"));
const mealRouter_1 = __importDefault(require("./controller/mealRouter"));
const favoriteRouter_1 = __importDefault(require("./controller/favoriteRouter"));
const commentRouter_1 = __importDefault(require("./controller/commentRouter"));
const logger_1 = require("./util/logger");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger_1.logger.info(`Incoming ${req.method} : ${req.url}`);
    next();
});
app.use("/recipes", recipeRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/meals", mealRouter_1.default);
app.use("/favorites", favoriteRouter_1.default);
app.use("/comments", commentRouter_1.default);
app.use((req, res, next) => {
    logger_1.logger.info(`Incoming ${req.method} : ${req.url}`);
    next();
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
