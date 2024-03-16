import FavoriteService from "../service/favoriteService";

let favoritesContentTable = [
  {
    content_id: "1",
    content: "Random Content 1",
  },
  {
    content_id: "2",
    content: "Random Content 2",
  },
  {
    content_id: "3",
    content: "Random Content 3",
  },
];

let favoriteTable = [
  { favorite_id: "1", content_id: "1", user_id: "1" },
  { favorite_id: "2", content_id: "2", user_id: "2" },
  { favorite_id: "3", content_id: "3", user_id: "3" },
];

const mockCreateFavorite = jest.fn(async (input) => {
  try {
    favoriteTable.push(input);
    return input;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const mockDeleteFavorite = jest.fn(async (input) => {
  try {
    for (let i = 0; i < favoriteTable.length; i++) {
      if (input === favoriteTable[i].favorite_id) {
        favoriteTable.splice(i, 1);
        return;
      }
    }
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const mockGetFavoriteByUserAndContent = jest.fn(async (input) => {
  try {
    let data: any[] = [];
    favoriteTable.forEach((item) => {
      if (
        item.user_id === input.user_id &&
        item.content_id === input.content_id
      ) {
        data.push(item);
      }
    });
    return data;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const mockGetFavoritesByUserId = jest.fn(async (input) => {
  try {
    let data: any[] = [];
    favoriteTable.forEach((item) => {
      if (item.user_id === input) {
        data.push(item);
      }
    });

    return data;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const mockGetFavoritesByContentId = jest.fn(async (input) => {
  try {
    let data: any[] = [];
    favoriteTable.forEach((item) => {
      if (item.content_id === input) {
        data.push(item);
      }
    });

    return data;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const favoriteDAO = {
  createFavorite: mockCreateFavorite,
  deleteFavorite: mockDeleteFavorite,
  getFavoriteByUserAndContent: mockGetFavoriteByUserAndContent,
  getFavoritesByUserId: mockGetFavoritesByUserId,
  getFavoritesByContentId: mockGetFavoritesByContentId,
};

const userTable = [
  { user_id: "1", username: "testregistration", password: "TestPass1" },
  { user_id: "2", username: "TestUser2", password: "TestPass1" },
  { user_id: "3", username: "TestUser3", password: "TestPass1" },
];

const mockGetUserByUsername = jest.fn(async (username) => {
  let data;
  userTable.forEach((user) => {
    if (user.username === username) {
      data = user;
    }
  });

  return data;
});

const mockGetUserById = jest.fn(async (id) => {
  let data;
  userTable.forEach((user) => {
    if (user.user_id === id) {
      data = user;
    }
  });

  return data;
});

const mockCreateUser = jest.fn(async (item) => {
  userTable.push(item);
  return item;
});

const userDao = {
  getUserByUsername: mockGetUserByUsername,
  createUser: mockCreateUser,
  getUserById: mockGetUserById,
};

const favoriteService = FavoriteService(favoriteDAO, userDao);

describe("Favorite Test", () => {
  test("User can favorite content.", async () => {
    // Arrange
    const input = { user_id: "3", content_id: "1" };
    // Act
    const valid = await favoriteService.validateInputFavorite(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const process = await favoriteService.createFavorite(input);

    const result = await favoriteService.getUserFavorites(input.user_id);

    let userId: string = "";
    let contentId: string = "";

    if (result) {
      result.forEach((favorite) => {
        if (
          favorite.user_id === input.user_id &&
          favorite.content_id === input.content_id
        ) {
          userId = favorite.user_id;
          contentId = favorite.content_id;
        }
      });
    }

    // Assert
    expect(userId).toBe(input.user_id);
    expect(contentId).toBe(input.content_id);
  });
  test("User can only favorite content once.", async () => {
    // Arrange
    const input = { user_id: "3", content_id: "3" };
    const expected = "FAVORITE ALREADY EXISTS";
    // Act
    const result = await favoriteService.validateInputFavorite(input);

    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("User can delete their favorite.", async () => {
    // Arrange
    const input = { user_id: "3", content_id: "3" };
    // Act
    const valid = await favoriteService.validateUpdateFavorite(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }
    const process = await favoriteService.deleteFavorite(input);

    const result = await favoriteService.getUserFavorites(input.user_id);

    let userId: any = undefined;
    let contentId: any = undefined;

    if (result) {
      result.forEach((favorite) => {
        if (
          favorite.user_id === input.user_id &&
          favorite.content_id === input.content_id
        ) {
          userId = favorite.user_id;
          contentId = favorite.content_id;
        }
      });
    }

    // Assert
    expect(userId).toBe(undefined);
    expect(contentId).toBe(undefined);
  });
  test("User cannot delete other user's likes.", async () => {
    // Arrange
    const input = { user_id: "3", content_id: "2" };
    const expected = "FAVORITE DOES NOT EXISTS";

    // Act
    const result = await favoriteService.validateUpdateFavorite(input);

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("User can get all of their favorites.", async () => {
    // Arrange
    const input = {user_id: "3"};
    let index: number = 0;
    favoriteTable.forEach((item) => {
      if(item.user_id===input.user_id) {
        ++index;
      }
    });
    const expected = index;

    // Act
    const result = await favoriteService.getUserFavorites(input.user_id)

    // Assert
    expect(result.length).toBe(expected);

  });
});
