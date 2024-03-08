import dotenv from 'dotenv';
dotenv.config();
// const recipeDAO = require('../repository/recipeDAO.ts');

import axios from 'axios';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// TODO: collate API search results with those from our own database
// TODO: use Levenshtein distance for a simple search?
async function searchRecipes(query: string) {
	const result = await axios.get(`https://api.spoonacular.com/recipes/`
		+ `complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}`
		+ `&instructionsRequired=true`);
	console.log(result);
	return result.data;
}

async function getRecipe(id: string) {
	// try {
	const result = await axios.get(`https://api.spoonacular.com/recipes/`
		+ `${id}/information?apiKey=${SPOONACULAR_API_KEY}`);
	console.log(result);
	return result.data;

	// } catch (err) {
	// 	console.error(err);
	// 	return null;
	// }
}

export default {
	searchRecipes,
	getRecipe
}