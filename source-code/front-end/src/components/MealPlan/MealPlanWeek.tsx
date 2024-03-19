import { useState, useEffect } from 'react';
import MealPlanDay from "./MealPlanDay";
import axios from "axios";
import endpoints from "../../endpoints";
import { useSelector } from "react-redux";

const NUM_DAYS_PER_WEEK: number = 7;
const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

type MealPlanWeekProp = {
	firstDateOfWeek: Date,
	setFirstDateOfWeek: Function
}

export default function MealPlanWeek(props: MealPlanWeekProp) {
	const [meals, setMeals] = useState([]);
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;
	const calendarDays = [];

	for (let i = 0; i < NUM_DAYS_PER_WEEK; i++) {
		const date = new Date(
			props.firstDateOfWeek.getFullYear(),
			props.firstDateOfWeek.getMonth(),
			props.firstDateOfWeek.getDate() + i
		);

		calendarDays.push(
			<MealPlanDay
				date={date}
			/>
		)
	}

	function changeFirstDateOfWeek(change: number) {
		return () => {
			let newFirstDateOfWeek: Date = new Date(props.firstDateOfWeek);

			newFirstDateOfWeek = new Date(
				newFirstDateOfWeek.setDate(props.firstDateOfWeek.getDate() + change)
			);

			props.setFirstDateOfWeek(
				newFirstDateOfWeek
			);
		}
	}

	async function getMeals() {
		const firstTimestampOfWeek = props.firstDateOfWeek.getTime();
		const lastTimestampOfWeek = firstTimestampOfWeek + 1000 * 60 * 60 * 24 * 7;

		try {
			const meals = await axios.get(
				`${MEALS_ENDPOINT}?minTimestamp=${firstTimestampOfWeek}`
				+ `&maxTimestamp=${lastTimestampOfWeek}`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			console.log(meals);
			setMeals(meals.data);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		getMeals();
	}, [])

	// getMeals();


	return (
		<div className='weekly-calendar'>
			<i
				className='bi bi-arrow-left'
				onClick={changeFirstDateOfWeek(-NUM_DAYS_PER_WEEK)}
			/>
			{calendarDays}
			<i
				className='bi bi-arrow-right'
				onClick={changeFirstDateOfWeek(NUM_DAYS_PER_WEEK)}
			/>
		</div>
	);
}