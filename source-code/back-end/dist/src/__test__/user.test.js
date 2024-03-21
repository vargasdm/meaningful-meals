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
//import { describe, expect, test } from "@jest/globals";
const userService_1 = __importDefault(require("../service/userService"));
let userTable = [
    { user_id: "1", username: "testregistration", password: "TestPass1" },
    { user_id: "2", username: "TestUser2", password: "TestPass1" },
    { user_id: "3", username: "TestUser3", password: "TestPass1" },
];
const mockGetUserByUsername = jest.fn((username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        userTable.forEach((user) => {
            if (user.username === username) {
                data = user;
            }
        });
        return data;
    }
    catch (err) {
        throw new Error(`Unable to get item. Error: ${err}`);
    }
    return null;
}));
const mockCreateUser = jest.fn((item) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        userTable.push(item);
        return item;
    }
    catch (err) {
        throw new Error(`Unable to post item. Error: ${err}`);
    }
    return null;
}));
const userService = (0, userService_1.default)({
    getUserByUsername: mockGetUserByUsername,
    createUser: mockCreateUser,
});
describe("Login Tests", () => {
    // successful login of a user
    test("Successfully login a user.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const username = "testregistration";
        const password = "TestPass1";
        // ACT
        const result = yield userService.validateLogin({
            username,
            password,
        });
        // Assert
        expect(result.isValid).toBe(true);
        expect(result.errors.length).toBe(0);
    }));
    // login fails for invalid credentials
    test("Fail with invalid credentials.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const username = "unknownUser";
        const password = "TestPass1";
        const expected = "USER DOES NOT EXIST";
        // ACT
        const result = yield userService.validateLogin({
            username,
            password,
        });
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBeTruthy();
    }));
    // login fails for empty data
    test("Fail with empty data.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const expected1 = "USERNAME IS NULL";
        const expected2 = "PASSWORD IS NULL";
        // ACT
        const result = yield userService.validateLogin({});
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected1)).toBeTruthy();
        expect(result.errors.find((error) => error === expected2)).toBeTruthy();
    }));
    // check for data type
    // what do you need it to handle and how it should handle the situation
    // having more validation and check hose function in that file
});
describe("Register Tests", () => {
    // successful register of a user
    test("Successfully register a user.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const username = "NewUser25";
<<<<<<< HEAD
        const password = "TestPass01!";
=======
        const password = "TestPass1";
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        // ACT
        const result = yield userService.validateRegistration({
            username,
            password,
        });
        // Assert
        expect(result.isValid).toBe(true);
    }));
    // register fails for invalid username
    test("Failed username validation.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const username = "testregistration";
        const password = "TestPass1";
        const expected = "USER EXISTS";
        // ACT
        const result = yield userService.validateRegistration({
            username,
            password,
        });
        // Assert
        expect(result.errors.find((error) => error === expected)).toBe(expected);
    }));
});
