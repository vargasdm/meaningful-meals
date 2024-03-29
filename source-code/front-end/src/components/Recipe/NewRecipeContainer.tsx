import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import NewRecipe from "./NewRecipe";
import { useNavigate } from "react-router-dom";

import endpoints from "../../endpoints";
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;

function NewRecipeContainer() {
	const userState = useSelector((state: any) => state.user);

	let user = userState.username;
	let jwt = userState.jwt;

	const navigate = useNavigate();
	async function handleCreateRecipe(newRecipe: any) {
		try {
			const response = await axios.post(
				`${RECIPES_ENDPOINT}/create`,
				{
					title: newRecipe.title,
					description: newRecipe.description,
					ingredients: newRecipe.ingredients,
					instructions: newRecipe.instructions,
					user: user,
				},
				{
					headers: {
						authorization: `Bearer ${jwt}`,
					},
				}
			);
			if (response.request.status === 201) {
				navigate(`/recipes/user-recipes/${user}`);
			}
			return response;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<Container>
			<Row>
				<Col>
					<h1 id="newRecipeContainerTitle" className="float-start">
						Create New Recipe
					</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<NewRecipe handleCreateRecipe={handleCreateRecipe} />
				</Col>
			</Row>
		</Container>
	);
}

export default NewRecipeContainer;