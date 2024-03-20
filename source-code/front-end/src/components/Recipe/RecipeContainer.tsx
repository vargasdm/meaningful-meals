import React from "react";
import "./RecipeStyles/RecipeContainer.css";
import { Container, Row, Col } from "react-bootstrap"; // Import the React Bootstrap components you need

import RecipeList from "./RecipeList";
import axios from "axios";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes/user-recipes`;

function RecipeContainer() {
  const user = useSelector((state: any) => state.user);
  let jwt = user.jwt;

  async function getUserRecipes(user: string) {
    try {
      let response = await axios.get(`${URL}/${user}`, {
        headers: { authorization: `Bearer ${jwt}` },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRecipe(recipeId: string) {
    try {
      const response = await axios.delete(`${URL}/delete/${recipeId}`, {
        headers: { authorization: `Bearer ${jwt}` },
      });

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
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeContainer;
