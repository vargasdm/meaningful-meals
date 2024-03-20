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
const favoriteService_1 = __importDefault(require("../service/favoriteService"));
let favoriteTable = [
    { favorite_id: "1", content_id: "1", user_id: "1" },
    { favorite_id: "2", content_id: "2", user_id: "2" },
    { favorite_id: "3", content_id: "3", user_id: "3" },
];
const mockCreateFavorite = jest.fn((input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        favoriteTable.push(input);
        return input;
    }
    catch (err) {
        throw new Error();
    }
}));
const mockDeleteFavorite = jest.fn((input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (let i = 0; i < favoriteTable.length; i++) {
            if (input === favoriteTable[i].favorite_id) {
                favoriteTable.splice(i, 1);
                return;
            }
        }
    }
    catch (err) {
        throw new Error();
    }
}));
const mockGetFavoriteByUserAndContent = jest.fn((input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data;
        favoriteTable.forEach((item) => {
            if (item.user_id === input.user_id &&
                item.content_id === input.content_id) {
                data = item;
            }
        });
        return data;
    }
    catch (err) {
        throw new Error();
    }
}));
const mockGetFavoritesByUserId = jest.fn((input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        favoriteTable.forEach((item) => {
            if (item.user_id === input) {
                data.push(item);
            }
        });
        return data;
    }
    catch (err) {
        throw new Error();
    }
}));
const mockGetFavoritesByContentId = jest.fn((input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = [];
        favoriteTable.forEach((item) => {
            if (item.content_id === input) {
                data.push(item);
            }
        });
        return data;
    }
    catch (err) {
        throw new Error();
    }
}));
const mockGetFavorites = jest.fn(() => __awaiter(void 0, void 0, void 0, function* () {
    return favoriteTable;
}));
const favoriteDAO = {
    createFavorite: mockCreateFavorite,
    deleteFavorite: mockDeleteFavorite,
    getFavoriteByUserAndContent: mockGetFavoriteByUserAndContent,
    getFavoritesByUserId: mockGetFavoritesByUserId,
    getFavoritesByContentId: mockGetFavoritesByContentId,
    getFavorites: mockGetFavorites
};
const favoriteService = (0, favoriteService_1.default)(favoriteDAO);
describe("Favorite Test", () => {
    test("User can favorite content.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "3", content_id: "1" };
        // Act
        const valid = yield favoriteService.validateInputFavorite(input);
        if (!valid.isValid) {
            expect(true).toBe(false);
            return;
        }
        const process = yield favoriteService.createFavorite(input);
        const result = yield favoriteService.getUserFavorites(input.user_id);
        let userId = "";
        let contentId = "";
        if (result) {
            result.forEach((favorite) => {
                if (favorite.user_id === input.user_id &&
                    favorite.content_id === input.content_id) {
                    userId = favorite.user_id;
                    contentId = favorite.content_id;
                }
            });
        }
        // Assert
        expect(userId).toBe(input.user_id);
        expect(contentId).toBe(input.content_id);
    }));
    test("User can only favorite content once.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "3", content_id: "3" };
        const expected = "FAVORITE ALREADY EXISTS";
        // Act
        const result = yield favoriteService.validateInputFavorite(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
    }));
    test("Empty input", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = {};
        const expected = "INPUTS ARE NULL";
        // Act
        const result = yield favoriteService.validateInputFavorite(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
        ;
    }));
    test("User can delete their favorite.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "3", content_id: "3" };
        // Act
        const valid = yield favoriteService.validateUpdateFavorite(input);
        if (!valid.isValid) {
            expect(true).toBe(false);
            return;
        }
        const process = yield favoriteService.deleteFavorite(input);
        const result = yield favoriteService.getUserFavorites(input.user_id);
        let userId = undefined;
        let contentId = undefined;
        if (result) {
            result.forEach((favorite) => {
                if (favorite.user_id === input.user_id &&
                    favorite.content_id === input.content_id) {
                    userId = favorite.user_id;
                    contentId = favorite.content_id;
                }
            });
        }
        // Assert
        expect(userId).toBe(undefined);
        expect(contentId).toBe(undefined);
    }));
    test("User cannot delete other user's favorites.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "3", content_id: "2" };
        const expected = "FAVORITE DOES NOT EXISTS";
        // Act
        const result = yield favoriteService.validateUpdateFavorite(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
    }));
    test("User can get all of their favorites.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "3" };
        let index = 0;
        favoriteTable.forEach((item) => {
            if (item.user_id === input.user_id) {
                ++index;
            }
        });
        const expected = index;
        // Act
        const valid = yield favoriteService.validateId(input.user_id);
        if (!valid.isValid) {
            expect(true).toBe(false);
            return;
        }
        const result = yield favoriteService.getUserFavorites(input.user_id);
        // Assert
        expect(result.length).toBe(expected);
    }));
    test("Favorites can get all of their users.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { content_id: "3" };
        let index = 0;
        favoriteTable.forEach((item) => {
            if (item.content_id === input.content_id) {
                ++index;
            }
        });
        const expected = index;
        // Act
        const valid = yield favoriteService.validateId(input.content_id);
        if (!valid.isValid) {
            expect(true).toBe(false);
            return;
        }
        const result = yield favoriteService.getContentFavorites(input.content_id);
        // Assert
        expect(result.length).toBe(expected);
    }));
    test("User can get a specific favorite.", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "2", content_id: "2" };
        let index = 0;
        favoriteTable.forEach((item) => {
            if (item.user_id === input.user_id) {
                ++index;
            }
        });
        const expected = index;
        // Act
        const result = yield favoriteService.getUserContentFavorite(input);
        // Assert
        expect(result.user_id).toBe(input.user_id);
        expect(result.content_id).toBe(input.content_id);
    }));
    test("Empty input", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = {};
        const expected = "INPUTS ARE NULL";
        // Act
        const result = yield favoriteService.validateUpdateFavorite(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
    }));
    test("Empty id input", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = "";
        const expected = "INPUT IS NULL";
        // Act
        const result = yield favoriteService.validateId(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
        ;
    }));
    test("Favorite does not exist to update", () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const input = { user_id: "NOT VALID", content_id: "NOT VALID" };
        const expected = "FAVORITE DOES NOT EXISTS";
        // Act
        const result = yield favoriteService.validateUpdateFavorite(input);
        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errors.find((error) => error === expected)).toBe(expected);
        ;
    }));
});
