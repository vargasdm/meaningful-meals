import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuid } from 'uuid';
import mealDAO from '../repository/mealDAO';
import userDAO from '../repository/userDAO';
import recipeService from './recipeService';
import createUserService from './userService';

const userService = createUserService(userDAO);

async function validateMeal(userID: string, recipeID: string) {
	return await userService.userExistsByID(userID)
		&& await recipeService.recipeExists(recipeID);
}

async function createMeal(
	mealID: string,
	userID: string,
	recipeID: string,
	date: string
) {
	if (await validateMeal(userID, recipeID)) {
		return true;
	}

	return false;
}

export default {
	createMeal
};