require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const documentClient = DynamoDBDocumentClient.from(client);
import { logger } from "../util/logger";

// const USERS_TABLE: string = process.env.USERS_TABLE as string;
const RECIPES_TABLE: string = process.env.RECIPES_TABLE as string;

// READ
async function getRecipesByUsername(username: any) {
  const command = new QueryCommand({
    TableName: RECIPES_TABLE,
    IndexName: "user-index",
    KeyConditionExpression: "#u = :u",
    ExpressionAttributeNames: { "#u": "user" },
    ExpressionAttributeValues: { ":u": username.username },
  });

  try {
    const data = await documentClient.send(command);
    console.log(data.Items);
    return data.Items;
  } catch (err) {
    logger.error(err);
  }

  return null;
}

async function updateRecipe(recipe: any) {
  const command = new PutCommand({
    TableName: RECIPES_TABLE,
    Item: {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      user: recipe.user,
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    },
  });
  try {
    const response = await documentClient.send(command);
    console.log("PutCommand executed successfully", response);

    return response;
  } catch (err) {
    console.error("Error executing PutCommand", err);
  }
}

async function postRecipe(recipe: any) {
  const command = new PutCommand({
    TableName: RECIPES_TABLE,
    Item: {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      user: recipe.user,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    },
  });
  try {
    const response = await documentClient.send(command);
    console.log("PutCommand executed successfully", response);

    return response;
  } catch (err) {
    console.error("Error executing PutCommand", err);
  }
}

async function deleteRecipe(recipe: any) {
  console.log(recipe);

  const command = new DeleteCommand({
    TableName: RECIPES_TABLE,
    Key: {
      id: recipe.id,
    },
  });
  try {
    const response = await documentClient.send(command);
    console.log("DeleteCommand executed successfully", response);
    return response;
  } catch (err) {
    console.error("Error executing DeleteCommand", err);
  }
}

export default {
  getRecipesByUsername,
  updateRecipe,
  postRecipe,
  deleteRecipe,
};
