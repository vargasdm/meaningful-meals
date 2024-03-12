import dotenv from 'dotenv';
dotenv.config();
const recipeDAO = require('../repository/recipeDAO.ts');

import axios from 'axios';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// TODO: collate API search results with those from our own database
// TODO: use Levenshtein distance for a simple search?
async function searchRecipes(query: string) {
	const result = await axios.get(`https://api.spoonacular.com/recipes/`
		+ `complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}`
		+ `&instructionsRequired=true`);
	// console.log(result);
	return result.data;
}

// TODO: union Spoonacular and local search spaces
// i.e., if we don't find the ID with Spoonacular, then search local
async function getRecipe(id: string) {
	const result = await axios.get(`https://api.spoonacular.com/recipes/`
		+ `${id}/information?apiKey=${SPOONACULAR_API_KEY}`
		+ `&includeNutrition=true`);
	// console.log(result);
	return result.data;
}

async function getUserRecipes(username: string) {
	console.log(username);
	
	
	const data : any = await recipeDAO.getRecipesByUsername(username);

	console.log(data);
	
	return data ? data : null;
}

export default {
	searchRecipes,
	getRecipe,
	getUserRecipes
}