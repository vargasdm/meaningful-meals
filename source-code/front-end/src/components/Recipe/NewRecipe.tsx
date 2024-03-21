import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import "./RecipeStyles/NewRecipe.css";
import { v4 } from 'uuid';

interface NewRecipeProps {
	handleCreateRecipe: (newRecipe: any) => Promise<any>;
}

const NewRecipe: React.FC<NewRecipeProps> = ({ handleCreateRecipe }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState<any>([]);
	const [instructions, setInstructions] = useState([]);

	const handleSubmit = async () => {
		try {
			await handleCreateRecipe({
				title: title,
				description: description,
				ingredients: ingredients,
				instructions: instructions
			});
		} catch (error) {
			console.error(error);
		}
	};

	function handleAddIngredient() {
		const newIngredient: any = {
			amount: 0,
			unit: '',
			name: '',
			id: v4()
		}

		setIngredients([...ingredients, newIngredient]);
	}

	const renderIngredients = [];

	for (let i = 0; i < ingredients.length; i++) {
		renderIngredients.push(
			<li key={ingredients[i].id}>
				<IngredientForm
					index={i}
					setIngredients={setIngredients}
					ingredients={ingredients}
					amount={ingredients[i].amount}
					unit={ingredients[i].unit}
					name={ingredients[i].name}
					id={ingredients[i].id}
				/>
			</li>
		)
	}

	return (
		<div id="newRecipeContainer">
			<p id="instructionsTitle">Instructions:</p>
			<p id="instructions">Fill out the form below to create a recipe.</p>

			<input
				type="text"
				name="title"
				placeholder="Recipe Title"
			// onChange={handleInputChange}
			/>
			<input
				type="text"
				name="description"
				placeholder="Recipe Description"
			// onChange={handleInputChange}
			/>
			{/* <textarea
				name="ingredients"
				placeholder="Ingredients (One per line)"
				onChange={handleInputChange}
			/> */}
			{renderIngredients}
			<button id='add-ingredient-button' onClick={handleAddIngredient}>
				Add Ingredient
			</button>
			<textarea
				name="instructions"
				placeholder="Instructions (One per line)"
			// onChange={handleInputChange}
			/>
			<button id="createRecipeButton" onClick={handleSubmit}>
				Create Recipe
			</button>
		</div>
	);
};

export default NewRecipe;
