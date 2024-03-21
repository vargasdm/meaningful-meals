"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFavoriteBody = exports.validateRecipeID = exports.validateRecipeBody = exports.validateRegisterBody = exports.validateLoginBody = void 0;
const logger_1 = require("./logger");
const validateLoginBody = (req, res, next) => {
    if (!req.body ||
        !req.body.username ||
        !req.body.password ||
        !validUsername(req.body.username) ||
        !validPassword(req.body.password)) {
        logger_1.logger.error(`Invalid request body. ${req.body}`);
        return res.status(400).json({ message: `Invalid request body.` });
    }
    next();
};
exports.validateLoginBody = validateLoginBody;
const validateRegisterBody = (req, res, next) => {
    if (!req.body || !req.body.username || !req.body.password) {
        logger_1.logger.error(`Registration request body/body field missing. ${req.body}`);
        return res
            .status(400)
            .json({ message: `Registration request body/body field missing.` });
    }
    if (!validUsername(req.body.username) || !validPassword(req.body.password)) {
        logger_1.logger.error(`Invalid request body field. ${req.body}`);
        return res.status(400).json({ message: `Invalid request body.` });
    }
    next();
};
exports.validateRegisterBody = validateRegisterBody;
const validateRecipeBody = (req, res, next) => {
    if (!req.body ||
        !req.body.title ||
        !req.body.description ||
        !req.body.ingredients ||
        !req.body.instructions ||
        !req.body.user) {
        logger_1.logger.error(`Recipe request body/body field missing. ${req.body}`);
        return res
            .status(400)
            .json({ message: `Recipe request body/body field missing.` });
    }
    next();
};
exports.validateRecipeBody = validateRecipeBody;
const validateRecipeID = (req, res, next) => {
    if (!req.params || !req.params.id) {
        logger_1.logger.error(`Recipe request params/params field missing. ${req.params.id}`);
        return res
            .status(400)
            .json({ message: `Recipe request params/params field missing.` });
    }
    next();
};
exports.validateRecipeID = validateRecipeID;
const validateFavoriteBody = (req, res, next) => {
    if (!req.body || !req.body.user_id || !req.body.content_id) {
        logger_1.logger.error(`Recipe request body/body field missing. ${req.body}`);
        return res
            .status(400)
            .json({ message: `Recipe request body/body field missing.` });
    }
    next();
};
exports.validateFavoriteBody = validateFavoriteBody;
// Fails if contains:
// empty spaces
// less than 6 characters
function validUsername(username) {
    if (username.trim().length === 0 || username.length < 6) {
        return false;
    }
    return true;
}
// Fails if contains:
// empty spaces
// less than 8 characters
// missing atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character
function validPassword(password) {
    if (password.trim().length === 0 || password.length < 8) {
        return false;
    }
    return true;
}
