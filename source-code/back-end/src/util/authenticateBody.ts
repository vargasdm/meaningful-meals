import { logger } from "./logger";

const validateLoginBody = (req: any, res: any, next: any) => {
	if (
		!req.body ||
		!req.body.username ||
		!req.body.password ||
		!validUsername(req.body.username) ||
		!validPassword(req.body.password)
	) {
		logger.error(`Invalid request body. ${req.body}`);
		return res.status(400).json({ message: `Invalid request body.` });
	}
	next();
};

const validateRegisterBody = (req: any, res: any, next: any) => {
	console.log("authenticateBody.validateRegisterBody");
	if (!req.body || !req.body.username || !req.body.password) {
		console.log("Registration request body/body field missing.");
		logger.error(`Registration request body/body field missing. ${req.body}`);
		return res
			.status(400)
			.json({ message: `Registration request body/body field missing.` });
	}

	if (!validUsername(req.body.username) || !validPassword(req.body.password)) {
		console.log("Invalid request body field.");
		logger.error(`Invalid request body field. ${req.body}`);
		return res.status(400).json({ message: `Invalid request body.` });
	}

	console.log("Registration body valid.");
	next();
};

const validateRecipeBody = (req: any, res: any, next: any) => {
	console.log("validateRecipeBody");
	if (
		!req.body ||
		!req.body.title ||
		!req.body.ingredients ||
		!req.body.instructions ||
		!req.body.user
	) {
		console.log("Recipe request body/body field missing.");
		logger.error(`Recipe request body/body field missing. ${req.body}`);
		return res
			.status(400)
			.json({ message: `Recipe request body/body field missing.` });
	}

	console.log("Registration body valid.");
	next();
};
const validateRecipeID = (req: any, res: any, next: any) => {
	console.log("validateRecipeID");
	if (!req.params || !req.params.id) {
		console.log("Recipe request params/params field missing.");
		logger.error(
			`Recipe request params/params field missing. ${req.params.id}`
		);
		return res
			.status(400)
			.json({ message: `Recipe request params/params field missing.` });
	}

	console.log("Recipe ID param valid.");
	next();
};

const validateFavoriteBody = (req: any, res: any, next: any) => {
	if (!req.body || !req.body.user_id || !req.body.content_id) {
		logger.error(`Recipe request body/body field missing. ${req.body}`);
		return res
			.status(400)
			.json({ message: `Recipe request body/body field missing.` });
	}

	next();
};

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

export {
	validateLoginBody,
	validateRegisterBody,
	validateRecipeBody,
	validateRecipeID,
	validateFavoriteBody,
};
