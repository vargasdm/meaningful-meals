import { UserDoesNotExistError } from "../util/errors";
import type { Validation } from "../util/response";
import { v4 as uuid } from "uuid";

type addFavoriteInput = {
  user_id: string;
  content_id: string;
};
type deleteFavoriteInput = {
  favorite_id: string;
  user_id: string;
};

export default function (favoriteDb: any, recipeDb: any, userDb: any) {
  async function validateAddFavorite(
    input: addFavoriteInput
  ): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input || !input.content_id || !input.user_id) {
      errors.push("INPUTS ARE NULL");
      return { isValid: false, errors };
    }
    // check if user is real
    if (!(await userDb.getUserById(input.user_id))) {
      errors.push("USER DOES NOT EXISTS");
    }
    // check if content is real
    if (!(await recipeDb.getContentById(input.content_id))) {
      errors.push("CONTENT DOES NOT EXISTS");
    }
    // add new favorite to db
    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  }

  async function validateDeleteFavorite(
    input: deleteFavoriteInput
  ): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input || !input.favorite_id || !input.user_id) {
      errors.push("INPUTS ARE NULL");
      return { isValid: false, errors };
    }
    // check if user is real
    if (!(await userDb.getUserById(input.user_id))) {
      errors.push("USER DOES NOT EXISTS");
    }
    // check if favorite is real
    const favorite = await recipeDb.getFavoriteById(input.favorite_id);
    if (!favorite) {
      errors.push("FAVORITE DOES NOT EXISTS");
    }
    // check if user owns the favorite
    if (input.user_id != favorite.user_id) {
      errors.push("USER DOES NOT OWN FAVORITE");
    }
    // add new favorite to db
    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function validateContentId(input: string): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input) {
      errors.push("INPUT IS NULL");
      return { isValid: false, errors };
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function validateUserId(input: string): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input) {
      errors.push("INPUT IS NULL");
      return { isValid: false, errors };
    }

    if (errors.length > 0) {
        return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function createFavorite(input: addFavoriteInput) {
    try {
      await favoriteDb.createFavorite({
        favorite_id: uuid(),
        user_id: input.user_id,
        content_id: input.content_id,
      });
    } catch (err) {
      throw err;
    }
  }

  async function deleteFavorite(input: deleteFavoriteInput) {
    try {
      await favoriteDb.deleteFavorite(input);
    } catch (err) {
      throw err;
    }
  }

  async function getUserFavorites(input: string): Promise<any> {
    try {
      return await favoriteDb.getFavoritesByUserId(input);
    } catch (err) {
      throw err;
    }
  }

  async function getContentFavorites(input: string): Promise<any> {
    try {
      return await favoriteDb.getFavoritesByContentId(input);
    } catch (err) {
      throw err;
    }
  }

  return {
    validateAddFavorite,
    validateDeleteFavorite,
    validateContentId,
    validateUserId,
    createFavorite,
    deleteFavorite,
    getUserFavorites,
    getContentFavorites
  };
}
