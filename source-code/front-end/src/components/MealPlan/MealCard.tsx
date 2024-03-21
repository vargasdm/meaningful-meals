import axios from "axios";
import endpoints from "../../endpoints";
import { useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

type MealCardProps = {
	id: string
	name: string,
	imageSource: string,
	numCalories: number,
	key: string,
	getMeals: Function,
	date: Date
}

export default function MealCard(props: MealCardProps) {
	const [isEditingDate, setIsEditingDate] = useState(false);
	const [date, setDate] = useState(props.date);
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;

	async function handleDateChange(newDate: Date) {
		try {
			await axios.post(
				`${MEALS_ENDPOINT}/${props.id}`,
				{
					mealID: props.id,
					timestamp: newDate.getTime()
				},
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			props.getMeals();
		} catch (err) {
			console.error(err);
		}
	}

	async function handleDeleteMealCard() {
		try {
			await axios.delete(
				`${MEALS_ENDPOINT}/${props.id}`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				}
			);

			props.getMeals();
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<div className='meal-card-div'>
			<div className='meal-card-header-div'>
				<h1>{props.name}</h1>
				<i className='bi bi-trash' onClick={handleDeleteMealCard} />
			</div>
			<img src={props.imageSource} />
			{props.numCalories > 0 && <h2>{Math.trunc(props.numCalories)} kcal</h2>}
			<DatePicker
				selected={date}
				onChange={handleDateChange} />
		</div>
	);
}