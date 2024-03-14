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
const TableName: string = process.env.USERS_TABLE as string;

// This should return the array of all users who have the given username.
// If such a user exists, the array should be of length one.
// Otherwise, it should be of length zero.
async function getUserByUsername(username: string) {
	const command = new QueryCommand({
		TableName,
		IndexName: "username-index",
		KeyConditionExpression: "#u = :u",
		ExpressionAttributeNames: { "#u": "username" },
		ExpressionAttributeValues: { ":u": username },
	});

	try {
		const data: any = await documentClient.send(command);
		return data.Items[0];
	} catch (err) {
		console.error(err);
		logger.error(err);
		throw err;
	}

	// return null;
}

async function getUserById(userId: string) {
	const command = new QueryCommand({
		TableName,
		KeyConditionExpression: "#id = :id",
		ExpressionAttributeNames: { "#id": "user_id" },
		ExpressionAttributeValues: { ":id": userId },
	});

	try {
		const data: any = await documentClient.send(command);
		return data.Items[0];
	} catch (err) {
		console.error(err);
		logger.error(err);
		throw err;
	}

	// return null;
}

// CREATE
async function createUser(Item: any) {
	const command = new PutCommand({
		TableName,
		Item
	});

	// try {
	// 	const data = await documentClient.send(command);
	// 	console.log('User posted.');
	// 	return Item;
	await documentClient.send(command);
	// } catch (err) {
	// 	console.error(err);
	// 	logger.error(`Unable to read item. Error: ${err}`);
	// }

	// return null;
}

export default { createUser: createUser, getUserByUsername: getUserByUsername, getUserById };
