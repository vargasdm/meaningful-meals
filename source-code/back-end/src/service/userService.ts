import userDao from "../repository/userDAO";
const uuid = require("uuid");
const bcrypt = require("bcrypt");

async function login(receivedData: any) {
	console.log(`userService.login(${JSON.stringify(receivedData)})...`); 

	const data: any = await userDao.getUserByUsername(receivedData.username);
	console.log(`data: ${JSON.stringify(data)}`);

	if (
		data &&
		receivedData.username === data[0].username &&
		(await bcrypt.compare(receivedData.password, data[0].password))
	) {
		return data;
	}

	return null;
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

export { postUser as postEmployee, login };
