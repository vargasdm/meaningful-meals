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
const recipeService_1 = __importDefault(require("../service/recipeService")); // import the function to be tested
const recipeDAO_1 = __importDefault(require("../repository/recipeDAO")); // import the data access object
let recipeTable = [
    {
        id: "1",
        user: "testuser",
        title: "testrecipe1",
        instructions: ["testinstructions1"],
        ingredients: ["testingredients1"],
    },
    {
        id: "2",
        user: "testuser",
        title: "testrecipe2",
        instructions: ["testinstructions2"],
        ingredients: ["testingredients2"],
    },
    {
        id: "3",
        user: "testuser",
        title: "testrecipe3",
        instructions: ["testinstructions3"],
        ingredients: ["testingredients3"],
    },
];
// mock get user recipes
const mockGetUserRecipes = jest.fn((user) => {
    try {
        return Promise.resolve(recipeTable.find((recipe) => recipe.user === user));
    }
    catch (err) {
        throw new Error(`Unable to get recipes. Error: ${err}`);
    }
});
// mock update recipe
const mockPutRecipe = jest.fn((recipe) => {
    try {
        const index = recipeTable.findIndex((r) => r.id === recipe.id);
        if (index !== -1) {
            // update the recipe with the new values
            Object.assign(recipeTable[index], recipe);
            return Promise.resolve(recipeTable[index]);
        }
        return Promise.resolve(null); // Return null as a Promise
    }
    catch (err) {
        throw new Error(`Unable to find recipe with target id. Error: ${err}`);
    }
});
// mock create recipe
const mockCreateRecipe = jest.fn((recipe) => {
    try {
        recipeTable.push(recipe);
        return Promise.resolve(recipe);
    }
    catch (err) {
        throw new Error(`Unable to post recipe. Error: ${err}`);
    }
});
// mock delete recipe
const mockDeleteRecipe = jest.fn((recipe) => {
    try {
        const index = recipeTable.findIndex((r) => r.id === recipe.id);
        if (index !== -1) {
            recipeTable.splice(index, 1);
            return Promise.resolve(recipeTable); // Return the modified recipeTable as a Promise
        }
        return Promise.resolve(null); // Return null as a Promise if recipe is not found
    }
    catch (err) {
        throw new Error(`Unable to find recipe with target id. Error: ${err}`);
    }
});
// replace the original functions with the mock functions
recipeService_1.default.getUserRecipes = mockGetUserRecipes;
recipeService_1.default.putRecipe = mockPutRecipe;
recipeService_1.default.createRecipe = mockCreateRecipe;
recipeService_1.default.deleteRecipe = mockDeleteRecipe;
describe("Recipe Tests", () => {
    // successful get of recipes
    test("Successfully get recipes.", () => __awaiter(void 0, void 0, void 0, function* () {
        const username = "testuser";
        jest
            .spyOn(recipeDAO_1.default, "getRecipesByUsername")
            .mockImplementation(mockGetUserRecipes);
        const expected = recipeTable.find((recipe) => recipe.user === username);
        const result = yield recipeService_1.default.getUserRecipes(username);
        expect(result).toEqual(expected);
    }));
});
// test if a recipe can be updated
test("Successfully update a recipe.", () => __awaiter(void 0, void 0, void 0, function* () {
    const recipeToUpdate = {
        id: "2",
        user: "testuser",
        title: "testrecipe2-updated",
        instructions: ["testinstructions2-updated"],
        ingredients: ["testingredients2-updated"],
    };
    jest.spyOn(recipeDAO_1.default, "updateRecipe").mockImplementation(mockPutRecipe);
    const result = yield recipeService_1.default.putRecipe(recipeToUpdate);
    expect(result).toEqual(recipeToUpdate);
}));
// test if a recipe can be created
test("Successfully create a recipe.", () => __awaiter(void 0, void 0, void 0, function* () {
    const recipeToCreate = {
        id: "4",
        user: "testuser",
        title: "testrecipe4",
        instructions: ["testinstructions4"],
        ingredients: ["testingredients4"],
    };
    jest.spyOn(recipeDAO_1.default, "postRecipe").mockImplementation(mockCreateRecipe);
    const result = yield recipeService_1.default.createRecipe(recipeToCreate);
    expect(result).toEqual(recipeToCreate);
    expect(recipeTable).toContainEqual(recipeToCreate);
}));
// test if a recipe can be deleted
test("Successfully delete a recipe.", () => __awaiter(void 0, void 0, void 0, function* () {
    const recipeToDelete = {
        id: "2",
        user: "testuser",
        title: "testrecipe2-deleted",
        instructions: ["testinstructions2-deleted"],
        ingredients: ["testingredients2-deleted"],
    };
    // add the recipe to delete
    recipeTable.push(recipeToDelete);
    jest.spyOn(recipeDAO_1.default, "deleteRecipe").mockImplementation(mockDeleteRecipe);
    const result = yield recipeService_1.default.deleteRecipe(recipeToDelete);
    expect(result).toEqual(recipeTable);
}));
