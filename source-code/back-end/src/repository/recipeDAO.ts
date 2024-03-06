require('dotenv').config();
const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({region: 'us-east-1'});
const documentClient = DynamoDBClient.from(client);

const USERS_TABLE: string = process.env.USERS_TABLE as string;
const RECIPES_TABLE: string = process.env.RECIPES_TABLE as string;

module.exports = {};