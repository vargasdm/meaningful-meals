// endpoint: /user
require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";
import { UserDoesNotExistError } from "../util/errors";
import { logger } from "../util/logger";
import validators from '../util/validators';
// import { authenticateNoToken } from "../util/authenticateToken";

import userService from '../service/userService';
import type { Validation } from '../service/userService';
const router = express.Router();

router.post("/login", async (req: any, res: any) => {
	const validation: Validation = await userService.validateLogin(req.body);

	if (!validation.isValid) {
		res.status(400).json({ errors: validation.errors });
		return;
	}

	try {
		const targetUser = await userService.getUserByUsername(req.body.username);

		if (await userService.credentialsMatch(req.body, targetUser)) {
			const token = jwt.sign(
				{ user_id: targetUser.user_id },
				process.env.JWT_KEY as string,
				{ expiresIn: '15m' }
			);

			res.status(200).json({
				token: token,
				user_id: targetUser.user_id,
				username: targetUser.username
			});

			return;
		}

		res.status(401).json({ error: 'CREDENTIALS DO NOT MATCH' });
	} catch (err) {
		console.error(err);
		logger.error(err);
		res.sendStatus(500);
	}
});

// Create
router.post("/register", validators.validateRegisterBody, async (req: any, res: any) => {
	const validation: any = validators.validateCredentialsExist(req.body);

	if (validation.error) {
		res.status(400).json(validation.error);
		return;
	}

	if (await userService.usernameExists(req.body.username)) {
		res.status(400).json({ error: 'USERNAME EXISTS' });
		return;
	}

	// const data = await userService.postUser(req.body);

	// if (data) {
	// 	logger.info(`Created Employee: ${data.username}`);
	// 	res.status(201).json({ message: `Created Employee ${data.username}` });
	// } else {
	// 	res.status(401).json({
	// 		message: "Employee was not created. Invalid Credentials.",
	// 	});
	// }
});

export default router;
