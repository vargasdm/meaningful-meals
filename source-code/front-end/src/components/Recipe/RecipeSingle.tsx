import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { RootState } from "../../store/store";

// type CleanedRootState = Omit<RootState, "_persist">;

interface RecipeSingleProps {
  selectedRecipe: any;
  updateRecipe: (editedRecipe: any) => Promise<any>;
  isEditing: boolean;
  handleEditClick: () => void; // Add handleEditClick to the interface
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
  console.log(selectedRecipe);

  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const userState = useSelector((state: any) => state.user);

  let globalUser = userState.username;

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
          <ul>
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <ol>
            {recipe.instructions.map((instruction: string, index: number) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button onClick={handleEditClick}>Edit Recipe</button>
          <button onClick={handleBackClick}>Back to My Recipes</button>
        </div>
      )}
    </div>
  );
};

export default RecipeSingle;
export type { RecipeSingleProps }; // Export the RecipeSingleProps type
