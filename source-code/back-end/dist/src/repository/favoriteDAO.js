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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const logger_1 = require("../util/logger");
const client = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
const documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TableName = process.env.FAVORITES_TABLE;
function createFavorite(Item) {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        try {
            const command = new lib_dynamodb_1.PutCommand({
                TableName,
                Item,
            });
            yield documentClient.send(command);
        }
        catch (error) {
            logger_1.logger.error(error);
            throw error;
        }
=======
        const command = new lib_dynamodb_1.PutCommand({
            TableName,
            Item,
        });
        yield documentClient.send(command);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    });
}
function getFavoritesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName,
            IndexName: "user_id-content_id-index",
            KeyConditionExpression: "#u = :u",
            ExpressionAttributeNames: { "#u": "user_id" },
            ExpressionAttributeValues: { ":u": userId },
        });
        try {
            const data = yield documentClient.send(command);
            return data.Items;
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
function getFavoriteByUserAndContent(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName,
            IndexName: "user_id-content_id-index",
            KeyConditionExpression: "#u = :u AND #c = :c",
            ExpressionAttributeNames: { "#c": "content_id", "#u": "user_id" },
            ExpressionAttributeValues: { ":c": input.content_id, ":u": input.user_id },
        });
        try {
            const data = yield documentClient.send(command);
            return data.Items[0];
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
function deleteFavorite(favoriteId) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName,
            Key: {
                favorite_id: favoriteId,
            },
        });
        try {
            const data = yield documentClient.send(command);
<<<<<<< HEAD
=======
            return;
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
function getFavorites() {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.ScanCommand({
            TableName,
        });
        try {
            const data = yield documentClient.send(command);
            return data.Items;
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
exports.default = {
    createFavorite: createFavorite,
    getFavoritesByUserId: getFavoritesByUserId,
    getFavoriteByUserAndContent: getFavoriteByUserAndContent,
    deleteFavorite: deleteFavorite,
    getFavorites: getFavorites
};
