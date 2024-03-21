import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import { Card, Button } from "react-bootstrap";
import RecipeSingle from "./RecipeSingle";
import axios from "axios";
import { Link } from "react-router-dom";
import endpoints from "../../endpoints";
import "./RecipeStyles/RecipeList.css";

const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;
=======
import { Link } from "react-router-dom";
import RecipeSingle from "./RecipeSingle";
import axios from "axios";
import "./RecipeStyles/RecipeList.css";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";

const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

function RecipeList(prop: any) {
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
<<<<<<< HEAD
  const user = useSelector((state: any) => state.user);
  let jwt = user.jwt;
  let globalUser = user.username;
=======

  const userState = useSelector((state: any) => state.user);

  let globalUser = userState.username;
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

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
    setIsEditing(!isEditing);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  const handleDeleteClick = async (recipeId: any) => {
    try {
      const response = await prop.handleRemoveRecipe(recipeId);
<<<<<<< HEAD
=======

>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
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
<<<<<<< HEAD
      const response = await axios.put(
        `${RECIPES_ENDPOINT}/update`,
=======
      // Make the update request and handle the response
      const response = await axios.put(
        `${URL}/update`,
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        {
          id: editedRecipe.id,
          title: editedRecipe.title,
          description: editedRecipe.description,
          ingredients: editedRecipe.ingredients,
          instructions: editedRecipe.instructions,
          user: globalUser,
        },
        {
<<<<<<< HEAD
          headers: { authorization: `Bearer ${jwt}` },
=======
          headers: { authorization: `Bearer ${userState.jwt}` },
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
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
<<<<<<< HEAD
      {selectedRecipe ? (
        // Render selected recipe component
        <RecipeSingle
          selectedRecipe={selectedRecipe}
          updateRecipe={handleUpdateRecipe}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          handleBackClick={handleBackClick}
        />
      ) : (
        <div>
          <div className="d-flex justify-content-end createButtonContainer">
            <Link to="/recipes/new-recipe">
              <Button id="createButton" variant="outline-secondary">Create a New Recipe</Button>
            </Link>
          </div>
          {recipeList && recipeList.length > 0 ? (
            recipeList.map((recipe: any) => (
              <Card key={recipe.id} className="recipeCard">
                <Card.Body>
                  <Card.Title
                    onClick={() => handleRecipeClick(recipe)}
                    className="recipeCardTitle"
                  >
                    {recipe.title}
                  </Card.Title>
                  <Card.Text>Description: {recipe.description}</Card.Text>
                  <div>
                    <Button
                      onClick={() => handleAddClick(recipe.id)}
                      variant="info"
                      style={{ marginRight: "10px" }}
                    >
                      Add to Meal Plan
                    </Button>
                    <Button onClick={() => handleDeleteClick(recipe.id)} variant="danger">
                      Remove Recipe
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No recipes have been saved for {globalUser}</p>
          )}
        </div>
      )}
=======
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

      <FavoriteContainer contentId="test" />
      <CommentButton contentId="test" />
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    </>
  );
}

export default RecipeList;