require("dotenv").config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

const documentClient = DynamoDBDocumentClient.from(client);

import { logger } from "../util/logger";

const TableName = process.env.USERS_TABLE;

// READ
async function getUserByUsername(username: any) {
  const command = new QueryCommand({
    TableName,
    IndexName: "username-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "username" },
    ExpressionAttributeValues: { ":u": username },
  });

  try {
    const data = await documentClient.send(command);
    logger.info(`GetUserByUsername received data from the db`);
    console.log(data.Items?.[0])
    return data.Items?.[0];
  } catch (err) {
    logger.error(err);
  }

  return null;
}

// CREATE
async function postUser(Item: any) {
  const command = new PutCommand({
    TableName,
    Item,
  });

  try {
    const data = await documentClient.send(command);
    logger.info(`PostUser sent data to the db`);
    return Item;
  } catch (err) {
    logger.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

export { postUser, getUserByUsername };
