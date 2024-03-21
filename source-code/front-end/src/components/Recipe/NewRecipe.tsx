import React, { useState } from "react";
<<<<<<< HEAD
import { Form, Button } from "react-bootstrap";
// import "./RecipeStyles/NewRecipe.css";

=======
import "./RecipeStyles/NewRecipe.css";
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
interface NewRecipeProps {
  handleCreateRecipe: (newRecipe: any) => Promise<any>;
}

const NewRecipe: React.FC<NewRecipeProps> = ({ handleCreateRecipe }) => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updatedValue =
      name === "ingredients" || name === "instructions"
        ? value.split("\n")
        : value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async () => {
    try {
      await handleCreateRecipe(recipe);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="newRecipeContainer">
      <p id="instructionsTitle">Instructions:</p>
      <p id="instructions">Fill out the form below to create a recipe.</p>

<<<<<<< HEAD
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            name="title"
            placeholder="Recipe Title"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            name="description"
            placeholder="Recipe Description"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            name="ingredients"
            placeholder="Ingredients (One per line)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            name="instructions"
            placeholder="Instructions (One per line)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button id="createRecipeButton" onClick={handleSubmit}>
          Create Recipe
        </Button>
      </Form>
=======
      <input
        type="text"
        name="title"
        placeholder="Recipe Title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Recipe Description"
        onChange={handleInputChange}
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients (One per line)"
        onChange={handleInputChange}
      />
      <textarea
        name="instructions"
        placeholder="Instructions (One per line)"
        onChange={handleInputChange}
      />
      <button id="createRecipeButton" onClick={handleSubmit}>Create Recipe</button>
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
    </div>
  );
};

export default NewRecipe;