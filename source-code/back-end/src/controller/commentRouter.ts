// endpoint: /comment
require("dotenv").config();
import express from "express";
import { logger } from "../util/logger";

import type { Validation } from "../util/validation.type";
import { authenticateToken } from "../util/authenticateToken";
const router = express.Router();

import commentDAO from "../repository/commentDAO";
import CommentService from "../service/commentService";
const commentService = CommentService(commentDAO);

router.post("/", authenticateToken, async (req: any, res: any) => {
	console.log(req.body);
	try {
		const validation: Validation = await commentService.validateInputComment(
			req.body
		);

		if (!validation.isValid) {
			logger.log(validation.errors)
			res.status(400).json({ errors: validation.errors });
			return;
		}

		await commentService.createComment(req.body);
		res.sendStatus(201);
	} catch (err) {
		logger.error(err);
		res.sendStatus(500);
	}
});

router.delete("/", authenticateToken, async (req: any, res: any) => {
	try {
		const validation: Validation = await commentService.validateDeleteComment(
			req.body
		);

		if (!validation.isValid) {
			logger.log(validation.errors)
			res.status(400).json({ errors: validation.errors });
			return;
		}

		await commentService.deleteComment(req.body);
		res.sendStatus(202);
	} catch (err) {
		logger.error(err);
		res.sendStatus(500);
	}
});

router.put("/", authenticateToken, async (req: any, res: any) => {
	try {
		const validation: Validation = await commentService.validateUpdateComment(
			req.body
		);

		if (!validation.isValid) {
			logger.log(validation.errors)
			res.status(400).json({ errors: validation.errors });
			return;
		}

		await commentService.updateComment(req.body);
		res.sendStatus(202);
	} catch (err) {
		logger.error(err);
		res.sendStatus(500);
	}
});

router.get("/", authenticateToken, async (req: any, res: any) => {
	try {
		const user: string = req.query.user;
		const item: string = req.query.item;
		if (!user && !item) {
			logger.log({ errors: "MISSING QUERIES" })
			res.status(400).json({ errors: "MISSING QUERIES" });
			return;
		}

		let validation: Validation = {
			isValid: false,
			errors: ["MISSING QUERIES"],
		};

		if (user && item) {
			validation = await commentService.validateUserContent({
				user_id: user,
				content_id: item,
			});
		} else if (!user && item) {
			validation = await commentService.validateId(item);
		} else if (user && !item) {
			validation = await commentService.validateId(user);
		}

		if (!validation.isValid) {
			logger.log(validation.errors)
			res.status(400).json({ errors: validation.errors });
			return;
		}

		let data;

		if (user && item) {
			data = await commentService.getUserContentComment({
				user_id: user,
				content_id: item,
			});
		} else if (!user && item) {
			data = await commentService.getContentComments(item);
		} else if (user && !item) {
			data = await commentService.getUserComments(user);
		}

		res.status(200).json(data);
	} catch (err) {
		logger.error(err);
		res.sendStatus(500);
	}
});

export default router;
