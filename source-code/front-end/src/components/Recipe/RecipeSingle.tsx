import React, { useState, ChangeEvent } from "react";
<<<<<<< HEAD
import { Form, Button, ListGroup } from "react-bootstrap";
import "./RecipeStyles/RecipeSingle.css";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";
=======
import "./RecipeStyles/RecipeSingle.css";
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

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
<<<<<<< HEAD
=======

>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setEditedRecipe((prevRecipe: Recipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
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
<<<<<<< HEAD
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="recipeTitle">
              <Form.Label>Recipe Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editedRecipe.title}
                placeholder="Recipe Title"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="recipeDescription">
              <Form.Label>Recipe Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedRecipe.description}
                placeholder="Recipe Description"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="recipeIngredients">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                as="textarea"
                name="ingredients"
                placeholder="Ingredients (One per line)"
                value={editedRecipe.ingredients.join("\n")}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="recipeInstructions">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                as="textarea"
                name="instructions"
                placeholder="Instructions (One per line)"
                value={editedRecipe.instructions.join("\n")}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
=======
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
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        </div>
      ) : (
        <div className="recipeContainer">
          <h2 id="recipeTitle">{recipe.title}</h2>
<<<<<<< HEAD

          <div id="social-buttons">
            <FavoriteContainer contentId={recipe.id.toString()} />
            <CommentButton contentId={recipe.id.toString()} />
          </div>
          
          <p id="recipeDescription">{recipe.description}</p>
          <h3>Ingredients</h3>
=======
          <p id="recipeDescription">{recipe.description}</p>
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
          <ul id="recipeIngredientsList">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li className="recipeIngredient" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
<<<<<<< HEAD
          <h3>Instructions</h3>
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
          <ol id="recipeInstructionsList">
            {recipe.instructions.map((instruction: string, index: number) => (
              <li className="recipeInstruction" key={index}>
                {instruction}
              </li>
            ))}
          </ol>
<<<<<<< HEAD
          <Button variant="primary" onClick={handleEditClick}>
            Edit Recipe
          </Button>
          <Button variant="secondary" onClick={handleBackClick}>
            Back to My Recipes
          </Button>
=======
          <button id="editButton" onClick={handleEditClick}>
            Edit Recipe
          </button>
          <button id="backButton" onClick={handleBackClick}>
            Back to My Recipes
          </button>
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        </div>
      )}
    </div>
  );
};

export default RecipeSingle;
export type { RecipeSingleProps };
