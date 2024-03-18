import dotenv from 'dotenv';
dotenv.config();
import { v4 as uuid } from 'uuid';
import mealDAO from '../repository/mealDAO';
import userDAO from '../repository/userDAO';
import recipeService from './recipeService';
import createUserService from './userService';
import type { Validation } from '../util/validation.type';

const userService = createUserService(userDAO);

async function validateMeal(
	userID: string,
	recipeID: string,
	date: string): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	if (!(await userService.userExistsByID(userID))) {
		validation.errors.push('USER DOES NOT EXIST');
	}

	if (!(await recipeService.recipeExists(recipeID))) {
		validation.errors.push('RECIPE DOES NOT EXIST');
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

// This should create a meal with the given arguments.
// It should return nothing on succes, and implicitly throw an error on error.
async function createMeal(
	userID: string,
	recipeID: string,
	date: string
): Promise<void> {
	await mealDAO.createMeal(
		uuid(),
		userID,
		recipeID,
		date
	);
}

async function getMealsByUserID(userID: string) {
	try {
		return (await mealDAO.getMealsByUserID(userID)).Items;
	} catch (err) {
		throw err;
	}
}

export default {
	validateMeal,
	createMeal,
	getMealsByUserID
};