export class UserDoesntExistError extends Error {
	constructor() {
		super("User doesn't exist.");
	}
}