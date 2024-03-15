import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mealService from '../service/mealService';
import type { Validation } from '../util/validation.type';

const router = express.Router();

router.post('/', async (req: any, res: any) => {
	const validation: Validation = await mealService.validateMeal(
		req.body.userID,
		req.body.recipeID,
		req.body.date
	);

	if (!validation.isValid) {
		res.status(400).json({ errors: validation.errors });
		return;
	}

	try {
		await mealService.createMeal(
			req.body.userID,
			req.body.recipeID,
			req.body.date
		);

		res.sendStatus(201);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

export default router;