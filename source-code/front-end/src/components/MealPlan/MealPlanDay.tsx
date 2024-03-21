import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";
import MealCard from "./MealCard";
import util from "../../util";

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

export default function MealPlanDay(props: MealPlanDayProps) {
	const [meals, setMeals] = useState([]);
	console.log(props.date + ' ' + JSON.stringify(props.meals));

	async function populateCard() {
		const populatedMeals: any = await Promise.all(
			props.meals.map(async (meal: any) => {
				console.log(meal);
				const recipeData = await axios.get(
					`${RECIPES_ENDPOINT}?id=${meal.recipe_id}`
				);

				const recipe: any = recipeData.data;

				return {
					id: meal.meal_id,
					name: recipe.title,
					imageSource: recipe.image,
					numCalories: util.getNumCalories(recipe),
				}
			})
		);

		setMeals(populatedMeals);
	}

	useEffect(() => {
		populateCard();
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