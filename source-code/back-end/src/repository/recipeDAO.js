const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({region: 'us-east-1'});
const documentClient = DynamoDBClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE;
const RECIPES_TABLE = process.env.RECIPES_TABLE;