// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	UpdateCommand,
	QueryCommand,
	DeleteCommand
} from "@aws-sdk/lib-dynamodb";
import { Meal } from "../util/meal";

const MEALS_TABLE: string = process.env.MEALS_TABLE as string;
const AWS_REGION: string = process.env.AWS_REGION as string;
const client = new DynamoDBClient({ region: AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);

// This should create a meal with the given arguments.
// It should return nothing on success, and throw an error on error.
async function createMeal(meal: Meal): Promise<void> {
	console.log(meal);

	try {
		const command = new PutCommand({
			TableName: MEALS_TABLE,
			Item: {
				meal_id: meal.mealID,
				user_id: meal.userID,
				recipe_id: meal.recipeID,
				timestamp: meal.timestamp
			}
		});

		await documentClient.send(command);
	} catch (err) {
		throw err;
	}
}

async function getMealByID(mealID: string) {
	const command = new GetCommand({
		TableName: MEALS_TABLE,
		Key: {
			meal_id: mealID
		}
	});

	try {
		const meal = await documentClient.send(command);
		console.log(meal);
		return meal;
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
		throw err;
	}
}

async function getMealsOfUserInTimeRange(
	userID: string,
	minTimestamp: number,
	maxTimestamp: number
) {
	try {
		const meals = await getMealsByUserID(userID);
		return meals.filter((meal: any) => meal.timestamp >= minTimestamp
			&& meal.timestamp < maxTimestamp);
	} catch (err) {
		throw err;
	}
}

async function deleteMealByID(mealID: string) {
	const command = new DeleteCommand({
		TableName: MEALS_TABLE,
		Key: {
			meal_id: mealID
		}
	});

	try {
		await documentClient.send(command);
	} catch (err) {
		throw err;
	}
}

async function updateMealTimestampByID(mealID: string, timestamp: number) {
	const command = new UpdateCommand({
		TableName: MEALS_TABLE,
		Key: {
			meal_id: mealID
		},
		UpdateExpression: 'set #timestamp = :timestamp',
		ExpressionAttributeNames: { '#timestamp': 'timestamp' },
		ExpressionAttributeValues: { ':timestamp': timestamp }
	});

	try {
		await documentClient.send(command);
	} catch (err) {
		throw err;
	}
}

export default {
	getMealByID,
	createMeal,
	getMealsByUserID,
	deleteMealByID,
	getMealsOfUserInTimeRange,
	updateMealTimestampByID
}