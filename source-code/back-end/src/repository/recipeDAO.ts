require('dotenv').config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const documentClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE: string = process.env.USERS_TABLE as string;
const RECIPES_TABLE: string = process.env.RECIPES_TABLE as string;

module.exports = {};