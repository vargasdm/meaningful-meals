"use strict";
// export type Meal = {
// 	mealID: string,
// 	userID: string,
// 	recipeID: string,
// 	timestamp: number
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
class Meal {
    constructor(mealID, userID, recipeID, timestamp) {
        this.mealID = mealID;
        this.userID = userID;
        this.recipeID = recipeID;
        this.timestamp = timestamp;
    }
}
exports.Meal = Meal;
