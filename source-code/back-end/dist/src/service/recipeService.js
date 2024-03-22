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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uuid_1 = require("uuid");
// const recipeDAO = require("../repository/recipeDAO.ts");
const recipeDAO_1 = __importDefault(require("../repository/recipeDAO"));
const axios_1 = __importDefault(require("axios"));
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
// TODO: collate API search results with those from our own database
// TODO: use Levenshtein distance for a simple search?
function searchRecipes(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield axios_1.default.get(`https://api.spoonacular.com/recipes/` +
            `complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}` +
            `&instructionsRequired=true`);
        // console.log(result);
<<<<<<< HEAD
        if (!result.data.results) {
            return false;
        }
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        return result.data;
    });
}
// TODO: union Spoonacular and local search spaces
// i.e., if we don't find the ID with Spoonacular, then search local
function getRecipe(id) {
    return __awaiter(this, void 0, void 0, function* () {
<<<<<<< HEAD
        console.log(id);
        const result = yield axios_1.default.get(`https://api.spoonacular.com/recipes/` +
            `${id}/information?apiKey=${SPOONACULAR_API_KEY}` +
            `&includeNutrition=true`);
        if (!result.data.id) {
            return false;
        }
        console.log(result);
        return result.data;
    });
}
function getRecipeById(recipeId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(recipeId);
        const data = yield recipeDAO_1.default.getRecipeById(recipeId);
        console.log(data);
        return data ? data : null;
    });
}
function searchedRecipeExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(`recipeService.searchedRecipeExists(${id})...`);
        if (!id) {
            console.log("recipe doesnt exist");
            return false;
        }
        //   console.log(id);
        const recipe = yield getRecipe(id);
        console.log(`recipeService.searchedRecipeExists(${id})...`);
        return recipe;
    });
}
function userRecipeExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(`recipeService.userRecipeExists(${id})...`);
        if (!id) {
            console.log("recipe doesnt exist");
            return false;
        }
        // console.log(id);
        const recipe = yield getRecipeById(id);
        console.log(`recipeService.userRecipeExists(${id})...`);
=======
        const result = yield axios_1.default.get(`https://api.spoonacular.com/recipes/` +
            `${id}/information?apiKey=${SPOONACULAR_API_KEY}` +
            `&includeNutrition=true`);
        return result.data;
    });
}
function recipeExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`recipeService.recipeExists(${id})...`);
        if (!id) {
            return false;
        }
        const recipe = yield getRecipe(id);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        return recipe;
    });
}
function getUserRecipes(username) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(username);
        const data = yield recipeDAO_1.default.getRecipesByUsername(username);
        console.log(data);
        return data ? data : null;
    });
}
function putRecipe(receivedData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`recipeService.postRecipe(${JSON.stringify(receivedData)})...`);
        let data = yield recipeDAO_1.default.updateRecipe({
            id: receivedData.id,
            title: receivedData.title,
            description: receivedData.description,
            ingredients: receivedData.ingredients,
            instructions: receivedData.instructions,
            user: receivedData.user,
        });
        console.log(data);
        return data ? data : null;
    });
}
function createRecipe(receivedData) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield recipeDAO_1.default.postRecipe({
            id: (0, uuid_1.v4)(),
            title: receivedData.title,
            description: receivedData.description,
            ingredients: receivedData.ingredients,
            instructions: receivedData.instructions,
            user: receivedData.user,
        });
        console.log(data);
        return data ? data : null;
    });
}
function deleteRecipe(receivedData) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(receivedData);
        let data = yield recipeDAO_1.default.deleteRecipe(receivedData);
        console.log(data);
        return data ? data : null;
    });
}
exports.default = {
    searchRecipes,
    getRecipe,
    getUserRecipes,
    putRecipe,
    createRecipe,
    deleteRecipe,
<<<<<<< HEAD
    searchedRecipeExists,
    getRecipeById,
    userRecipeExists,
=======
    recipeExists
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
};
