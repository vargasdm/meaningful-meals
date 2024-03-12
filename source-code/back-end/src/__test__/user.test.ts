//import { describe, expect, test } from "@jest/globals";
import UserService from "../service/userService";
import { v4 as uuid } from "uuid";

const userTable = [
  { user_id: "1", username: "testregistration", password: "TestPass1" },
  { user_id: "2", username: "TestUser2", password: "TestPass1" },
  { user_id: "3", username: "TestUser3", password: "TestPass1" },
];

const mockGetUserByUsername = jest.fn((username) => {
  try {
    const data = userTable.forEach((user) => {
      if (user.username == username) {
        return user;
      }
    });
  } catch (err) {
    throw new Error(`Unable to get item. Error: ${err}`);
  }

  return null;
});

const mockPostUser = jest.fn((item) => {
  try {
    /*let isValid = true;
    userTable.forEach((user) => {
      if (user.username === item.username) {
        isValid = false;
      }
    });
    if (isValid) {*/
    userTable.push(item);
    return item;
    //}
  } catch (err) {
    throw new Error(`Unable to read item. Error: ${err}`);
  }

  return null;
});

const userService = UserService({
  getUserByUsername: mockGetUserByUsername,
  postUser: mockPostUser,
});

describe("Login Tests", () => {
  // successful login of a user
  test("Successfully login a user.", async () => {
    // Arrange
    const username = "testregistration";
    const password = "TestPass1";
    const expected = username;

    // ACT
    const result = await userService.login({
      username,
      password,
    });

    // Assert
    expect(result).toBe(expected);
  });

  // login fails for invalid credentials
  test("Fail with invalid credentials.", async () => {
    // Arrange
    const username = "unknownUser";
    const password = "TestPass1";
    const expected = null;

    // ACT
    const result = await userService.login({
      username,
      password,
    });

    // Assert
    expect(result).toBe(expected);
  });

  // login fails for empty data
  test("Fail with empty data.", async () => {
    // Arrange
    const expected = null;

    // ACT
    const result = await userService.login({});

    // Assert
    expect(result).toBe(expected);
  });

  // check for data type
  // what do you need it to handle and how it should handle the situation
  // having more validation and check hose function in that file
});

describe("Register Tests", () => {
  // successful register of a user
  test("Successfully register a user.", async () => {
    // Arrange
    const username = uuid().slice(0, 8);
    const password = "TestPass1";
    const expected = username;

    // ACT
    const result = await userService.postUser({
      username,
      password,
    });

    // Assert
    expect(result.username).toBe(expected);
  });

  // register fails for invalid username
  test("Failed username validation.", async () => {
    // Arrange
    const username = "testregistration";
    const password = "TestPass1";
    const expected = null;

    // ACT
    const result = await userService.postUser({
      username,
      password,
    });

    // Assert
    expect(result).toBe(expected);
  });
});
