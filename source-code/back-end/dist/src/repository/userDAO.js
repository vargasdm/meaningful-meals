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
// require("dotenv").config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const logger_1 = require("../util/logger");
const errors_1 = require("../util/errors");
const client = new client_dynamodb_1.DynamoDBClient({ region: process.env.AWS_REGION });
const documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TableName = process.env.USERS_TABLE;
// This should return the user who has the given username.
// Otherwise, it should throw a UserDoesNotExistError
function getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.QueryCommand({
            TableName,
            IndexName: "username-index",
            KeyConditionExpression: "#u = :u",
            ExpressionAttributeNames: { "#u": "username" },
            ExpressionAttributeValues: { ":u": username },
        });
        try {
            const users = (yield documentClient.send(command)).Items;
            if (users.length !== 1) {
                throw new errors_1.UserDoesNotExistError();
            }
            return users[0];
        }
        catch (err) {
<<<<<<< HEAD
=======
            console.error(err);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
            logger_1.logger.error(err);
            throw err;
        }
    });
}
function getUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.GetCommand({
            TableName,
            Key: {
                user_id: userId,
            },
        });
        try {
            const data = yield documentClient.send(command);
            return data.Item;
        }
        catch (err) {
<<<<<<< HEAD
=======
            console.error(err);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
            logger_1.logger.error(err);
            throw err;
        }
        // return null;
    });
}
// CREATE
function createUser(Item) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.PutCommand({
            TableName,
            Item,
        });
        yield documentClient.send(command);
    });
}
<<<<<<< HEAD
// UPDATE
function updateUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName,
            Key: {
                user_id: input.user_id,
            },
            UpdateExpression: "set username = :username, password = :password",
            ExpressionAttributeValues: {
                ":username": input.username,
                ":password": input.password,
            },
            ReturnValues: "ALL_NEW",
        });
        try {
            const data = yield documentClient.send(command);
        }
        catch (err) {
            logger_1.logger.error("Update Comment: " + err);
            throw err;
        }
    });
}
function updateUsername(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName,
            Key: {
                user_id: input.user_id,
            },
            UpdateExpression: "set username = :username",
            ExpressionAttributeValues: {
                ":username": input.username,
            },
            ReturnValues: "ALL_NEW",
        });
        try {
            const data = yield documentClient.send(command);
        }
        catch (err) {
            logger_1.logger.error("Update Comment: " + err);
            throw err;
        }
    });
}
exports.default = {
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    updateUsername
=======
exports.default = {
    createUser: createUser,
    getUserByUsername: getUserByUsername,
    getUserById: getUserById,
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
};
