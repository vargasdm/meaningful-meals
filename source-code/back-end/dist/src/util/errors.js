"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealDoesNotExistError = exports.UserDoesNotExistError = void 0;
class UserDoesNotExistError extends Error {
    constructor() {
        super("USER DOES NOT EXIST");
    }
}
exports.UserDoesNotExistError = UserDoesNotExistError;
class MealDoesNotExistError extends Error {
    constructor() {
        super('MEAL DOES NOT EXIST');
    }
}
exports.MealDoesNotExistError = MealDoesNotExistError;
