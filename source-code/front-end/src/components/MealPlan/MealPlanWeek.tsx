import MealPlanDay from "./MealPlanDay";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";

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

	async function getMealsOfWeek() {
		const firstTimestampOfWeek = props.firstDateOfWeek.getTime();
		const lastTimestampOfWeek = firstTimestampOfWeek
			+ 1000 * 60 * 60 * 24 * 7;

		try {
			let mealsData: any = await axios.get(
				`${MEALS_ENDPOINT}?minTimestamp=${firstTimestampOfWeek}`
				+ `&maxTimestamp=${lastTimestampOfWeek}`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			setMeals(mealsData.data);
		} catch (err) {
			console.error(err);
			setMeals([]);
		}
	}

	useEffect(() => {
		getMealsOfWeek();
	}, [props.firstDateOfWeek]);

	const renderDays = [];

	for (let i = 0; i < NUM_DAYS_PER_WEEK; i++) {
		const date = new Date(
			props.firstDateOfWeek.getFullYear(),
			props.firstDateOfWeek.getMonth(),
			props.firstDateOfWeek.getDate() + i
		);

		const firstTimestampOfDay = date.getTime();
		const lastTimestampOfDay = firstTimestampOfDay + 1000 * 60 * 60 * 24;

		const mealsOfTheDay = meals.filter((meal: any) =>
			meal.timestamp >= firstTimestampOfDay
			&& meal.timestamp < lastTimestampOfDay);

		renderDays.push(
			<MealPlanDay
				date={date}
				meals={mealsOfTheDay}
				getMeals={getMealsOfWeek}
				key={date.toString()}
			/>
		);
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

	return (
		<div className='weekly-calendar'>
			<i
				className='bi bi-arrow-left'
				onClick={changeFirstDateOfWeek(-NUM_DAYS_PER_WEEK)}
			/>
			{renderDays}
			<i
				className='bi bi-arrow-right'
				onClick={changeFirstDateOfWeek(NUM_DAYS_PER_WEEK)}
			/>
		</div>
	);
}