import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();
import recipeService from '../service/recipeService';

// This should return search results if there's a 'query' query parameter,
// or a specific recipe if there's an 'id' query parameter
router.get('/', async (req: any, res: any) => {
	// console.log(req.query);
	if (req.query.query) {
		const recipes = await recipeService.searchRecipes(req.query.query);
		res.status(200).json(recipes);
		return;
	}

	if (req.query.id) {
		const recipe: any = await recipeService.getRecipe(req.query.id);
		res.status(200).json(recipe);
		return;
	}

	res.status(400).json({ error: 'QUERY PARAMS INVALID' })
});

export default router;