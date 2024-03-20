import React from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes/user-recipes`;

function RecipeContainer() {
  async function getUserRecipes(user: string) {
    try {
      let response = await axios.get(`${URL}/${user}`);
      console.log(response);

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRecipe(recipeId: string) {
    console.log(recipeId);

    try {
      // Make the delete request with the correct URL format
      const response = await axios.delete(`${URL}/delete/${recipeId}`);

      // Handle the response as needed
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <RecipeList
        getUserRecipes={getUserRecipes}
        handleRemoveRecipe={handleRemoveRecipe}
      />
      <FavoriteContainer contentId="test"/>
      <CommentButton contentId="test"/>
    </div>
  );
}

export default RecipeContainer;
