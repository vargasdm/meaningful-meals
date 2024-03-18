require('dotenv').config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { MealDoesNotExistError } from "../util/errors";

const MEALS_TABLE: string = process.env.MEALS_TABLE as string;
const AWS_REGION: string = process.env.AWS_REGION as string;
const client = new DynamoDBClient({ region: AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);

// This should create a meal with the given arguments.
// It should return nothing on success, and throw an error on error.
async function createMeal(
	mealID: string,
	userID: string,
	recipeID: string,
	date: string
): Promise<void> {
	try {
		const command = new PutCommand({
			TableName: MEALS_TABLE,
			Item: {
				meal_id: mealID,
				user_id: userID,
				recipe_id: recipeID,
				date
			}
		});

		await documentClient.send(command);
	} catch (err) {
		throw err;
	}
}

async function getMealsByUserID(userID: string) {
	const command = new QueryCommand({
		TableName: MEALS_TABLE,
		IndexName: 'user_id-index',
		KeyConditionExpression: 'user_id = :userID',
		ExpressionAttributeValues: { ':userID': userID }
	});

	try {
		const meals: any = (await documentClient.send(command)).Items;
		return meals;
	} catch (err) {
		// console.error(err);
		// logger.error(err);
		throw err;
	}
}

async function getMealByUserIDAndRecipeID(
	userID: string,
	recipeID: string
) {
	try {
		let meals = await getMealsByUserID(userID);
		meals = meals.filter((meal: any) => meal.recipe_id === recipeID);

		if (meals.length !== 1) {
			throw new MealDoesNotExistError();
		}

		// console.log(meals);

		return meals[0];
	} catch (err) {
		throw err;
	}
}

export default {
	createMeal,
	getMealsByUserID,
	getMealByUserIDAndRecipeID
}