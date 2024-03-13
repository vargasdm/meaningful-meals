import userDao from "../repository/userDAO";
import { UserDoesntExistError } from '../util/errors';
const uuid = require("uuid");
const bcrypt = require("bcrypt");

// This should return whether the given credentials match those of the user
// specified by the 'username' field of credentials.
async function credentialsMatch(credentials: any, targetUser: any) {
	try {
		// const targetUser: any = await userDao.getUserByUsername(credentials.username);
		// console.log(`targetUser: ${JSON.stringify(targetUser)}`);

		return credentials.username === targetUser.username
			&& await bcrypt.compare(credentials.password, targetUser.password);
	} catch (err) {
		console.error(err);
		throw err;
	}
}

async function getUserByUsername(username: string) {
	const users = await userDao.getUserByUsername(username);

	if (users.length === 0) {
		throw new UserDoesntExistError();
	}

	return users[0];
}

async function postUser(receivedData: any) {
	console.log(`userService.postUser(${JSON.stringify(receivedData)})...`);

	if (await validateUsername(receivedData.username)) {
		console.log('username validated.');
		let data = await userDao.postUser({
			user_id: uuid.v4(),
			username: receivedData.username,
			password: await bcrypt.hash(receivedData.password, 10),
			role: "user",
		});
		return data ? data : null;
	}

	return null;
}

async function validateUsername(username: string) {
	console.log(`userService.validateUsername(${username})...`);

	try {
		const users: any = await userDao.getUserByUsername(username);
		console.log(`userService.validateUsername users: ${JSON.stringify(users)}`);
		if (users.length > 0) {
			console.log('Username taken.');
			return false;
		} else {
			console.log('Username not taken.');
			return true;
		}
	} catch (err) {
		console.error(err);
	}
}

export default { postUser, credentialsMatch, getUserByUsername };
