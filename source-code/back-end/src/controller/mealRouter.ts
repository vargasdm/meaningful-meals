import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { authenticateToken } from '../util/authenticateToken';
import mealService from '../service/mealService';
import type { Validation } from '../util/validation.type';

const router = express.Router();

router.post('/', authenticateToken, async (req: any, res: any) => {
	console.log(req.user.user_id);
	console.log(req.body.recipeID);
	console.log(req.body.timestamp);
	try {
		const validation: Validation = await mealService.validateAddMeal(
			req.user.user_id,
			req.body.recipeID,
			req.body.timestamp
		);
		// console.log(`this is ${validation}`);

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

// Update the date of a meal
router.post('/:mealID', authenticateToken, async (req: any, res: any) => {
	if (!req.body.timestamp
		|| !mealService.isValidTimestamp(req.body.timestamp)) {
		res.status(400).json({ error: 'TIMESTAMP IS INVALID' });
		return;
	}

	if (!req.body.mealID) {
		res.status(400).json({ error: 'MEAL ID IS INVALID' });
	}

	if (!(await mealService.mealBelongsToUser(req.body.mealID, req.user.user_id))) {
		res.status(400).json({ error: 'MEAL DOES NOT BELONG TO USER' })
	}

	try {
		await mealService.updateMealTimestampByID(
			req.body.mealID,
			req.body.timestamp
		)
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.delete('/:mealID', authenticateToken, async (req: any, res: any) => {
	try {
		await mealService.deleteMeal(req.params.mealID);
		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// This should return the meals of the user indicated by the JWT sent with the request.
// If there is no JWT, then a 403 will be returned instead.
router.get('/', authenticateToken, async (req: any, res: any) => {
	if (req.query.minTimestamp && req.query.maxTimestamp) {
		const validations = await mealService.validateGetMealsOfUserInTimeRange(
			req.user.user_id,
			req.query.minTimestamp,
			req.query.maxTimestamp
		);

		if (!validations.isValid) {
			res.status(400).json({ errors: validations.errors });
			return;
		}

		const meals = await mealService.getMealsOfUserInTimeRange(
			req.user.user_id,
			req.query.minTimestamp,
			req.query.maxTimestamp
		);

		res.status(200).json(meals);
		return;
	}

	try {
		const meals = await mealService.getMealsByUserID(req.user.user_id);
		res.status(200).json(meals);
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

export default router;