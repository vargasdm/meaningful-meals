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

export default {}