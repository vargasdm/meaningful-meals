import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuid } from 'uuid';
import mealDAO from '../repository/mealDAO';
import userDAO from '../repository/userDAO';
import recipeService from './recipeService';
import createUserService from './userService';
import type { Validation } from '../util/validation.type';
import { MealDoesNotExistError } from '../util/errors';

const userService = createUserService(userDAO);

async function validateAddMeal(
	userID: string,
	recipeID: string,
	date: string
): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	try {
		if (!(await userService.userExistsByID(userID))) {
			validation.errors.push('USER DOES NOT EXIST');
		}

		if (!(await recipeService.recipeExists(recipeID))) {
			validation.errors.push('RECIPE DOES NOT EXIST');
		}

		if (await mealExists(userID, recipeID)) {
			console.log('meal exists');
			validation.errors.push('MEAL EXISTS');
		}
	} catch (err) {
		throw err;
	}

	if (isNaN(Date.parse(date))) {
		validation.errors.push('DATE IS INVALID');
	}

	if (validation.errors.length > 0) {
		return validation;
	}

	validation.isValid = true;
	return validation;
}

async function validateRemoveMeal(
	userID: string,
	recipeID: string
): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	try {
		if (!(await mealExists(userID, recipeID))) {
			validation.errors.push('MEAL DOES NOT EXIST');
			return validation;
		}
	} catch (err) {
		throw err;
	}

	validation.isValid = true;
	return validation;
}

// This should create a meal with the given arguments.
// It should return nothing on succes, and implicitly throw an error on error.
async function createMeal(
	userID: string,
	recipeID: string,
	date: string
): Promise<void> {
	try {
		await mealDAO.createMeal(
			uuid(),
			userID,
			recipeID,
			date
		);
	} catch (err) {
		throw err;
	}
}

async function deleteMeal(
	userID: string,
	recipeID: string
): Promise<void> {
	try {
		const meal = await getMealByUserIDAndRecipeID(userID, recipeID);
		console.log(JSON.stringify(meal));
		// await mealDAO.delete
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

async function getMealByUserIDAndRecipeID(userID: string, recipeID: string) {
	try {
		const meal = await mealDAO.getMealByUserIDAndRecipeID(userID, recipeID);
		return meal;
	} catch (err) {
		throw err;
	}
}

async function mealExists(userID: string, recipeID: string) {
	if (!userID || !recipeID) {
		return false;
	}

	try {
		const meal = await mealDAO.getMealByUserIDAndRecipeID(userID, recipeID);
		return meal ? true : false;
	} catch (err) {
		if (err instanceof MealDoesNotExistError) {
			return false;
		}

		console.error(err);
		throw err;
	}
}

export default {
	validateAddMeal: validateAddMeal,
	validateRemoveMeal,
	createMeal,
	deleteMeal,
	getMealsByUserID,
	getMealByUserIDAndRecipeID,
};