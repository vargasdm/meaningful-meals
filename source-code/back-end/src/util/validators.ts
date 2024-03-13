import { logger } from "./logger";

function validateCredentialsExist(body: any) {
	if (!body) {
		return { error: 'BODY DOES NOT EXIST' };
	}

	if (!body.username) {
		return { error: 'USERNAME DOES NOT EXIST' };
	}

	if (!body.password) {
		return { error: 'PASSWORD DOES NOT EXIST' };
	}

	return true;
}

// const validateRegisterBody = (req: any, res: any, next: any) => {
// 	console.log('authenticateBody.validateRegisterBody');
// 	if (!req.body || !req.body.username || !req.body.password) {
// 		console.log('Registration request body/body field missing.');
// 		logger.error(`Registration request body/body field missing. ${req.body}`);
// 		return res.status(400).json({ message: `Registration request body/body field missing.` });
// 	}

// 	if (!validUsername(req.body.username) || !validPassword(req.body.password)) {
// 		console.log('Invalid request body field.');
// 		logger.error(`Invalid request body field. ${req.body}`);
// 		return res.status(400).json({ message: `Invalid request body.` });
// 	}

// 	console.log('Registration body valid.');
// 	next();
// };

function validateRegisterBody(body: any) {
	const validation: any = validateCredentialsExist(body);

	if (validation.error) {
		return validation.error;
	}

	if (!validUsername(body.username)) {
		return { error: 'USERNAME INVALID' };
	}

	if (!validPassword(body.password)) {
		return { error: 'PASSWORD INVALID' };
	}

	return true;
}

// Fails if contains:
// empty spaces
// less than 6 characters
function validUsername(username: string): boolean {
	if (username.trim().length === 0 || username.length < 6) {
		return false;
	}

	return true;
}

// Fails if contains:
// empty spaces
// less than 8 characters
// missing atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character
function validPassword(password: string): boolean {
	if (password.trim().length === 0 || password.length < 8) {
		return false;
	}

	return true;
}

export default { validateCredentialsExist, validateRegisterBody };
