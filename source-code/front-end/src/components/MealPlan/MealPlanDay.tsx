import { Link } from "react-router-dom";

type MealPlanDayProp = {
	dayName: string,
	dateOfTheMonth: number,
	month: number,
	year: number
}

export default function MealPlanDay(props: MealPlanDayProp) {
	return (
		<div className='meal-plan-day'>
			<h1>{props.dayName} {props.dateOfTheMonth}</h1 >
			{/* <Link to={'/meal?date=1'}>Add Meal</Link> */}
		</div>
	);
}