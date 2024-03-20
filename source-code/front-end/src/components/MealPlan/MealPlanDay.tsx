import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";
import MealCard from "./MealCard";

const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;
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
			const meals = await axios.get(
				`${MEALS_ENDPOINT}?minTimestamp=${firstTimestampOfDay}`
				+ `&maxTimestamp=${lastTimestampOfDay}`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			// console.log(meals);
			setMeals(meals.data);
		} catch (err) {
			setMeals([]);
			console.error(err);
		}
	}

	useEffect(() => {
		getMeals();
	}, [])

	// const renderMeals = meals.map((meal: any) => <div>
	// 	{meal.meal_id}
	// </div>)
	const renderMeals = meals.map((meal: any) =>
		<MealCard
			mealID={meal.meal_id}
			key={meal.meal_id}
		/>
	);

	return (
		<div className='meal-plan-day'>
			<h1>{DAY_NAMES[props.date.getDay()]} {props.date.getDate()}</h1 >
			{renderMeals}
		</div>
	);
}