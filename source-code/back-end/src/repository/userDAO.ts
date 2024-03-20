// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  GetCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "../util/logger";
import { UserDoesNotExistError } from "../util/errors";

const client = new DynamoDBClient({ region: process.env.AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);
const TableName: string = process.env.USERS_TABLE as string;

// This should return the user who has the given username.
// Otherwise, it should throw a UserDoesNotExistError
async function getUserByUsername(username: string) {
  const command = new QueryCommand({
    TableName,
    IndexName: "username-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "username" },
    ExpressionAttributeValues: { ":u": username },
  });

  try {
    const users: any = (await documentClient.send(command)).Items;

    if (users.length !== 1) {
      throw new UserDoesNotExistError();
    }

    return users[0];
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function getUserById(userId: string) {
  const command = new GetCommand({
    TableName,
    Key: {
      user_id: userId,
    },
  });

  try {
    const data: any = await documentClient.send(command);
    return data.Item;
  } catch (err) {
    logger.error(err);
    throw err;
  }

  // return null;
}

// CREATE
async function createUser(Item: any) {
  const command = new PutCommand({
    TableName,
    Item,
  });

  await documentClient.send(command);
}

// UPDATE
async function updateUser(input: any) {
  const command = new UpdateCommand({
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
    const data: any = await documentClient.send(command);
  } catch (err) {
    logger.error("Update Comment: " + err);
    throw err;
  }
}

async function updateUsername(input: any) {
  const command = new UpdateCommand({
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
    const data: any = await documentClient.send(command);
  } catch (err) {
    logger.error("Update Comment: " + err);
    throw err;
  }
}

export default {
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  updateUsername
};
