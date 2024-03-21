require("dotenv").config();
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
	DynamoDBDocumentClient,
	GetCommand,
	QueryCommand,
	PutCommand,
	DeleteCommand,
	ScanCommand
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
		return data.Items;
	} catch (err) {
		logger.error(err);
	}

	return null;
}

async function getRecipeById(recipeId: any) {
	const command = new GetCommand({
		TableName: RECIPES_TABLE,
		Key: {
			id: recipeId
		}
	})

	try {
		const data = await documentClient.send(command);
		return data.Item;
	} catch (err) {
		logger.error(err);
	}

	return null;
}

async function getAllRecipes() {
	const command = new ScanCommand(
		{ TableName: RECIPES_TABLE }
	);

	const recipesData = await documentClient.send(command);
	// console.log(recipesData);
	return recipesData.Items;
}

// getAllRecipes();

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
	getRecipeById,
	getAllRecipes
};
