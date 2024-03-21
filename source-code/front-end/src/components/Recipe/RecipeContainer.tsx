import React from "react";
<<<<<<< HEAD
import { Container, Row, Col } from "react-bootstrap";
=======
import "./RecipeStyles/RecipeContainer.css";
import { Container, Row, Col } from "react-bootstrap"; // Import the React Bootstrap components you need

>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
import RecipeList from "./RecipeList";
import axios from "axios";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";
<<<<<<< HEAD
import FavoriteContainer from "../Favorite/FavoriteContainer";
import CommentButton from "../Comment/CommentButton";

const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;
const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

function RecipeContainer() {
  const user = useSelector((state: any) => state.user);
  let userId = user.userID;
=======
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes/user-recipes`;

function RecipeContainer() {
  const user = useSelector((state: any) => state.user);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
  let jwt = user.jwt;

  async function getUserRecipes(user: string) {
    try {
<<<<<<< HEAD
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

=======
      let response = await axios.get(`${URL}/${user}`, {
        headers: { authorization: `Bearer ${jwt}` },
      });
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
      return response;
    } catch (error) {
      console.error(error);
    }
  }

<<<<<<< HEAD
=======
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

>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
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
<<<<<<< HEAD
            handleAddToMealPlan={handleAddToMealPlan}
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeContainer;
