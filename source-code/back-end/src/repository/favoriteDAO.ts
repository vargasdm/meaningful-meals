require("dotenv").config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  DeleteCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";
import { logger } from "../util/logger";

const client = new DynamoDBClient({ region: process.env.AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);
const TableName: string = process.env.FAVORITES_TABLE as string;

type favorite = { favorite_id: string; user_id: string; content_id: string };
type favoriteNoId = { user_id: string; content_id: string };

async function createFavorite(Item: favorite) {
  try {
    const command = new PutCommand({
      TableName,
      Item,
    });
  
    await documentClient.send(command);
  } catch (error) {
    logger.error(error);
    throw error;
  }
  
}

async function getFavoritesByUserId(userId: string): Promise<favorite[]> {
  const command = new QueryCommand({
    TableName,
    IndexName: "user_id-content_id-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "user_id" },
    ExpressionAttributeValues: { ":u": userId },
  });

  try {
    const data: any = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function getFavoriteByUserAndContent(
  input: favoriteNoId
): Promise<favorite> {
  const command = new QueryCommand({
    TableName,
    IndexName: "user_id-content_id-index",
    KeyConditionExpression: "#u = :u AND #c = :c",
    ExpressionAttributeNames: { "#c": "content_id", "#u": "user_id" },
    ExpressionAttributeValues: { ":c": input.content_id, ":u": input.user_id },
  });

  try {
    const data: any = await documentClient.send(command);
    return data.Items[0];
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function deleteFavorite(favoriteId: string) {
  const command = new DeleteCommand({
    TableName,
    Key: {
      favorite_id: favoriteId,
    },
  });
  try {
    const data: any = await documentClient.send(command);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

async function getFavorites(): Promise<favorite[]> {
  const command = new ScanCommand({
    TableName,
  });
  try {
    const data: any = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export default {
  createFavorite: createFavorite,
  getFavoritesByUserId: getFavoritesByUserId,
  getFavoriteByUserAndContent: getFavoriteByUserAndContent,
  deleteFavorite: deleteFavorite,
  getFavorites:getFavorites
};
