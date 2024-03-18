import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Recipe.css';
import endpoints from '../../endpoints';

const BACKEND_PORT = process.env.REACT_APP_PORT;
const RECIPES_ENDPOINT =
	endpoints.RECIPES_ENDPOINT || `http://localhost:${BACKEND_PORT}/recipes`;
const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

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
	const [isInMealPlan, setIsInMealPlan] = useState(false);
	// const [isFavorited, setIsFavorited] = useState(false);
	const recipeData: any = useLoaderData();
	console.log(recipeData);

	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;

	async function getIsInMealPlan(): Promise<void> {
		try {
			const meal = await axios.get(
				`${MEALS_ENDPOINT}/params.id`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			setIsInMealPlan(meal ? true : false);
		} catch (err) {
			console.error(err);
			setIsInMealPlan(false);
		}
	}

	useEffect(() => {
		getIsInMealPlan();
	}, []);

	async function handleAddToMealPlan() {
		try {
			await axios.post(
				MEALS_ENDPOINT,
				{
					userID: user.user_id,
					recipeID: id,
					date: new Date().toString()
				},
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);
		} catch (err) {
			console.error(err);
		}
	}

	const instructions: any = recipeData.analyzedInstructions[0].steps.map(
		(step: any) => <li key={step.number}>{step.step}</li>
	);
	const ingredients: any = recipeData.nutrition.ingredients.map(
		(ingredient: any) => <li key={ingredient.id}>{ingredient.name}</li>
	);

	return (
		<div className='recipe-div'>
			<div className='recipe-main-header'>
				<h1>{recipeData.title}</h1>
				<input
					type='button'
					value={isInMealPlan ? 'Remove from Meal Plan' : 'Add to Meal Plan'}
					onClick={handleAddToMealPlan}
				/>
			</div>
			<img src={recipeData.image} alt={recipeData.title} />
			<h2>Ingredients</h2>
			<ul>{ingredients}</ul>
			<h2>Instructions</h2>
			<ol>{instructions}</ol>
		</div>
	);
}
