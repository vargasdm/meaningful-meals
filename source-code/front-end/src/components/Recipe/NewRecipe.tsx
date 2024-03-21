import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import "./RecipeStyles/NewRecipe.css";

interface NewRecipeProps {
	handleCreateRecipe: (newRecipe: any) => Promise<any>;
}

const NewRecipe: React.FC<NewRecipeProps> = ({ handleCreateRecipe }) => {
	// const [recipe, setRecipe] = useState({
	// 	title: "",
	// 	description: "",
	// 	ingredients: [],
	// 	instructions: [],
	// });
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState<any>([]);
	const [instructions, setInstructions] = useState([]);

	// const handleInputChange = (
	// 	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) => {
	// 	const { name, value } = event.target;
	// 	const updatedValue =
	// 		name === "ingredients" || name === "instructions"
	// 			? value.split("\n")
	// 			: value;
	// 	// setRecipe((prevRecipe) => ({
	// 		...prevRecipe,
	// 		[name]: updatedValue,
	// 	}));
	// };

	const handleSubmit = async () => {
		try {
			// await handleCreateRecipe(recipe);
		} catch (error) {
			console.error(error);
		}
	};

	function handleAddIngredient() {
		const newIngredient: any = {
			amount: 0,
			unit: '',
			name: ''
		}

		setIngredients([...ingredients, newIngredient]);
	}

	const renderIngredients = [];
	// const ingredients: any = recipe.ingredients;
	for (let i = 0; i < ingredients.length; i++) {
		renderIngredients.push(
			<IngredientForm
				amount={ingredients[i].amount}
				unit={ingredients[i].unit}
				name={ingredients[i].name}
				key={i}
			/>
		)
	}

	// const renderIngredients = recipe.ingredients.map((ingredient: any) => {
	// 	return <IngredientForm
	// 		amount={ingredient.amount}
	// 		unit={ingredient.unit}
	// 		name={ingredient.name}
	// 	/>;
	// })

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
