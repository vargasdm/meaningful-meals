require('dotenv').config();
const recipeDAO = require('../repository/recipeDAO.ts');
const axios = require('axios').default;
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

async function searchRecipes(query: string){
	const result = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey='
		+ SPOONACULAR_API_KEY + `&query=${query}&instructionsRequired=true`);
	console.log(result);
}

module.exports = {
	searchRecipes
}