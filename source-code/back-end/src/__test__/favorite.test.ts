import FavoriteService from "../service/favoriteService";

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
    throw new Error();
  }
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
    throw new Error();
  }
});

const mockGetFavoriteByUserAndContent = jest.fn(async (input) => {
  try {
    let data:any;
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
    throw new Error();
  }
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
    throw new Error();
  }
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
    throw new Error();
  }
});

const mockGetFavorites = jest.fn(async () => {
  return favoriteTable;
})

const favoriteDAO = {
  createFavorite: mockCreateFavorite,
  deleteFavorite: mockDeleteFavorite,
  getFavoriteByUserAndContent: mockGetFavoriteByUserAndContent,
  getFavoritesByUserId: mockGetFavoritesByUserId,
  getFavoritesByContentId: mockGetFavoritesByContentId,
  getFavorites: mockGetFavorites
};

const favoriteService = FavoriteService(favoriteDAO);

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
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("Empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";
    // Act
    const result = await favoriteService.validateInputFavorite(input as any);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);;
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
  test("User cannot delete other user's favorites.", async () => {
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
    const input = { user_id: "3" };
    let index: number = 0;
    favoriteTable.forEach((item) => {
      if (item.user_id === input.user_id) {
        ++index;
      }
    });
    const expected = index;

    // Act
    const valid = await favoriteService.validateId(input.user_id);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const result = await favoriteService.getUserFavorites(input.user_id);

    // Assert
    expect(result.length).toBe(expected);
  });
  test("Favorites can get all of their users.", async () => {
    // Arrange
    const input = { content_id: "3" };
    let index: number = 0;
    favoriteTable.forEach((item) => {
      if (item.content_id === input.content_id) {
        ++index;
      }
    });
    const expected = index;

    // Act
    const valid = await favoriteService.validateId(input.content_id);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }
    
    const result = await favoriteService.getContentFavorites(input.content_id);

    // Assert
    expect(result.length).toBe(expected);
  });
  test("User can get a specific favorite.", async () => {
    // Arrange
    const input = { user_id: "2", content_id: "2" };
    let index: number = 0;
    favoriteTable.forEach((item) => {
      if (item.user_id === input.user_id) {
        ++index;
      }
    });
    const expected = index;

    // Act
    const result = await favoriteService.getUserContentFavorite(input);

    // Assert
    expect(result.user_id).toBe(input.user_id);
    expect(result.content_id).toBe(input.content_id);
  });
  test("Empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";
    // Act
    const result = await favoriteService.validateUpdateFavorite(input as any);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("Empty id input", async () => {
    // Arrange
    const input = "";
    const expected = "INPUT IS NULL";
    // Act
    const result = await favoriteService.validateId(input);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);;
  });
  test("Favorite does not exist to update", async () => {
    // Arrange
    const input = {user_id: "NOT VALID", content_id: "NOT VALID"};
    const expected = "FAVORITE DOES NOT EXISTS";
    // Act
    const result = await favoriteService.validateUpdateFavorite(input);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);;
  });
});
