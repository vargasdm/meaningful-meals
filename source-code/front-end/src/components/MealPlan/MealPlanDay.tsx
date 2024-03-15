import { Link } from "react-router-dom";

export default function MealPlanDay(props: any) {
	return (
		<div className='meal-plan-day'>
			<h2>{props.name}</h2 >
			{/* <input
				type='button'
				value='Add Meal'
				onClick={props.handleAddMeal}
			/> */}
			<Link to={'/meal?date=1'}>Add Meal</Link>
		</div>
	)
}