require('dotenv').config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { logger } from '../util/logger';

const MEALS_TABLE: string = process.env.MEALS_TABLE as string;
const AWS_REGION: string = process.env.AWS_REGION as string;
const client = new DynamoDBClient({ region: AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);

async function createMeal(
	mealID: string,
	userID: string,
	recipeID: string,
	date: string
) {
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
}

async function getMealsByUserID(userID: string) {
	const command = new QueryCommand({
		TableName: MEALS_TABLE,
		IndexName: 'user_id-index',
		KeyConditionExpression: 'user_id = :userID',
		ExpressionAttributeValues: { ':userID': userID }
	});

	try {
		const data: any = await documentClient.send(command);
		return data;
	} catch (err) {
		console.error(err);
		logger.error(err);
		throw err;
	}
}

export default {
	createMeal,
	getMealsByUserID
}