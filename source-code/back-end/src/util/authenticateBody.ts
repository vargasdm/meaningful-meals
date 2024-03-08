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
  if (!req.body || !req.body.username || !req.body.password) {
    logger.error(`Invalid request body. ${req.body}`);
    return res.status(400).json({ message: `Invalid request body.` });
  }

  if (!validUsername(req.body.username) || !validPassword(req.body.password)) {
    logger.error(`Invalid request body. ${req.body}`);
    return res.status(400).json({ message: `Invalid request body.` });
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

export { validateLoginBody, validateRegisterBody };
