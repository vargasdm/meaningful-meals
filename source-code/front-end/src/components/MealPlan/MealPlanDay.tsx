import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";

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
type MealPlanDayProp = {
	date: Date
}

export default function MealPlanDay(props: MealPlanDayProp) {
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

			console.log(meals);
			setMeals(meals.data);
		} catch (err) {
			setMeals([]);
			console.error(err);
		}
	}

	return (
		<div className='meal-plan-day'>
			<h1>{DAY_NAMES[props.date.getDay()]} {props.date.getDate()}</h1 >
		</div>
	);
}