import { useState } from "react";
import MealPlanWeek from "./MealPlanWeek";
import './MealPlan.css';

const MONTH_NAMES: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export default function MealPlanContainer() {
	const now: Date = new Date();

	const [firstDateOfWeek, setFirstDateOfWeek] = useState(
		new Date(
			new Date().setDate(now.getDate() - now.getDay())
		)
	);

	function handleGoToToday() {
		setFirstDateOfWeek(new Date(
			new Date().setDate(now.getDate() - now.getDay())
		));
	}

	return (
		<div className='meal-plan-div'>
			{/* <div className='month-banner'> */}
			<h1>{MONTH_NAMES[firstDateOfWeek.getMonth()]}</h1>
			<MealPlanWeek
				firstDateOfWeek={firstDateOfWeek}
				setFirstDateOfWeek={setFirstDateOfWeek}
			/>
			<input
				type='button'
				value='Go to Today'
				onClick={handleGoToToday}
			/>
		</div>
		// </div >
	)
}