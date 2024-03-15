import React from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
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

  async function handleRemoveRecipe(recipeId: any) {
    try {
      // Make the update request and handle the response
      const response = await axios.put(`${URL}/delete/:${recipeId}`, {
        id: recipeId,
      });

      // setSelectedRecipe(null);
      // setIsEditing(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <RecipeList getUserRecipes={getUserRecipes} handleRemoveRecipe={handleRemoveRecipe} />
    </div>
  );
}

export default RecipeContainer;
