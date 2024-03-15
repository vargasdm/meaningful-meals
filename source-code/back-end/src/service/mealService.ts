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

	// return await userService.userExistsByID(userID)
	// 	&& await recipeService.recipeExists(recipeID);
	validation.isValid = true;
	return validation;
}

async function createMeal(
	// mealID: string,
	userID: string,
	recipeID: string,
	date: string
) {
	// if (await validateMeal(userID, recipeID)) {
	// 	return true;
	// }

	await mealDAO.createMeal(
		// mealID,
		uuid(),
		userID,
		recipeID,
		date
	);

	// return false;
}

export default {
	validateMeal,
	createMeal
};