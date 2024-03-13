// endpoint: /user
require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import { logger } from "../util/logger";
// import {
// 	validateLoginBody,
// 	validateRegisterBody,
// } from "../util/authenticateBody";
import authBody from '../util/authenticateBody';
import { authenticateNoToken } from "../util/authenticateToken";

// import { postEmployee, login } from "../service/userService";
import userService from '../service/userService';

// Read
router.post("/login", authBody.validateLoginBody, async (req: any, res: any) => {
	console.log(`userRouter.post('/login')...`);

	try {
		const targetUser = await userService.getUserByUsername(req.body.username);

		if (await userService.credentialsMatch(req.body, targetUser)) {
			const token = jwt.sign({
				user_id: targetUser.user_id
			},
				process.env.JWT_KEY as string,
				{
					expiresIn: '15m'
				});
			res.status(200).json({ token: token });
			return;
		}

		res.sendStatus(401);
	} catch (err) {
		console.error(err);
		logger.error(err);
		res.sendStatus(500);
	}
});

// 	if (await userService.credentialsAreValid(req.body)) {

// }

// const data: any = await userService.login(req.body);
// console.log(`data: ${JSON.stringify(data)}`);

// if (data) {
// 	const token = jwt.sign(
// 		{
// 			user_id: data.user_id,
// 			username: data.username,
// 			role: data.role,
// 		},
// 		process.env.JWT_KEY as string,
// 		{
// 			expiresIn: "15m",
// 		}
// 	);

// 	logger.info(`Login: ${data.username} Token: ${token}`);
// 	res.status(201).json({
// 	});
// } else {
// 	res.status(400).json({ message: "Failed login" });
// }

// Create
router.post(
	"/register",
	authenticateNoToken,
	authBody.validateRegisterBody,
	async (req: any, res: any) => {
		console.log('userRouter.post(/register)...');
		const data = await userService.postUser(req.body);

		if (data) {
			logger.info(`Created Employee: ${data.username}`);
			res.status(201).json({ message: `Created Employee ${data.username}` });
		} else {
			res.status(401).json({
				message: "Employee was not created. Invalid Credentials.",
			});
		}
	}
);

export default router;
