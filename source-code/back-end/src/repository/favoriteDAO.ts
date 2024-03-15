require("dotenv").config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "../util/logger";

const client = new DynamoDBClient({ region: process.env.AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);
const TableName: string = process.env.FAVORITES_TABLE as string;

/**
 * createFavorite
 * deleteFavorite
 * getFavoritesByUserId
 * getFavoritesByContentId
 */

type favorite = { favorite_id: string; user_id: string; content_id: string };
type favoriteNoId = { user_id: string; content_id: string };

async function createFavorite(Item: favorite) {
  const command = new PutCommand({
    TableName,
    Item,
  });

  await documentClient.send(command);
}

async function getFavoriteByUserAndContent(input: favoriteNoId): Promise<favorite> {
  const command = new QueryCommand({
    TableName,
    IndexName: "user_id-content_id-index",
    KeyConditionExpression: "#u = :u AND #c = :c",
    ExpressionAttributeNames: { "#u": "user_id", "#c": "content_id" },
    ExpressionAttributeValues: { ":u": input.user_id, ":c": input.content_id },
  });

  try {
    const data: any = await documentClient.send(command);
    return data.Items[0];
  } catch (err) {
    console.error(err);
    logger.error(err);
    throw err;
  }
}

async function getFavoritesByUserId(input: string): Promise<favorite[]> {
  const command = new QueryCommand({
    TableName,
    IndexName: "user_id-content_id-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "user_id" },
    ExpressionAttributeValues: { ":u": input },
  });

  try {
    const data: any = await documentClient.send(command);
    return data.Items;
  } catch (err) {
    console.error(err);
    logger.error(err);
    throw err;
  }
}

export default {
  createFavorite: createFavorite,
  getFavoriteByUserAndContent: getFavoriteByUserAndContent,
  getFavoritesByUserId: getFavoritesByUserId,
};
