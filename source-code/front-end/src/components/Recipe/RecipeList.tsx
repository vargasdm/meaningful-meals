import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import RecipeSingle from "./RecipeSingle";
import axios from "axios";
import { Link } from "react-router-dom";
import endpoints from "../../endpoints";
import "./RecipeStyles/RecipeList.css";

const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;

function RecipeList(prop: any) {
	const [recipeList, setRecipeList] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const user = useSelector((state: any) => state.user);
	let jwt = user.jwt;
	let globalUser = user.username;

	useEffect(() => {
		fetchRecipes();
	}, []);

	async function fetchRecipes() {
		try {
			const response = await prop.getUserRecipes(globalUser);
			setRecipeList(response.data);
		} catch (err) {
			console.error(err);
			setRecipeList([]);
		}
	}

	const handleRecipeClick = (recipe: any) => {
		setSelectedRecipe(recipe);
	};

	const handleEditClick = () => {
		setIsEditing(!isEditing);
	};

	const handleBackClick = () => {
		setSelectedRecipe(null);
	};

	const handleDeleteClick = async (recipeId: any) => {
		try {
			const response = await prop.handleRemoveRecipe(recipeId);
			if (response) {
				console.log("Deleted Recipe:", recipeId);
				fetchRecipes();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddClick = async (recipeId: any) => {
		try {
			const response = await prop.handleAddToMealPlan(recipeId);
			if (response) {
				console.log("Added Recipe to Meal Plan:", recipeId);
				fetchRecipes();
			}
		} catch (error) {
			console.error(error);
		}
	};

	async function handleUpdateRecipe(editedRecipe: any) {
		try {
			const response = await axios.put(
				`${RECIPES_ENDPOINT}/update`,
				{
					id: editedRecipe.id,
					title: editedRecipe.title,
					description: editedRecipe.description,
					ingredients: editedRecipe.ingredients,
					instructions: editedRecipe.instructions,
					user: globalUser,
				},
				{
					headers: { authorization: `Bearer ${jwt}` },
				}
			);
			setSelectedRecipe(null);
			setIsEditing(false);
			fetchRecipes();
			return response;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			{selectedRecipe ? (
				// Render selected recipe component
				<RecipeSingle
					selectedRecipe={selectedRecipe}
					updateRecipe={handleUpdateRecipe}
					isEditing={isEditing}
					handleEditClick={handleEditClick}
					handleBackClick={handleBackClick}
				/>
			) : (
				<div>
					<div className="d-flex justify-content-end createButtonContainer">
						<Link to="/recipes/new-recipe">
							<Button id="createButton" variant="outline-secondary">Create a New Recipe</Button>
						</Link>
					</div>
					{recipeList && recipeList.length > 0 ? (
						recipeList.map((recipe: any) => (
							<Card key={recipe.id} className="recipeCard">
								<Card.Body>
									<Card.Title
										onClick={() => handleRecipeClick(recipe)}
										className="recipeCardTitle"
									>
										{recipe.title}
									</Card.Title>
									<Card.Text>Description: {recipe.description}</Card.Text>
									<div>
										<Button
											onClick={() => handleAddClick(recipe.id)}
											variant="info"
											style={{ marginRight: "10px" }}
										>
											Add to Meal Plan
										</Button>
										<Button onClick={() => handleDeleteClick(recipe.id)} variant="danger">
											Remove Recipe
										</Button>
									</div>
								</Card.Body>
							</Card>
						))
					) : (
						<p>No recipes have been saved for {globalUser}</p>
					)}
				</div>
			)}
		</>
	);
}

export default RecipeList;