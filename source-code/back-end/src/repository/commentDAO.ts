require("dotenv").config();
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand,
	QueryCommand,
	DeleteCommand,
	ScanCommand,
	UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { logger } from "../util/logger";

const client = new DynamoDBClient({ region: process.env.AWS_REGION as string });
const documentClient = DynamoDBDocumentClient.from(client);
const TableName: string = process.env.COMMENTS_TABLE as string;

type comment = {
	comment_id: string;
	user_id: string;
	content_id: string;
	user_comment: string;
};
type commentNoId = {
  user_id: string;
  content_id: string;
  user_comment: string;
};

async function getCommentByUserAndContent(input: commentNoId) {
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

async function createComment(Item: commentNoId) {
	const command = new PutCommand({
		TableName,
		Item,
	});

	await documentClient.send(command);
}

async function deleteComment(commentId: string) {
	const command = new DeleteCommand({
		TableName,
		Key: {
			comment_id: commentId,
		},
	});
	try {
		const data: any = await documentClient.send(command);
		return;
	} catch (err) {
		logger.error(err);
		throw err;
	}
}

async function getCommentsByUserId(userId: string): Promise<comment[]> {
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

async function getComments(): Promise<comment[]> {
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

async function updateComment(input: comment) {
	const command = new UpdateCommand({
		TableName,
		Key: {
			comment_id: input.comment_id,
		},
		UpdateExpression: "set user_comment = :comment",
		ExpressionAttributeValues: {
			":comment": input.user_comment,
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
  getCommentByUserAndContent,
  createComment,
  deleteComment,
  getCommentsByUserId,
  getComments,
  updateComment,
};
