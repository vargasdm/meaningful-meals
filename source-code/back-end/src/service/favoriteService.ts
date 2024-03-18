import { UserDoesNotExistError } from "../util/errors";
import type { Validation } from "../util/validation.type";
import { v4 as uuid } from "uuid";

type favoriteInput = {
  user_id: string;
  content_id: string;
};

type favorite = {
  favorite_id: string;
  user_id: string;
  content_id: string;
};

export default function (favoriteDb: any) {
  async function validateInputFavorite(
    input: favoriteInput
  ): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input || !input.content_id || !input.user_id) {
      errors.push("INPUTS ARE NULL");
      return { isValid: false, errors };
    }
    // check if favorite exists
    const favorite = await favoriteDb.getFavoriteByUserAndContent(input);
    if (favorite) {
      errors.push("FAVORITE ALREADY EXISTS");
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function validateUpdateFavorite(
    input: favoriteInput
  ): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input || !input.content_id || !input.user_id) {
      errors.push("INPUTS ARE NULL");
      return { isValid: false, errors };
    }
    // check if content is real
    const favorite: favorite[] = await favoriteDb.getFavoritesByUserId(
      input.user_id
    );

    if (!favorite.length) {
      errors.push("FAVORITE DOES NOT EXISTS");
    }

    let isUsers = true;
    favorite.forEach((item) => {
      // check if user owns the favorite
      if (item.content_id == input.content_id) {
        isUsers = false;
      }
    });
    if (isUsers) {
      errors.push("FAVORITE DOES NOT EXISTS");
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function validateId(input: string): Promise<Validation> {
    const errors: string[] = [];
    // validate input
    if (!input) {
      errors.push("INPUT IS NULL");
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return { isValid: true, errors };
  }

  async function createFavorite(input: favoriteInput) {
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

  async function deleteFavorite(input: favoriteInput) {
    try {
      const data: favorite[] = await favoriteDb.getFavoritesByUserId(
        input.user_id
      );

      let favoriteId;

      data.forEach((item) => {
        if (item.content_id === input.content_id) {
          favoriteId = item.favorite_id;
        }
      });

      await favoriteDb.deleteFavorite(favoriteId);
    } catch (err) {
      throw err;
    }
  }

  async function getUserFavorites(input: string): Promise<favorite[]> {
    try {
      const result = await favoriteDb.getFavoritesByUserId(input);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async function getContentFavorites(input: string): Promise<favorite[]> {
    try {
      const result = await favoriteDb.getFavorites();

      let data: favorite[] = [];

      result.forEach((item: favorite) => {
        if (item.content_id === input) {
          data.push(item);
        }
      });

      return data;
    } catch (err) {
      throw err;
    }
  }
  async function getUserContentFavorite(
    input: favoriteInput
  ): Promise<favorite> {
    try {
      const result = await favoriteDb.getFavoriteByUserAndContent(input);
      return result;
    } catch (err) {
      throw err;
    }
  }

  return {
    validateInputFavorite,
    validateUpdateFavorite,
    validateId,
    createFavorite,
    deleteFavorite,
    getUserFavorites,
    getContentFavorites,
    getUserContentFavorite,
  };
}
