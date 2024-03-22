export class UserDoesNotExistError extends Error {
	constructor() {
		super("USER DOES NOT EXIST");
	}
}

export class MealDoesNotExistError extends Error {
	constructor() {
		super('MEAL DOES NOT EXIST');
	}
}

export class FavoriteDoesNotExistError extends Error {
	constructor() {
		super('FAVORITE DOES NOT EXIST');
	}
}