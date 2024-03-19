import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { authenticateToken } from '../util/authenticateToken';
import mealService from '../service/mealService';
import type { Validation } from '../util/validation.type';

const router = express.Router();

router.post('/', authenticateToken, async (req: any, res: any) => {
	try {
		const validation: Validation = await mealService.validateAddMeal(
			req.user.user_id,
			req.body.recipeID,
			req.body.timestamp
		);

		if (!validation.isValid) {
			res.status(400).json({ errors: validation.errors });
			return;
		}

		await mealService.createMeal(
			req.user.user_id,
			req.body.recipeID,
			req.body.timestamp
		);

		res.sendStatus(201);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.delete('/:recipeID', authenticateToken, async (req: any, res: any) => {
	try {
		await mealService.deleteMeal(req.body.mealID);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
})

// This should return the meals of the user indicated by the JWT sent with the request.
// If there is no JWT, then a 403 will be returned instead.
router.get('/', authenticateToken, async (req: any, res: any) => {
	try {
		const meals = await mealService.getMealsByUserID(req.user.user_id);
		res.status(200).json(meals);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

// router.get()

export default router;