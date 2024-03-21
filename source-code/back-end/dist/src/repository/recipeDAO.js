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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand, } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const documentClient = DynamoDBDocumentClient.from(client);
const logger_1 = require("../util/logger");
// const USERS_TABLE: string = process.env.USERS_TABLE as string;
const RECIPES_TABLE = process.env.RECIPES_TABLE;
// READ
function getRecipesByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new QueryCommand({
            TableName: RECIPES_TABLE,
            IndexName: "user-index",
            KeyConditionExpression: "#u = :u",
            ExpressionAttributeNames: { "#u": "user" },
            ExpressionAttributeValues: { ":u": username.username },
        });
        try {
            const data = yield documentClient.send(command);
            console.log(data.Items);
            return data.Items;
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        return null;
    });
}
function getRecipeById(recipeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new QueryCommand({
            TableName: RECIPES_TABLE,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: { "#id": "id" },
            ExpressionAttributeValues: { ":id": recipeId },
        });
        try {
            const data = yield documentClient.send(command);
            console.log(data.Items);
            return data.Items;
        }
        catch (err) {
            logger_1.logger.error(err);
        }
        return null;
    });
}
function updateRecipe(recipe) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new PutCommand({
            TableName: RECIPES_TABLE,
            Item: {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                user: recipe.user,
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
            },
        });
        try {
            const response = yield documentClient.send(command);
            console.log("PutCommand executed successfully", response);
            return response;
        }
        catch (err) {
            console.error("Error executing PutCommand", err);
        }
    });
}
function postRecipe(recipe) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new PutCommand({
            TableName: RECIPES_TABLE,
            Item: {
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                user: recipe.user,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
            },
        });
        try {
            const response = yield documentClient.send(command);
            console.log("PutCommand executed successfully", response);
            return response;
        }
        catch (err) {
            console.error("Error executing PutCommand", err);
        }
    });
}
function deleteRecipe(recipe) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(recipe);
        const command = new DeleteCommand({
            TableName: RECIPES_TABLE,
            Key: {
                id: recipe.id,
            },
        });
        try {
            const response = yield documentClient.send(command);
            console.log("DeleteCommand executed successfully", response);
            return response;
        }
        catch (err) {
            console.error("Error executing DeleteCommand", err);
        }
    });
}
exports.default = {
    getRecipesByUsername,
    updateRecipe,
    postRecipe,
    deleteRecipe,
    getRecipeById,
};
