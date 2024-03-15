import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mealService from '../service/mealService';

const router = express.Router();

router.post('/', async (req: any, res: any) => {
	try {
		await mealService.createMeal(
			req.body.mealID,
			req.body.userID,
			req.body.recipeID,
			req.body.date
		);

		res.sendStatus(200);
	}catch(err){
		console.log(err);
		res.sendStatus(500);
	}
});

export default router;