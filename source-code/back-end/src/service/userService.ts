import userDao from "../repository/userDAO";
import { UserDoesNotExistError } from '../util/errors';
// const uuid = require("uuid");
const bcrypt = require("bcrypt");

export type Validation = {
	isValid: boolean,
	errors: string[]
}

function validateCredentials(credentials: any): Validation {
	const errors: string[] = [];

	if (!credentials) {
		errors.push('CREDENTIALS ARE NULL');
		return { isValid: false, errors };
	}

	if (!credentials.username) {
		errors.push('USERNAME IS NULL');
	}

	if (!credentials.password) {
		errors.push('PASSWORD IS NULL');
	}

	if (errors.length > 0) {
		return { isValid: false, errors };
	}

	return { isValid: true, errors };
}

async function validateLogin(credentials: any): Promise<Validation> {
	const validation: Validation = validateCredentials(credentials);

	if (!validation.isValid) {
		return validation;
	}

	try {
		if (await userExists(credentials.username)) {
			return validation;
		}

		validation.isValid = false;
		validation.errors.push('USER DOES NOT EXIST');
		return validation;
	} catch (err) {
		throw err;
	}
}

async function validateRegistration(credentials: any): Promise<Validation> {
	const validation: Validation = validateCredentials(credentials);

	if (!validation.isValid) {
		return validation;
	}

	try {
		if (await userExists(credentials.username)) {
			validation.isValid = false;
			validation.errors.push('USER EXISTS');
			return validation;
		}

		if (!validateUsername(credentials.username)) {
			// validation.isValid = false;
			validation.errors.push('USERNAME INVALID');
		}

		if (!validatePassword(credentials.username)) {
			// validation.isValid = false;
			validation.errors.push('PASSWORD INVALID');
		}

		if (validation.errors.length > 0) {
			validation.isValid = false;
			return validation;
		}

		return validation;
	} catch (err) {
		throw err;
	}
}

// Fails if contains:
// empty spaces
// less than 6 characters
function validateUsername(username: string): boolean {
	if (username.trim().length === 0 || username.length < 6) {
		return false;
	}

	return true;
}

// Fails if contains:
// empty spaces
// less than 8 characters
// missing atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character
function validatePassword(password: string): boolean {
	if (password.trim().length === 0 || password.length < 8) {
		return false;
	}

	return true;
}

// This should return whether the given credentials match those of the user
// specified by the 'username' field of credentials.
async function credentialsMatch(credentials: any, targetUser: any) {
	return credentials.username === targetUser.username
		&& await bcrypt.compare(credentials.password, targetUser.password);
}

async function getUserByUsername(username: string) {
	const users = await userDao.getUserByUsername(username);

	if (users.length !== 1) {
		throw new UserDoesNotExistError();
	}

	return users[0];
}

async function userExists(username: string) {
	const users = await userDao.getUserByUsername(username);
	return users.length === 1;
}

async function createUser(user: any) {
	// console.log(`userService.postUser(${JSON.stringify(receivedData)})...`);

	// if (await validateUsername(receivedData.username)) {
	// 	console.log('username validated.');
	// 	let data = await userDao.postUser({
	// 		user_id: uuid.v4(),
	// 		username: receivedData.username,
	// 		password: await bcrypt.hash(receivedData.password, 10),
	// 		role: "user",
	// 	});
	// 	return data ? data : null;
	// }

	return null;
}

// async function validateUsername(username: string) {
// 	// console.log(`userService.validateUsername(${username})...`);

// 	// try {
// 	// 	const users: any = await userDao.getUserByUsername(username);
// 	// 	console.log(`userService.validateUsername users: ${JSON.stringify(users)}`);
// 	// 	if (users.length > 0) {
// 	// 		console.log('Username taken.');
// 	// 		return false;
// 	// 	} else {
// 	// 		console.log('Username not taken.');
// 	// 		return true;
// 	// 	}
// 	// } catch (err) {
// 	// 	console.error(err);
// 	// }
// }

export default {
	postUser: createUser,
	credentialsMatch,
	getUserByUsername,
	usernameExists: userExists,
	validateLogin,
	validateRegistration
};
