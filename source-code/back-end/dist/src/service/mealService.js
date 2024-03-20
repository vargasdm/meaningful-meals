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
const uuid_1 = require("uuid");
const mealDAO_1 = __importDefault(require("../repository/mealDAO"));
const userDAO_1 = __importDefault(require("../repository/userDAO"));
const recipeService_1 = __importDefault(require("./recipeService"));
const userService_1 = __importDefault(require("./userService"));
const meal_1 = require("../util/meal");
const userService = (0, userService_1.default)(userDAO_1.default);
function validateAddMeal(userID, recipeID, timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = { isValid: false, errors: [] };
        try {
            if (!(yield userService.userExistsByID(userID))) {
                validation.errors.push('USER DOES NOT EXIST');
            }
            if (!(yield recipeService_1.default.recipeExists(recipeID))) {
                validation.errors.push('RECIPE DOES NOT EXIST');
            }
        }
        catch (err) {
            throw err;
        }
        if (new Date(timestamp).getTime() <= 0) {
            validation.errors.push('TIMESTAMP IS INVALID');
        }
        if (validation.errors.length > 0) {
            return validation;
        }
        validation.isValid = true;
        return validation;
    });
}
function createMeal(userID, recipeID, timestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mealDAO_1.default.createMeal(new meal_1.Meal((0, uuid_1.v4)(), userID, recipeID, timestamp));
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteMealByID(mealID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mealDAO_1.default.deleteMealByID(mealID);
        }
        catch (err) {
            throw err;
        }
    });
}
function getMealsByUserID(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield mealDAO_1.default.getMealsByUserID(userID);
        }
        catch (err) {
            throw err;
        }
    });
}
function validateGetMealsOfUserInTimeRange(userID, minTimestamp, maxTimestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = { isValid: false, errors: [] };
        try {
            if (!(yield userService.userExistsByID(userID))) {
                validation.errors.push('USER DOES NOT EXIST');
            }
        }
        catch (err) {
            throw err;
        }
        if (new Date(minTimestamp).getTime() <= 0) {
            validation.errors.push('MINIMUM TIMESTAMP IS INVALID');
        }
        if (new Date(maxTimestamp).getTime() <= 0) {
            validation.errors.push('MAXIMUM TIMESTAMP IS INVALID');
        }
        if (validation.errors.length > 0) {
            return validation;
        }
        validation.isValid = true;
        return validation;
    });
}
function getMealsOfUserInTimeRange(userID, minTimestamp, maxTimestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield mealDAO_1.default.getMealsOfUserInTimeRange(userID, minTimestamp, maxTimestamp);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = {
    validateAddMeal: validateAddMeal,
    createMeal,
    deleteMeal: deleteMealByID,
    getMealsByUserID,
    validateGetMealsOfUserInTimeRange,
    getMealsOfUserInTimeRange
};
