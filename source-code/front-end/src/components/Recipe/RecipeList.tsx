import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import RecipeSingle from "./RecipeSingle";
import axios from "axios";

const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;

// type CleanedRootState = Omit<RootState, "_persist">;

// interface RecipeListProps {
//   getUserRecipes: (user: string) => Promise<any>;
// }

function RecipeList(prop: any) {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  // console.log(selectedRecipe);

  const userState = useSelector((state: any) => state.user);

  let globalUser = userState.username;

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const response = await prop.getUserRecipes(globalUser);
    setRecipeList(response.data);
  }

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    // console.log(selectedRecipe);
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
    console.log(recipeId);

    try {
      const response = await prop.handleRemoveRecipe(recipeId);
      console.log(response);

      if (response) {
        console.log("Deleted Recipe:", recipeId);
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
        `${URL}/update`,
        {
          id: editedRecipe.id,
          title: editedRecipe.title,
          ingredients: editedRecipe.ingredients,
          instructions: editedRecipe.instructions,
          user: globalUser,
        },
        {
          headers: { authorization: `Bearer ${userState.jwt}` },
        }
      );
      console.log(response);

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
      <div className="userRecipeList">
        {selectedRecipe ? (
          <RecipeSingle
            selectedRecipe={selectedRecipe}
            updateRecipe={handleUpdateRecipe}
            isEditing={isEditing}
            handleEditClick={handleEditClick}
            handleBackClick={handleBackClick}
          />
        ) : (
          <div>
            <Link to="/recipes/new-recipe">
              <button>Create a New Recipe</button>
            </Link>
            {recipeList && recipeList.length > 0 ? (
              recipeList.map((recipe: any) => (
                <div key={recipe.id}>
                  <h1>
                    <Link
                      to={`/recipes/user-recipes/${recipe.id}`}
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      {recipe.title}
                    </Link>
                    <button onClick={() => handleDeleteClick(recipe.id)}>
                      Remove Recipe
                    </button>
                  </h1>
                </div>
              ))
            ) : (
              <>
                <p>No recipes have been saved for {globalUser}</p>
                <Link to="/recipes/new-recipe">
                  <button>Create a New Recipe</button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default RecipeList;
