export default function MealPlanDay(props: any) {
	return (
		<div className='meal-plan-day'>
			<h2>{props.name}</h2 >
			<input
				type='button'
				value='Add Meal'
			/>
		</div>
	)
}