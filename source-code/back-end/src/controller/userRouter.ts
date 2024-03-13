// endpoint: /user
require("dotenv").config();
import express from "express";
import jwt from "jsonwebtoken";
import { logger } from "../util/logger";

import userService from '../service/userService';
import type { Validation } from '../service/userService';
const router = express.Router();

router.post("/login", async (req: any, res: any) => {
	try {
		const validation: Validation = await userService.validateLogin(req.body);

		if (!validation.isValid) {
			res.status(400).json({ errors: validation.errors });
			return;
		}

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
router.post("/register", async (req: any, res: any) => {
	try {
		const validation: Validation = await userService.validateRegistration(req.body);

		if (!validation.isValid) {
			res.status(400).json({ errors: validation.errors });
			return;
		}

		await userService.createUser(req.body);
		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		logger.error(err);
		res.sendStatus(500);
	}
});

export default router;
