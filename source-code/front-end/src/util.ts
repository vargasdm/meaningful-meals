function getNumCalories(recipe: any) {
	const calories = recipe.nutrition.nutrients.find(
		(nutrient: any) => nutrient.name === 'Calories'
	);

	return calories.amount;
}

export default {
	getNumCalories
};