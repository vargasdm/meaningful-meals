import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();
import recipeService from '../service/recipeService';
// const recipeService = require('../service/recipeService.ts');

router.get('/:query', async (req: any, res: any) => {
	const recipes = await recipeService.searchRecipes(req.params.query);
	res.json(recipes);
});

router.get('/:id/information', async (req: any, res: any) => {
	const data = await recipeService.getRecipe(req.params.id);
	res.json(data.data);
});

export default router;