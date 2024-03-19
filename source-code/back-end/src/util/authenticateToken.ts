import dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");
import { logger } from "./logger";

const authenticateToken = (req: any, res: any, next: any) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Unauthorized Access" });
	}

	jwt.verify(token, process.env.JWT_KEY, (err: any, user: any) => {
		if (err) {
			logger.error(err);
			return res.status(403).json({ message: "Forbiden Access" });
		}
		req.user = user;
		next();
	});
};

const authenticateNoToken = (req: any, res: any, next: any) => {
	console.log('authenticateToken.authenticateNoToken...');
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token) {
		return res.status(401).json({ message: "Unauthorized Access" });
	} else {
		console.log('Confirmed no token.');
	}

	next();
};

export { authenticateToken, authenticateNoToken };
