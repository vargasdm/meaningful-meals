import React, { useState, ChangeEvent } from "react";
import "./RecipeStyles/RecipeSingle.css";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";

interface RecipeSingleProps {
  selectedRecipe: any;
  updateRecipe: (editedRecipe: any) => Promise<any>;
  isEditing: boolean;
  handleEditClick: () => void;
  handleBackClick: () => void;
}

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const RecipeSingle: React.FC<RecipeSingleProps> = ({
  selectedRecipe,
  updateRecipe,
  isEditing,
  handleEditClick,
  handleBackClick,
}) => {
  const recipe = selectedRecipe;

  const [editedRecipe, setEditedRecipe] = useState(recipe);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    if (name === "ingredients" || name === "instructions") {
      setEditedRecipe((prevRecipe: Recipe) => ({
        ...prevRecipe,
        [name]: value.split("\n"), // Assuming the values are separated by newlines
      }));
    } else {
      setEditedRecipe((prevRecipe: Recipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await updateRecipe(editedRecipe);
      console.log(response);

      if (response) {
        console.log("Updated Recipe:", editedRecipe);
        handleEditClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div className="editRecipeContainer">
          <h2>Edit Recipe</h2>
          <input
            id="recipeTitle"
            type="text"
            name="title"
            value={editedRecipe.title}
            placeholder="add a title"
            onChange={handleInputChange}
            data-testid="title-input"
          />
          <input
            id="recipeDescription"
            type="text"
            name="description"
            value={editedRecipe.description}
            placeholder="add a description"
            onChange={handleInputChange}
            data-testid="description-input"
          />
          <textarea
            id="recipeIngredients"
            name="ingredients"
            placeholder="add ingredients. Put each ingredient on a new line."
            value={
              Array.isArray(editedRecipe.ingredients)
                ? editedRecipe.ingredients.join("\n")
                : editedRecipe.ingredients
            }
            onChange={handleInputChange}
          />
          <textarea
            id="recipeInstructions"
            name="instructions"
            placeholder="add instructions. Put each instruction on a new line."
            value={
              Array.isArray(editedRecipe.instructions)
                ? editedRecipe.instructions.join("\n")
                : editedRecipe.instructions
            }
            onChange={handleInputChange}
          />
          <button id="saveButton" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      ) : (
        <div className="recipeContainer">
          <h2 id="recipeTitle">{recipe.title}</h2>

          <div id="social-buttons">
            <FavoriteContainer contentId={recipe.id.toString()} />
            <CommentButton contentId={recipe.id.toString()} />
          </div>
          
          <p id="recipeDescription">{recipe.description}</p>
          <ul id="recipeIngredientsList">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li className="recipeIngredient" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
          <ol id="recipeInstructionsList">
            {recipe.instructions.map((instruction: string, index: number) => (
              <li className="recipeInstruction" key={index}>
                {instruction}
              </li>
            ))}
          </ol>
          <button id="editButton" onClick={handleEditClick}>
            Edit Recipe
          </button>
          <button id="backButton" onClick={handleBackClick}>
            Back to My Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeSingle;
export type { RecipeSingleProps };
