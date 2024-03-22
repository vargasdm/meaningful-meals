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
// require('dotenv').config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
<<<<<<< HEAD
const console_1 = require("console");
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
// import { MealDoesNotExistError } from "../util/errors";
const MEALS_TABLE = process.env.MEALS_TABLE;
const AWS_REGION = process.env.AWS_REGION;
const client = new client_dynamodb_1.DynamoDBClient({ region: AWS_REGION });
const documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
// This should create a meal with the given arguments.
// It should return nothing on success, and throw an error on error.
function createMeal(meal) {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        console.log(meal);
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        try {
            const command = new lib_dynamodb_1.PutCommand({
                TableName: MEALS_TABLE,
                Item: {
                    meal_id: meal.mealID,
                    user_id: meal.userID,
                    recipe_id: meal.recipeID,
                    timestamp: meal.timestamp
                }
            });
            yield documentClient.send(command);
        }
        catch (err) {
            throw err;
        }
    });
}
function getMealsByUserID(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName: MEALS_TABLE,
            IndexName: 'user_id-index',
            KeyConditionExpression: 'user_id = :userID',
            ExpressionAttributeValues: { ':userID': userID }
        });
        try {
            const meals = (yield documentClient.send(command)).Items;
            return meals;
        }
        catch (err) {
            throw err;
        }
    });
}
function getMealsOfUserInTimeRange(userID, minTimestamp, maxTimestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const meals = yield getMealsByUserID(userID);
<<<<<<< HEAD
            (0, console_1.log)(meals);
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
            return meals.filter((meal) => meal.timestamp >= minTimestamp
                && meal.timestamp < maxTimestamp);
        }
        catch (err) {
            throw err;
        }
    });
}
function deleteMealByID(mealID) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: MEALS_TABLE,
            Key: {
                meal_id: mealID
            }
        });
        try {
            yield documentClient.send(command);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = {
    createMeal,
    getMealsByUserID,
    deleteMealByID,
    getMealsOfUserInTimeRange
};
