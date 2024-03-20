import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecipeSingle from "./RecipeSingle";
import axios from "axios";
import "./RecipeStyles/RecipeList.css";
import endpoints from "../../endpoints";
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;

function RecipeList(prop: any) {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector((state: any) => state.user);
  let jwt = user.jwt;
  let globalUser = user.username;

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const response = await prop.getUserRecipes(globalUser);
    setRecipeList(response.data);
  }

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const handleEditClick = () => {
    if (isEditing === true) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  const handleDeleteClick = async (recipeId: any) => {
    try {
      const response = await prop.handleRemoveRecipe(recipeId);

      if (response) {
        console.log("Deleted Recipe:", recipeId);
        fetchRecipes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = async (recipeId: any) => {
    try {
      const response = await prop.handleAddToMealPlan(recipeId);

      if (response) {
        console.log("Added Recipe to Meal Plan:", recipeId);
        fetchRecipes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleUpdateRecipe(editedRecipe: any) {
    try {
      // Make the update request and handle the response
      const response = await axios.put(
        `${RECIPES_ENDPOINT}/update`,
        {
          id: editedRecipe.id,
          title: editedRecipe.title,
          description: editedRecipe.description,
          ingredients: editedRecipe.ingredients,
          instructions: editedRecipe.instructions,
          user: globalUser,
        },
        {
          headers: { authorization: `Bearer ${jwt}` },
        }
      );
      setSelectedRecipe(null);
      setIsEditing(false);
      fetchRecipes();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        {selectedRecipe ? (
          <RecipeSingle
            selectedRecipe={selectedRecipe}
            updateRecipe={handleUpdateRecipe}
            isEditing={isEditing}
            handleEditClick={handleEditClick}
            handleBackClick={handleBackClick}
          />
        ) : (
          <div className="userRecipeListContainer">
            <div className="createButtonContainer">
              <Link to="/recipes/new-recipe">
                <button id="createButton">Create a New Recipe</button>
              </Link>
            </div>
            {recipeList && recipeList.length > 0 ? (
              recipeList.map((recipe: any) => (
                <div className="recipeCard" key={recipe.id}>
                  <h3 className="recipeCardTitle">
                    <Link
                      to={`/recipes/user-recipes/${recipe.id}`}
                      onClick={() => handleRecipeClick(recipe)}
                      className="recipeCardTitle"
                    >
                      {recipe.title}
                    </Link>
                  </h3>
                  <p className="recipeCardDescription">
                    Description: {recipe.description}
                  </p>
                  <button
                    className="recipeCardAddButton"
                    onClick={() => handleAddClick(recipe.id)}
                  >
                    Add to Meal Plan
                  </button>
                  <button
                    className="recipeCardRemoveButton"
                    onClick={() => handleDeleteClick(recipe.id)}
                  >
                    Remove Recipe
                  </button>
                </div>
              ))
            ) : (
              <>
                <p id="noRecipes">
                  No recipes have been saved for {globalUser}
                </p>
              </>
            )}
          </div>
        )}
      </div>
      <div></div>
    </>
  );
}

export default RecipeList;
