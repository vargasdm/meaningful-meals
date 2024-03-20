// export type Meal = {
// 	mealID: string,
// 	userID: string,
// 	recipeID: string,
// 	timestamp: number
// }

export class Meal {
	mealID: string;
	userID: string;
	recipeID: string;
	timestamp: number;

	constructor(
		mealID: string,
		userID: string,
		recipeID: string,
		timestamp: number
	) {
		this.mealID = mealID;
		this.userID = userID;
		this.recipeID = recipeID;
		this.timestamp = timestamp;
	}
}