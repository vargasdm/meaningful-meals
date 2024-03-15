import FavoriteService from "../service/favoriteService";

let favoritesContentTable = [
  {
    content_id: "content_id_1",
    content: "Random Content 1",
  },
  {
    content_id: "content_id_2",
    content: "Random Content 2",
  },
  {
    content_id: "content_id_3",
    content: "Random Content 3",
  },
];

let favoriteTable = [
  { favorite_id: "1", content_id: "content_id_1", user_id: "test_user_id_1" },
  { favorite_id: "2", content_id: "content_id_2", user_id: "test_user_id_2" },
  { favorite_id: "3", content_id: "content_id_3", user_id: "test_user_id_3" },
];

const mockCreateFavorite = jest.fn(async (input) => {
  try {
    console.log(input);
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
    let data: any;
    favoriteTable.forEach((item) => {
      if (
        item.user_id === input.user_id &&
        item.content_id === input.content_id
      ) {
        data = item;
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
    let data: any;
    console.log(favoriteTable);
    favoriteTable.forEach((item) => {
      if (item.user_id === input.user_id) {
        console.log(item);
        data = item;
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
    let data: any;
    console.log(favoriteTable);
    favoriteTable.forEach((item) => {
      if (item.content_id === input.content_id) {
        data = item;
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

const mockGetUserById = jest.fn(async (id) => {
  try {
    let data;
    userTable.forEach((user) => {
      if (user.user_id === id) {
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

const userDao = {
  getUserByUsername: mockGetUserByUsername,
  createUser: mockCreateUser,
  getUserById: mockGetUserById,
};

const favoriteService = FavoriteService(favoriteDAO, userDao);

describe("Favorite Test", () => {
  test("User can favorite content", async () => {
    // Arrange
    const input = { user_id: "test_user_id_4", content_id: "content_id_1" };
    const expected = "User liked content";
    // Act
    const valid = await favoriteService.validateInputFavorite(input);
    console.log(favoriteTable);
    if(!valid.isValid) {
      return
    }
    const result = await favoriteService.getUserFavorites(input.user_id);

    let userId: string = "";
    let contentId: string = "";

    console.log(favoriteTable)
    console.log(result);

    result.forEach((favorite) => {
      if (!favorite) {
        return;
      }
      if (
        favorite.user_id === input.user_id &&
        favorite.content_id === input.content_id
      ) {
        userId = favorite.user_id;
        contentId = favorite.content_id;
      }
    });

    // Assert
    expect(userId).toBe(input.user_id);
    expect(contentId).toBe(input.content_id);
  });
  test("User can only favorite valid content id's", async () => {
    // Arrange
    const input = { user_id: "test_user_id_1", content_id: "Not Valid" };
    // Act
    //const result = socialMediaService.postLike(input);
    // Assert
    //expect(result).toBeNull();
  });
  test("User can delete their favorite", async () => {
    // Arrange
    const input = { user_id: "test_user_id_3", like_id: 3 };
    const expected = "User liked content";
    // Act
    ///const result = socialMediaService.deleteLike(input);
    // Assert
    //expect(result).toBe(expected);
  });
  test("User cannot delete other user's likes", async () => {
    // Arrange
    const input = { user_id: "test_user_id_1", like_id: 2 };
    // Act
    //const result = socialMediaService.deleteLike(input);
    // Assert
    //expect(result).toBeNull();
  });
});
