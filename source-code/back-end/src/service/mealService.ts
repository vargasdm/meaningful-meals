import dotenv from 'dotenv';
dotenv.config();

import { v4 as uuid } from 'uuid';
import mealDAO from '../repository/mealDAO';
import userDAO from '../repository/userDAO';
import recipeService from './recipeService';
import createUserService from './userService';
import type { Validation } from '../util/validation.type';
import { Meal } from '../util/meal';
import { log } from 'winston';

const userService = createUserService(userDAO);

async function validateAddMeal(
	userID: string,
	recipeID: string,
	timestamp: number
): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	try {
		if (!(await userService.userExistsByID(userID))) {
			console.log('USER DOES NOT EXIST');

			validation.errors.push('USER DOES NOT EXIST');
		}

		if (!(await recipeService.searchedRecipeExists(recipeID)) &&
			!(await recipeService.userRecipeExists(recipeID))) {
			validation.errors.push('RECIPE DOES NOT EXIST');
			console.log('RECIPE DOES NOT EXIST');

		}
		console.log(validation.errors);

	} catch (err) {
		throw err;
	}

	if (new Date(timestamp).getTime() <= 0) {
		validation.errors.push('TIMESTAMP IS INVALID');
	}

	if (validation.errors.length > 0) {
		console.log(validation.errors);

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

async function validateGetMealsOfUserInTimeRange(
	userID: string,
	minTimestamp: string,
	maxTimestamp: number
): Promise<Validation> {
	const validation: Validation = { isValid: false, errors: [] };

	try {
		if (!(await userService.userExistsByID(userID))) {
			validation.errors.push('USER DOES NOT EXIST');
		}
	} catch (err) {
		throw err;
	}

	if (new Date(minTimestamp).getTime() <= 0) {
		validation.errors.push('MINIMUM TIMESTAMP IS INVALID');
	}

	if (new Date(maxTimestamp).getTime() <= 0) {
		validation.errors.push('MAXIMUM TIMESTAMP IS INVALID');
	}

	if (validation.errors.length > 0) {
		return validation;
	}

	validation.isValid = true;
	return validation;
}

async function getMealsOfUserInTimeRange(
	userID: string,
	minTimestamp: number,
	maxTimestamp: number
) {
	try {
		return await mealDAO.getMealsOfUserInTimeRange(
			userID, minTimestamp, maxTimestamp
		)
	} catch (err) {
		throw err;
	}
}

export default {
	validateAddMeal: validateAddMeal,
	createMeal,
	deleteMeal: deleteMealByID,
	getMealsByUserID,
	validateGetMealsOfUserInTimeRange,
	getMealsOfUserInTimeRange
};