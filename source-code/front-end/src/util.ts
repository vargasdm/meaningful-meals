// export class NumCaloriesDoNotExistError extends Error {
// 	constructor() {
// 		super('CALORIES FIELD DOES NOT EXIST');
// 	}
// }

function getNumCalories(recipe: any) {
	// if (!recipe
	// 	|| recipe.nutrition
	// 	|| recipe.nutrition.nutrients
	// ) {
	// 	throw new NumCaloriesDoNotExistError();
	// }

	const calories = recipe.nutrition.nutrients.find(
		(nutrient: any) => nutrient.name === 'Calories'
	);

	// if (!calories) {
	// 	throw new NumCaloriesDoNotExistError();
	// }

	return calories.amount;
}

export default {
	// NumCaloriesDoNotExistError,
	getNumCalories
};