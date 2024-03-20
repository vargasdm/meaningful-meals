type MealCardProps = {
	name: string,
	imageSource: string,
	numCalories: number,
	key: string
}

export default function MealCard(props: MealCardProps) {
	return (
		<div className='meal-card-div'>
			<h1>{props.name}</h1>
			<img src={props.imageSource} />
		</div>
	)
}