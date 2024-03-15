import React from "react";
import RecipeContainer from "./RecipeContainer";
// import { RootState } from "../../store/store";
import axios from "axios";
import { useSelector } from "react-redux";
import NewRecipe from "./NewRecipe";
import { useNavigate } from "react-router-dom";
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;

// type CleanedRootState = Omit<RootState, "_persist">;

function NewRecipeContainer() {
  const userState = useSelector((state: any) => state.user);

  let globalUser = userState.username;

  const navigate = useNavigate();
  async function handleCreateRecipe(newRecipe: any) {
    try {
      // Make the update request and handle the response
      const response = await axios.post(`${URL}/create`, {
        title: newRecipe.title,
        ingredients: newRecipe.ingredients,
        instructions: newRecipe.instructions,
        user: globalUser,
      });
      if (response.request.status === 201) {
        navigate(`/recipes/user-recipes/${globalUser}`); // Navigate to the RecipeList component
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return <NewRecipe handleCreateRecipe={handleCreateRecipe} />;
}

export default NewRecipeContainer;
