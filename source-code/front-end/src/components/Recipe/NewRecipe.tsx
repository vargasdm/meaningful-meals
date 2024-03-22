import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import "./RecipeStyles/NewRecipe.css";
import { v4 } from 'uuid';
import InstructionForm from "./InstructionForm";
import { Form, Button } from "react-bootstrap";
// import "./RecipeStyles/NewRecipe.css";
import "./RecipeStyles/NewRecipe.css";

interface NewRecipeProps {
	handleCreateRecipe: (newRecipe: any) => Promise<any>;
}

const NewRecipe: React.FC<NewRecipeProps> = ({ handleCreateRecipe }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState<any>([]);
	const [instructions, setInstructions] = useState<any>([]);

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

	function handleAddInstruction() {
		const newInstruction: any = {
			body: 0,
			id: v4()
		}

		setInstructions([...instructions, newInstruction])
	}

	const renderIngredients = [];

	function getAmountSetter(index: number) {
		return (event: any) => {
			ingredients[index].amount = event.target.value;
			setIngredients(ingredients);
		}
	}

	function getUnitSetter(index: number) {
		return (event: any) => {
			ingredients[index].unit = event.target.value;
			setIngredients(ingredients);
		}
	}

	function getNameSetter(index: number) {
		return (event: any) => {
			ingredients[index].name = event.target.value;
			setIngredients(ingredients);
		}
	}

	for (let i = 0; i < ingredients.length; i++) {
		renderIngredients.push(
			<li key={ingredients[i].id}>
				<IngredientForm
					index={i}
					setIngredients={setIngredients}
					setAmount={getAmountSetter(i)}
					setUnit={getUnitSetter(i)}
					setName={getNameSetter(i)}
					ingredients={ingredients}
					amount={ingredients[i].amount}
					unit={ingredients[i].unit}
					name={ingredients[i].name}
					id={ingredients[i].id}
				/>
			</li>
		)
	}

	const renderInstructions = [];

	function getBodySetter(index: number) {
		return (event: any) => {
			instructions[index].body = event.target.value;
			setInstructions(instructions);
		}
	}

	for (let i = 0; i < instructions.length; i++) {
		renderInstructions.push(
			<li className='instruction-form-li' key={instructions[i].id}>
				<InstructionForm
					index={i}
					setInstructions={setInstructions}
					setBody={getBodySetter(i)}
					instructions={instructions}
					body={instructions[i].body}
					id={instructions[i].id}
				/>
			</li>
		)
	}

	function handleTitleChange(event: any) {
		setTitle(event.target.value);
	}

	function handleDescriptionChange(event: any) {
		setDescription(event.target.value);
	}

	return (
		<div id="newRecipeContainer">
			<p id="instructionsTitle">Instructions:</p>
			<p id="instructions">Fill out the form below to create a recipe.</p>

			<input
				type="text"
				name="title"
				placeholder="Recipe Title"
				onChange={handleTitleChange}
			/>
			<input
				type="text"
				name="description"
				placeholder="Recipe Description"
				onChange={handleDescriptionChange}
			/>
			{renderIngredients}
			<button id='add-ingredient-button' onClick={handleAddIngredient}>
				Add Ingredient
			</button>
			{renderInstructions}
			<button id='add-instruction-button' onClick={handleAddInstruction}>
				Add Instruction
			</button>
			<button id="createRecipeButton" onClick={handleSubmit}>
				Create Recipe
			</button>
		</div>
	);
};

export default NewRecipe;