import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";

const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;

type CleanedRootState = Omit<RootState, "_persist">;

interface RecipeSingleProps {
  recipe: any;
}
interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  // Add other properties as needed
}

const RecipeSingle: React.FC<RecipeSingleProps> = (props) => {
  const userState = useSelector((state: CleanedRootState) => state.user);

  let globalUser = userState.username;

  const { recipe } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleEditClick = () => {
    setIsEditing(true);
  };

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

  async function updateRecipe(editedRecipe: any) {
    try {
      console.log({
        id: editedRecipe.id,
        title: editedRecipe.title,
        ingredients: editedRecipe.ingredients,
        instructions: editedRecipe.instructions,
        user: globalUser,
      });
  
      let response = await axios.put(`${URL}/update`, {
        id: editedRecipe.id,
        title: editedRecipe.title,
        ingredients: editedRecipe.ingredients,
        instructions: editedRecipe.instructions,
        user: globalUser,
      });
  
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await updateRecipe(editedRecipe);
      if (response) {
        console.log("Updated Recipe:", editedRecipe);
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleInputChange}
          />
          <textarea
            name="ingredients"
            value={
              Array.isArray(editedRecipe.ingredients)
                ? editedRecipe.ingredients.join("\n")
                : editedRecipe.ingredients
            }
            onChange={handleInputChange}
          />
          <textarea
            name="instructions"
            value={
              Array.isArray(editedRecipe.instructions)
                ? editedRecipe.instructions.join("\n")
                : editedRecipe.instructions
            }
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Save Changes</button>
        </div>
      ) : (
        <div>
          <h2>{recipe.title}</h2>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <button onClick={handleEditClick}>Edit Recipe</button>
        </div>
      )}
    </div>
  );
};

export default RecipeSingle;
export type { RecipeSingleProps }; // Export the RecipeSingleProps type
