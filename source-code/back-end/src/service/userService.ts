//import userDao from "../repository/userDAO";
import { UserDoesNotExistError } from '../util/errors';
import type { Validation } from '../util/response';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

export default function createUserService(dao: any) {
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
			const result = await userExists(credentials.username)
			if (result) {
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
				validation.errors.push('USERNAME INVALID');
			}
	
			if (!validatePassword(credentials.username)) {
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
		const user = await dao.getUserByUsername(username);
		return user;
	}
	
	async function userExists(username: string) {
		try {
			const user = await dao.getUserByUsername(username);
			return user && user.user_id && user.username && user.password;
		} catch (err) {
			if (err instanceof UserDoesNotExistError) {
				return false;
			}
	
			throw err;
		}
	}
	
	async function createUser(user: any) {
		try {
			await dao.createUser({
				user_id: uuid(),
				username: user.username,
				password: await bcrypt.hash(user.password, 10),
				role: "user",
			});
		} catch (err) {
			throw err;
		}
	}

	return {
		createUser,
		credentialsMatch,
		getUserByUsername,
		userExists,
		validateLogin,
		validateRegistration
	};
}

/*

export default {
	createUser,
	credentialsMatch,
	getUserByUsername,
	userExists,
	validateLogin,
	validateRegistration
};
*/