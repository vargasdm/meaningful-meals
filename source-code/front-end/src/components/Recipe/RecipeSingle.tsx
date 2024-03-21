import React, { useState, ChangeEvent } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import "./RecipeStyles/RecipeSingle.css";

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
        </div>
      ) : (
        <div className="recipeContainer">
          <h2 id="recipeTitle">{recipe.title}</h2>
          <p id="recipeDescription">{recipe.description}</p>
          <h3>Ingredients</h3>
          <ul id="recipeIngredientsList">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <ol id="recipeInstructionsList">
            {recipe.instructions.map((instruction: string, index: number) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <Button variant="primary" onClick={handleEditClick}>
            Edit Recipe
          </Button>
          <Button variant="secondary" onClick={handleBackClick}>
            Back to My Recipes
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecipeSingle;
export type { RecipeSingleProps };
