import React, { useState } from "react";

interface NewRecipeProps {
  handleCreateRecipe: (newRecipe: any) => Promise<any>;
}

const NewRecipe: React.FC<NewRecipeProps> = ({ handleCreateRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const newValue =
      name === "ingredients" || name === "instructions"
        ? value.split("\n")
        : value;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await handleCreateRecipe(newRecipe);
      console.log(response);

      if (response) {
        console.log("New Recipe:", newRecipe);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>New Recipe</h2>
      <p>Instructions:</p>
      <p>Fill out the form below to create a new recipe.</p>
      <form>
        <input
          type="text"
          name="title"
          placeholder="add a title"
          onChange={handleInputChange}
        />
        <textarea
          name="ingredients"
          placeholder="add ingredients. Put each ingredient on a new line."
          onChange={handleInputChange}
        />
        <textarea
          name="instructions"
          placeholder="add instructions. Put each instruction on a new line."
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Create Recipe</button>
      </form>
    </div>
  );
};

export default NewRecipe;
