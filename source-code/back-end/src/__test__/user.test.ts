//import { describe, expect, test } from "@jest/globals";
import UserService from "../service/userService";
import { v4 as uuid } from "uuid";

let userTable = [
  { user_id: "1", username: "testregistration", password: "TestPass1" },
  { user_id: "2", username: "TestUser2", password: "TestPass1" },
  { user_id: "3", username: "TestUser3", password: "TestPass1" },
];

const mockGetUserByUsername = jest.fn(async (username) => {
  try {
    let data;
    userTable.forEach((user) => {
      if (user.username === username) {
        data = user;
      }
    });

    return data;
  } catch (err) {
    throw new Error(`Unable to get item. Error: ${err}`);
  }

  return null;
});

const mockCreateUser = jest.fn(async (item) => {
  try {
    userTable.push(item);
    return item;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const userService = UserService({
  getUserByUsername: mockGetUserByUsername,
  createUser: mockCreateUser,
});

describe("Login Tests", () => {
  // successful login of a user
  test("Successfully login a user.", async () => {
    // Arrange
    const username = "testregistration";
    const password = "TestPass1";

    // ACT
    const result = await userService.validateLogin({
      username,
      password,
    });

    // Assert
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  // login fails for invalid credentials
  test("Fail with invalid credentials.", async () => {
    // Arrange
    const username = "unknownUser";
    const password = "TestPass1";
    const expected = "USER DOES NOT EXIST";

    // ACT
    const result = await userService.validateLogin({
      username,
      password,
    });

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBeTruthy();
  });

  // login fails for empty data
  test("Fail with empty data.", async () => {
    // Arrange
    const expected1 = "USERNAME IS NULL";
    const expected2 = "PASSWORD IS NULL";

    // ACT
    const result = await userService.validateLogin({});

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected1)).toBeTruthy();
    expect(result.errors.find((error) => error === expected2)).toBeTruthy();
  });

  // check for data type
  // what do you need it to handle and how it should handle the situation
  // having more validation and check hose function in that file
});

describe("Register Tests", () => {
  // successful register of a user
  test("Successfully register a user.", async () => {
    // Arrange
    const username = "NewUser25";
    const password = "TestPass01!";

    // ACT
    const result = await userService.validateRegistration({
      username,
      password,
    });

    // Assert
    expect(result.isValid).toBe(true);
  });

  // register fails for invalid username
  test("Failed username validation.", async () => {
    // Arrange
    const username = "testregistration";
    const password = "TestPass1";
    const expected = "USER EXISTS";

    // ACT
    const result = await userService.validateRegistration({
      username,
      password,
    });

    // Assert
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
});
