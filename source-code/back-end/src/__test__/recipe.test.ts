import recipeService from "../service/recipeService"; // import the function to be tested
import recipeDAO from "../repository/recipeDAO"; // import the data access object

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
const mockGetUserRecipes = jest.fn((user: string) => {
  try {
    return Promise.resolve(recipeTable.find((recipe) => recipe.user === user));
  } catch (err) {
    throw new Error(`Unable to get recipes. Error: ${err}`);
  }
}) as jest.Mock<Promise<any>, [string]>;

// mock update recipe
const mockPutRecipe = jest.fn((recipe: any) => {
  try {
    const index = recipeTable.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      // update the recipe with the new values
      Object.assign(recipeTable[index], recipe);
      return Promise.resolve(recipeTable[index]);
    }
    return Promise.resolve(null); // Return null as a Promise
  } catch (err) {
    throw new Error(`Unable to find recipe with target id. Error: ${err}`);
  }
}) as jest.Mock<Promise<any>, [any]>;

// mock create recipe
const mockCreateRecipe = jest.fn((recipe: any): Promise<any> => {
  try {
    recipeTable.push(recipe);
    return Promise.resolve(recipe);
  } catch (err) {
    throw new Error(`Unable to post recipe. Error: ${err}`);
  }
}) as jest.Mock<Promise<any>, [any]>;

// mock delete recipe
const mockDeleteRecipe = jest.fn((recipe) => {
  try {
    const index = recipeTable.findIndex((r) => r.id === recipe.id);
    if (index !== -1) {
      recipeTable.splice(index, 1);
      return Promise.resolve(recipeTable); // Return the modified recipeTable as a Promise
    }
    return Promise.resolve(null); // Return null as a Promise if recipe is not found
  } catch (err) {
    throw new Error(`Unable to find recipe with target id. Error: ${err}`);
  }
}) as jest.Mock<Promise<any>, [any]>;

// replace the original functions with the mock functions
recipeService.getUserRecipes = mockGetUserRecipes;
recipeService.putRecipe = mockPutRecipe;
recipeService.createRecipe = mockCreateRecipe;
recipeService.deleteRecipe = mockDeleteRecipe;

describe("Recipe Tests", () => {
  // successful get of recipes
  test("Successfully get recipes.", async () => {
    const username = "testuser";

    jest
      .spyOn(recipeDAO, "getRecipesByUsername")
      .mockImplementation(mockGetUserRecipes);

    const expected = recipeTable.find((recipe) => recipe.user === username);
    const result = await recipeService.getUserRecipes(username);

    expect(result).toEqual(expected);
  });
});

// test if a recipe can be updated
test("Successfully update a recipe.", async () => {
  const recipeToUpdate = {
    id: "2",
    user: "testuser",
    title: "testrecipe2-updated",
    instructions: ["testinstructions2-updated"],
    ingredients: ["testingredients2-updated"],
  };

  jest.spyOn(recipeDAO, "updateRecipe").mockImplementation(mockPutRecipe);

  const result = await recipeService.putRecipe(recipeToUpdate);

  expect(result).toEqual(recipeToUpdate);
});

// test if a recipe can be created
test("Successfully create a recipe.", async () => {
  const recipeToCreate = {
    id: "4",
    user: "testuser",
    title: "testrecipe4",
    instructions: ["testinstructions4"],
    ingredients: ["testingredients4"],
  };

  jest.spyOn(recipeDAO, "postRecipe").mockImplementation(mockCreateRecipe);

  const result = await recipeService.createRecipe(recipeToCreate);

  expect(result).toEqual(recipeToCreate);
  expect(recipeTable).toContainEqual(recipeToCreate);
});

// test if a recipe can be deleted
test("Successfully delete a recipe.", async () => {
  const recipeToDelete = {
    id: "2",
    user: "testuser",
    title: "testrecipe2-deleted",
    instructions: ["testinstructions2-deleted"],
    ingredients: ["testingredients2-deleted"],
  };

  // add the recipe to delete
  recipeTable.push(recipeToDelete);

  jest.spyOn(recipeDAO, "deleteRecipe").mockImplementation(mockDeleteRecipe);

  const result = await recipeService.deleteRecipe(recipeToDelete);

  expect(result).toEqual(recipeTable);
});
