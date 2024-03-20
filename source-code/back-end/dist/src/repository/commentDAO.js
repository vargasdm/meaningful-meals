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
const TableName = process.env.COMMENTS_TABLE;
function getCommentByUserAndContent(input) {
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
function createComment(Item) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.PutCommand({
            TableName,
            Item,
        });
        yield documentClient.send(command);
    });
}
function deleteComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName,
            Key: {
                comment_id: commentId,
            },
        });
        try {
            const data = yield documentClient.send(command);
            return;
        }
        catch (err) {
            logger_1.logger.error(err);
            throw err;
        }
    });
}
function getCommentsByUserId(userId) {
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
function getComments() {
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
function updateComment(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName,
            Key: {
                comment_id: input.comment_id,
            },
            UpdateExpression: "set user_comment = :comment",
            ExpressionAttributeValues: {
                ":comment": input.user_comment,
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
    getCommentByUserAndContent: getCommentByUserAndContent,
    createComment: createComment,
    deleteComment: deleteComment,
    getCommentsByUserId: getCommentsByUserId,
    getComments: getComments,
    updateComment: updateComment,
};
