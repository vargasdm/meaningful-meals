import dotenv from 'dotenv';
dotenv.config();
// const recipeDAO = require('../repository/recipeDAO.ts');

import axios from 'axios';
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

async function searchRecipes(query: string) {
	const result = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey='
		+ SPOONACULAR_API_KEY + `&query=${query}&instructionsRequired=true`);
	console.log(result);
	return result.data;
}

export {
	searchRecipes
}