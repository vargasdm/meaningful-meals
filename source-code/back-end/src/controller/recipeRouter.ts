import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();
const recipeService = require('../service/recipeService.ts');

router.get('/:query', async (req: any, res: any) => {
	const recipes = await recipeService.searchRecipes(req.params.query);
	res.json(recipes);
});

export default router;