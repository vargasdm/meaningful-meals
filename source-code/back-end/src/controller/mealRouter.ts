import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { authenticateToken } from '../util/authenticateToken';
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

// This will return the meals of the user indicated by the JWT sent with the request.
// If there is no JWT, then a 403 will be returned instead.
router.get('/', authenticateToken, async (req: any, res: any) => {
	// res.send(req.user);
	try {
		const meals = await mealService.getMealsByUserID(req.user.user_id);
		res.status(200).json(meals);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

export default router;