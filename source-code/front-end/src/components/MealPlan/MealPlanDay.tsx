// import { Link } from "react-router-dom";
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
	// dayName: string,
	// dateOfTheMonth: number,
	// month: number,
	// year: number
	date: Date
}

export default function MealPlanDay(props: MealPlanDayProp) {
	return (
		<div className='meal-plan-day'>
			<h1>{DAY_NAMES[props.date.getDay()]} {props.date.getDate()}</h1 >
		</div>
	);
}