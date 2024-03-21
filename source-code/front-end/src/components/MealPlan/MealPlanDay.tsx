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
	key: string
}



export default function MealPlanDay(props: MealPlanDayProps) {
	const [meals, setMeals] = useState([]);
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;

	async function getMeals() {
		const firstTimestampOfDay = props.date.getTime();
		const lastTimestampOfDay = firstTimestampOfDay + 1000 * 60 * 60 * 24;

		try {
			let mealsData: any = await axios.get(
				`${MEALS_ENDPOINT}?minTimestamp=${firstTimestampOfDay}`
				+ `&maxTimestamp=${lastTimestampOfDay}`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			mealsData = await Promise.all(
				mealsData.data.map(async (meal: any) => {
<<<<<<< HEAD
					console.log(meal);
=======
					// console.log(meal);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
					const recipeData = await axios.get(
						`${RECIPES_ENDPOINT}?id=${meal.recipe_id}`
					);

					const recipe: any = recipeData.data;

					return {
						id: meal.meal_id,
						name: recipe.title,
						imageSource: recipe.image,
<<<<<<< HEAD
						numCalories: util.getNumCalories(recipe),
=======
						numCalories: util.getNumCalories(recipe)
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
					}
				})
			);

			setMeals(mealsData);
		} catch (err) {
			setMeals([]);
			console.error(err);
		}
	}

	useEffect(() => {
		getMeals();
	}, [])

	const renderMeals = meals.map((meal: any) =>
		<MealCard
			id={meal.id}
			name={meal.name}
			imageSource={meal.imageSource}
			numCalories={meal.numCalories}
			key={meal.id}
<<<<<<< HEAD
			getMeals={getMeals}
		/>
	);

=======
		/>
	);

	// console.log(meals);
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
	const totalNumCalories = meals.reduce(
		(accumulator: number, currentValue: any) =>
			accumulator + currentValue.numCalories,
		0
	);

	return (
		<div className='meal-plan-day'>
			<h1>{DAY_NAMES[props.date.getDay()]} {props.date.getDate()}</h1 >
<<<<<<< HEAD
			<h2>{Math.trunc(totalNumCalories)} kcal</h2>
			<div className='meal-cards-div'>
				{renderMeals}
			</div>
=======
			<h2>{totalNumCalories} kcal</h2>
			{renderMeals}
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
		</div>
	);
}