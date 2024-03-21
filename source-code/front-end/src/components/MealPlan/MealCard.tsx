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

type DateFieldType = null | number;

export default function MealCard(props: MealCardProps) {
	const [isEditingDate, setIsEditingDate] = useState(false);
	const [month, setMonth] = useState<DateFieldType>(null);
	const [day, setDay] = useState<DateFieldType>(null);
	const [year, setYear] = useState<DateFieldType>(null);
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;

	function handleDateSelect() { }
	function handleDateChange() { }

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
			<h2>{Math.trunc(props.numCalories)} kcal</h2>
			{/* <input
				type='text'
				name='month'
				placeholder='MM'
			/>
			<input
				type='text'
				name='day'
				placeholder='DD'
			/>
			<input
				type='text'
				name='year'
				placeholder='YYYY'
			/> */}
			<DatePicker
				selected={props.date}
				onSelect={handleDateSelect}
				onChange={handleDateChange} />
		</div>
	);
}