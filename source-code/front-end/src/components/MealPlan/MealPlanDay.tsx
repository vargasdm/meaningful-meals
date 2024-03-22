import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";
import MealCard from "./MealCard";

const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;

const DAY_NAMES: string[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

type MealPlanDayProps = {
	date: Date,
	meals: any[],
	getMeals: Function
	key: string
}

// function getNumCalories(recipe: any) {
// 	const calories = recipe.nutrition.nutrients.find(
// 		(nutrient: any) => nutrient.name === 'Calories'
// 	);

// 	return calories.amount;
// }


export default function MealPlanDay(props: MealPlanDayProps) {
	const [meals, setMeals] = useState([]);

	async function populateCards() {
		const populatedMeals: any = await Promise.all(
			props.meals.map(async (meal: any) => {
				const recipeData = await axios.get(
					`${RECIPES_ENDPOINT}?id=${meal.recipe_id}`
				);

				// console.log(`recipe_id: ${meal.recipe_id}`);
				// console.log(recipeData);

				const recipe: any = recipeData.data;

				return {
					id: meal.meal_id,
					name: recipe.title,
					imageSource: recipe.image,
					numCalories: recipe.numCalories ? recipe.numCalories : 0,
				}
			})
		);

		setMeals(populatedMeals);
	}

	useEffect(() => {
		populateCards();
	}, [props.meals])

	const renderMeals = meals.map((meal: any) =>
		<MealCard
			id={meal.id}
			name={meal.name}
			imageSource={meal.imageSource}
			numCalories={meal.numCalories}
			key={meal.id}
			getMeals={props.getMeals}
			date={props.date}
		/>
	);

	const totalNumCalories = meals.reduce(
		(accumulator: number, currentValue: any) =>
			accumulator + currentValue.numCalories,
		0
	);

	return (
		<div className='meal-plan-day'>
			<h1>{DAY_NAMES[props.date.getDay()]} {props.date.getDate()}</h1 >
			<h2>{Math.trunc(totalNumCalories)} kcal</h2>
			<div className='meal-cards-div'>
				{renderMeals}
			</div>
		</div>
	);
}