"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../util/errors");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
function createUserService(dao) {
    function validateCredentials(credentials) {
        const errors = [];
        if (!credentials) {
            errors.push("CREDENTIALS ARE NULL");
            return { isValid: false, errors };
        }
        if (!credentials.username) {
            errors.push("USERNAME IS NULL");
        }
        if (!credentials.password) {
            errors.push("PASSWORD IS NULL");
        }
        if (errors.length > 0) {
            return { isValid: false, errors };
        }
        return { isValid: true, errors };
    }
    function validateLogin(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateCredentials(credentials);
            if (!validation.isValid) {
                return validation;
            }
            try {
                const result = yield userExistsByUsername(credentials.username);
                if (result) {
                    return validation;
                }
                validation.isValid = false;
                validation.errors.push("USER DOES NOT EXIST");
                return validation;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function validateRegistration(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const validation = validateCredentials(credentials);
            if (!validation.isValid) {
                return validation;
            }
            try {
                if (yield userExistsByUsername(credentials.username)) {
                    validation.isValid = false;
                    validation.errors.push("USER EXISTS");
                    return validation;
                }
                if (!validateUsername(credentials.username)) {
                    validation.errors.push("USERNAME INVALID");
                }
                if (!validatePassword(credentials.password)) {
                    validation.errors.push("PASSWORD INVALID");
                }
                if (validation.errors.length > 0) {
                    validation.isValid = false;
                    return validation;
                }
                return validation;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function validateUpdate(credentials) {
        const errors = [];
        if (!credentials) {
            errors.push("CREDENTIALS ARE NULL");
            return { isValid: false, errors };
        }
        if (!credentials.username) {
            errors.push("USERNAME IS NULL");
        }
        if (!validateUsername(credentials.username)) {
            errors.push("USERNAME INVALID");
        }
        if (credentials.password.trim() > 0 &&
            !validatePassword(credentials.password)) {
            errors.push("PASSWORD INVALID");
        }
        if (errors.length > 0) {
            return { isValid: false, errors };
        }
        return { isValid: true, errors };
    }
    // Fails if contains:
    // empty spaces
    // less than 6 characters
    function validateUsername(username) {
        if (username.trim().length === 0 || username.length < 6) {
            return false;
        }
        return true;
    }
    // Fails if contains:
    // empty spaces
    // less than 8 characters
    function validatePassword(password) {
        if (password.trim().length === 0 || password.length < 8) {
            return false;
        }
        let hasUpperCase = false;
        let hasLowerCase = false;
        let hasNumber = false;
        let hasSymbol = false;
        for (let i = 0; i < password.length; i++) {
            const charCode = password.charCodeAt(i);
            // Check for uppercase letter
            if (charCode >= 65 && charCode <= 90) {
                hasUpperCase = true;
            }
            // Check for lowercase letter
            else if (charCode >= 97 && charCode <= 122) {
                hasLowerCase = true;
            }
            // Check for number
            else if (charCode >= 48 && charCode <= 57) {
                hasNumber = true;
            }
            // Check for symbol !@#$%^&*(),.
            else if ((charCode >= 33 && charCode <= 46)) {
                hasSymbol = true;
            }
            // If all checks are met, no need to continue the loop
            if (hasUpperCase && hasLowerCase && hasNumber && hasSymbol) {
                break;
            }
        }
        // Return true only if all checks pass
        return hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
    }
    // This should return whether the given credentials match those of the user
    // specified by the 'username' field of credentials.
    function credentialsMatch(credentials, targetUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return (credentials.username === targetUser.username &&
                (yield bcrypt_1.default.compare(credentials.password, targetUser.password)));
        });
    }
    function getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield dao.getUserByUsername(username);
            return user;
        });
    }
    function userExistsByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!username) {
                return false;
            }
            try {
                const user = yield dao.getUserByUsername(username);
                return (user &&
                    user.user_id &&
                    user.username &&
                    user.password);
            }
            catch (err) {
                if (err instanceof errors_1.UserDoesNotExistError) {
                    return false;
                }
                throw err;
            }
        });
    }
    function userExistsByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return false;
            }
            try {
                const user = yield dao.getUserById(id);
                return (user &&
                    user.user_id &&
                    user.username &&
                    user.password);
            }
            catch (err) {
                if (err instanceof errors_1.UserDoesNotExistError) {
                    return false;
                }
                throw err;
            }
        });
    }
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dao.createUser({
                    user_id: (0, uuid_1.v4)(),
                    username: user.username,
                    password: yield bcrypt_1.default.hash(user.password, 10),
                    role: "user",
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    function updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield dao.getUserByUsername(user.username);
                if (!userId) {
                    throw Error("USER DOES NOT EXIST");
                }
                if (user.password && user.password.trim() > 0) {
                    yield dao.updateUser({
                        user_id: userId.user_id,
                        username: user.username,
                        password: yield bcrypt_1.default.hash(user.password, 10),
                    });
                }
                else {
                    yield dao.updateUsername({
                        user_id: userId.user_id,
                        username: user.newUsername,
                    });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    return {
        createUser,
        credentialsMatch,
        getUserByUsername,
        userExists: userExistsByUsername,
        userExistsByID,
        validateLogin,
        validateRegistration,
        updateUser,
        validateUpdate,
    };
}
exports.default = createUserService;
