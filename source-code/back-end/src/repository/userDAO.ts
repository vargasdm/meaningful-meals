require("dotenv").config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION as string });

const documentClient = DynamoDBDocumentClient.from(client);

import { logger } from "../util/logger";

const TableName: string = process.env.USERS_TABLE as string;

// READ
async function getEmployeeByUsername(username: any) {
  const command = new QueryCommand({
    TableName,
    IndexName: "username-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "username" },
    ExpressionAttributeValues: { ":u": username },
  });

  try {
    const data = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

// CREATE
async function postEmployee(Item: any) {
  const command = new PutCommand({
    TableName,
    Item
  });

  try {
    const data = await documentClient.send(command);
    return Item;
  } catch (err) {
    logger.error(`Unable to read item. Error: ${err}`);
  }

  return null;
}

export default { postEmployee, getEmployeeByUsername };
