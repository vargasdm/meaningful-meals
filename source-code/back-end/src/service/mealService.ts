import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuid } from 'uuid';
import mealDAO from '../repository/mealDAO';
import userDAO from '../repository/userDAO';
import recipeService from './recipeService';
import createUserService from './userService';
import type { Validation } from '../util/validation.type';
import { Meal } from '../util/meal';
// import { MealDoesNotExistError } from '../util/errors';

const userService = createUserService(userDAO);

async function validateAddMeal(
	userID: string,
	recipeID: string,
	timestamp: number
): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	try {
		if (!(await userService.userExistsByID(userID))) {
			validation.errors.push('USER DOES NOT EXIST');
		}

		if (!(await recipeService.recipeExists(recipeID))) {
			validation.errors.push('RECIPE DOES NOT EXIST');
		}
	} catch (err) {
		throw err;
	}

	if (new Date(timestamp).getTime() <= 0) {
		validation.errors.push('DATE IS INVALID');
	}

	if (validation.errors.length > 0) {
		return validation;
	}

	validation.isValid = true;
	return validation;
}

async function createMeal(
	userID: string,
	recipeID: string,
	timestamp: number
): Promise<void> {
	try {
		await mealDAO.createMeal(
			new Meal(
				uuid(),
				userID,
				recipeID,
				timestamp
			)
		);
	} catch (err) {
		throw err;
	}
}

async function deleteMealByID(
	mealID: string
): Promise<void> {
	try {
		await mealDAO.deleteMealByID(mealID);
	} catch (err) {
		throw err;
	}
}

async function getMealsByUserID(userID: string) {
	try {
		return await mealDAO.getMealsByUserID(userID);
	} catch (err) {
		throw err;
	}
}

async function getMealsByUserIDAndRecipeID(userID: string, recipeID: string) {
	try {
		const meals = await mealDAO.getMealByUserIDAndRecipeID(userID, recipeID);
		return meals;
	} catch (err) {
		throw err;
	}
}

export default {
	validateAddMeal: validateAddMeal,
	createMeal,
	deleteMeal: deleteMealByID,
	getMealsByUserID,
	getMealByUserIDAndRecipeID: getMealsByUserIDAndRecipeID,
};