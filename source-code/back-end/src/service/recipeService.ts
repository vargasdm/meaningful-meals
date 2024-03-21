import dotenv from "dotenv";
dotenv.config();
import { v4 as uuid } from "uuid";
// const recipeDAO = require("../repository/recipeDAO.ts");
import recipeDAO from "../repository/recipeDAO";
import userDAO from "../repository/userDAO";

import axios from "axios";
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// TODO: collate API search results with those from our own database
// TODO: use Levenshtein distance for a simple search?
async function searchRecipes(query: string) {
	const result = await axios.get(
		`https://api.spoonacular.com/recipes/` +
		`complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}` +
		`&instructionsRequired=true`
	);
	// console.log(result);
	if (!result.data.results) {
		return false;
	}
	return result.data;
}

// TODO: union Spoonacular and local search spaces
// i.e., if we don't find the ID with Spoonacular, then search local
async function getRecipe(id: string) {
	try {
		const result = await axios.get(
			`https://api.spoonacular.com/recipes/` +
			`${id}/information?apiKey=${SPOONACULAR_API_KEY}` +
			`&includeNutrition=true`
		);

		return result.data;
	} catch (err) {
		try {
			const result = await recipeDAO.getRecipeById(id);
			return result.data;
		} catch (err) {
			throw err;
		}
	}

	// if (!result.data.id) {
	// 	return false;
	// }
	// //   console.log(result);
	// return result.data;
}

async function getRecipeById(recipeId: string) {
	// console.log(recipeId);

	const data: any = await recipeDAO.getRecipeById(recipeId);

	// console.log(data);

	return data ? data : null;
}

async function searchedRecipeExists(id: string): Promise<boolean> {
	// console.log(`recipeService.searchedRecipeExists(${id})...`);
	if (!id) {
		console.log("recipe doesnt exist");
		return false;
	}

	try {
		const recipe = await getRecipe(id);
		console.log(`recipeService.searchedRecipeExists(${id})...`);
		return recipe ? true : false;
	} catch (err) {
		console.log(err);
		return false;
	}

	// return recipe;
}

async function userRecipeExists(id: string): Promise<boolean> {
	// console.log(`recipeService.userRecipeExists(${id})...`);
	if (!id) {
		console.log("recipe doesnt exist");

		return false;
	}
	// console.log(id);

	const recipe = await getRecipeById(id);
	console.log(`recipeService.userRecipeExists(${id})...`);

	return recipe;
}

async function getUserRecipes(username: string) {
	console.log(username);

	const data: any = await recipeDAO.getRecipesByUsername(username);

	// console.log(data);

	return data ? data : null;
}

async function putRecipe(receivedData: any) {
	console.log(`recipeService.postRecipe(${JSON.stringify(receivedData)})...`);

	let data = await recipeDAO.updateRecipe({
		id: receivedData.id,
		title: receivedData.title,
		description: receivedData.description,
		ingredients: receivedData.ingredients,
		instructions: receivedData.instructions,
		user: receivedData.user,
	});
	console.log(data);
	return data ? data : null;
}

async function createRecipe(receivedData: any) {
	let data = await recipeDAO.postRecipe({
		id: uuid(),
		title: receivedData.title,
		description: receivedData.description,
		ingredients: receivedData.ingredients,
		instructions: receivedData.instructions,
		user: receivedData.user,
	});
	console.log(data);
	return data ? data : null;
}

async function deleteRecipe(receivedData: any) {
	console.log(receivedData);

	let data = await recipeDAO.deleteRecipe(receivedData);
	console.log(data);
	return data ? data : null;
}

export default {
	searchRecipes,
	getRecipe,
	getUserRecipes,
	putRecipe,
	createRecipe,
	deleteRecipe,
	searchedRecipeExists,
	getRecipeById,
	userRecipeExists,
};
