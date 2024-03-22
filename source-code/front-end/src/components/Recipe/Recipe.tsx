import axios from "axios";
// import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./RecipeStyles/Recipe.css";
import endpoints from "../../endpoints";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";
import { v4 } from 'uuid';

const BACKEND_PORT = process.env.REACT_APP_PORT;
const RECIPES_ENDPOINT =
	endpoints.RECIPES_ENDPOINT || `http://localhost:${BACKEND_PORT}/recipes`;
const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

// console.log(MEALS_ENDPOINT);

export async function loader({ params }: any) {
	try {
		const recipeData = await axios.get(`${RECIPES_ENDPOINT}?id=${params.id}`);
		return recipeData.data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export default function Recipe() {
	const id = useParams().id;
	const recipe: any = useLoaderData();
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;
	// console.log(recipe);

	async function handleAddToMealPlan() {
		try {
			await axios.post(
				MEALS_ENDPOINT,
				{
					recipeID: id,
					timestamp: Date.now(),
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
		} catch (err) {
			console.error(err);
		}
	}

	// console.log(recipe);
	const instructions: any = recipe.instructions.map(
		(instruction: any) => <li key={v4()}>{instruction.body}</li>
	);
	const ingredients: any = recipe.ingredients.map(
		(ingredient: any) => <li key={ingredient.id}>
			{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}
		</li>
	);

	return (
		<div className="recipe-div">
			<div className="recipe-main-header">
				<h1>{recipe.title}</h1>
				<div id="social-buttons">
					{/* <FavoriteContainer contentId={recipe.id} /> */}
					<CommentButton contentId={recipe.id} />
				</div>
				<input
					type="button"
					value="Add to Meal Plan"
					onClick={handleAddToMealPlan}
				/>
			</div>
			{recipe.image && <img src={recipe.image} alt={recipe.title} />}
			<h2>Ingredients</h2>
			<ul>{ingredients}</ul>
			<h2>Instructions</h2>
			<ol>{instructions}</ol>
		</div>
	);
}
