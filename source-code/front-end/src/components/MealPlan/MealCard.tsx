import axios from "axios";
import endpoints from "../../endpoints";
import { useSelector } from "react-redux";
import { useState } from "react";

const MEALS_ENDPOINT = endpoints.MEALS_ENDPOINT;

type MealCardProps = {
	id: string
	name: string,
	imageSource: string,
	numCalories: number,
	key: string,
	getMeals: Function,
	// date: Date
}

export default function MealCard(props: MealCardProps) {
	const [isEditingDate, setIsEditingDate] = useState(false);
	// const [month, setMonth] = useState(props.date.getMonth());
	// const [day, setDay] = useState(props.date.getDate());
	// const [year, setYear] = useState(props.date.getFullYear());
	const user = useSelector((state: any) => state.user);
	const jwt = user.jwt;

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

	function handleMonthChange() {

	}

	return (
		<div className='meal-card-div'>
			<div className='meal-card-header-div'>
				<h1>{props.name}</h1>
				<i className='bi bi-trash' onClick={handleDeleteMealCard} />
			</div>
			<img src={props.imageSource} />
			<h2>{Math.trunc(props.numCalories)} kcal</h2>
			<input
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
			/>
		</div>
	);
}