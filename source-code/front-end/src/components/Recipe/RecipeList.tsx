import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import RecipeSingle from "./RecipeSingle";

// type CleanedRootState = Omit<RootState, "_persist">;

function RecipeList(prop: any) {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const userState = useSelector((state: any) => state.user);

  let userPathParam = userState.username;

  useEffect(() => {
    async function fetchRecipes() {
      const response = await prop.getUserRecipes(userPathParam);
      setRecipeList(response.data);
    }
    fetchRecipes();
  }, [prop.getUserRecipes, userPathParam]);

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="userRecipeList">
      {selectedRecipe ? (
        <RecipeSingle recipe={selectedRecipe} />
      ) : (
        <div>
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
                </h1>
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map((ingredient: any) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
                <h3>Instructions</h3>
                <ol>
                  {recipe.instructions.map((instruction: any) => (
                    <li key={instruction}>{instruction}</li>
                  ))}
                </ol>
              </div>
            ))
          ) : (
            <p>No recipes have been saved for {userPathParam}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeList;
