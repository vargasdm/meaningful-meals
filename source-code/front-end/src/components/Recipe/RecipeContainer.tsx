import React from "react";
import RecipeList from "./RecipeList";
import axios from "axios";
import { useSelector } from "react-redux";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes/user-recipes`;

function RecipeContainer() {
  const user = useSelector((state: any) => state.user);
  let jwt = user.jwt;
  // console.log(globalUserJWT);

  async function getUserRecipes(user: string) {
    try {
      let response = await axios.get(`${URL}/${user}`, {
        headers: { authorization: `Bearer ${jwt}` },
      });
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
      const response = await axios.delete(`${URL}/delete/${recipeId}`, {
        headers: { authorization: `Bearer ${jwt}` },
      });
      console.log(response);

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
    </div>
  );
}

export default RecipeContainer;
