export class UserDoesNotExistError extends Error {
	constructor() {
		super("USER DOES NOT EXIST");
	}
}