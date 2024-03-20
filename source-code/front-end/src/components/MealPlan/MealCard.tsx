type MealCardProps = {
	mealID: string,
	key: string
}

export default function MealCard(props: MealCardProps) {
	return (
		<div className='meal-card-div'>
			{props.mealID}
		</div>
	)
}