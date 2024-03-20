type MealCardProps = {
	id: string
	name: string,
	imageSource: string,
	numCalories: number,
	key: string,
}

export default function MealCard(props: MealCardProps) {
	async function handleDeleteMealCard(){

	}
	return (
		<div className='meal-card-div'>
			<div className='meal-card-header-div'>
				<h1>{props.name}</h1>
				<i className='bi bi-trash' />
			</div>
			<img src={props.imageSource} />
			<h2>{props.numCalories} kcal</h2>
		</div>
	);
}