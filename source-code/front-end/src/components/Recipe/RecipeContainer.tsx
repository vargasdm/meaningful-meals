import React from "react";
import "./RecipeStyles/RecipeContainer.css";
import { Container, Row, Col } from "react-bootstrap"; // Import the React Bootstrap components you need

import RecipeList from "./RecipeList";
import axios from "axios";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";

const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;
const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

function RecipeContainer() {
	const user = useSelector((state: any) => state.user);
	let userId = user.userID;
	let jwt = user.jwt;

	async function getUserRecipes(user: string) {
		try {
			let response = await axios.get(
				`${RECIPES_ENDPOINT}/user-recipes/${user}`,
				{
					headers: { authorization: `Bearer ${jwt}` },
				}
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	}

	async function handleRemoveRecipe(recipeId: string) {
		try {
			console.log(`${RECIPES_ENDPOINT}/user-recipes/delete/${recipeId}`);

			const response = await axios.delete(
				`${RECIPES_ENDPOINT}/user-recipes/delete/${recipeId}`,
				{
					headers: { authorization: `Bearer ${jwt}` },
				}
			);

			return response;
		} catch (error) {
			console.error(error);
		}
	}

	async function handleAddToMealPlan(recipeId: string) {
		try {
			console.log(recipeId, userId, Date.now());
			console.log(jwt);

			const response = await axios.post(
				MEALS_ENDPOINT,
				{
					recipeID: recipeId,
					timestamp: Date.now(),
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			console.log(response);

			return response;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Container>
			<Row>
				<Col>
					<h1 id="recipeContainerTitle" className="float-start">
						My Recipes
					</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<RecipeList
						getUserRecipes={getUserRecipes}
						handleRemoveRecipe={handleRemoveRecipe}
						handleAddToMealPlan={handleAddToMealPlan}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default RecipeContainer;
