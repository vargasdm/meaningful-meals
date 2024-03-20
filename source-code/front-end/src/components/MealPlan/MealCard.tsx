import axios from "axios";
import { useEffect, useState } from "react";
import endpoints from "../../endpoints";
// import {NumCaloriesDoNotExistError} from '../../util'
import util from '../../util';

const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT;

type MealCardProps = {
	mealID: string,
	recipeID: string,
	key: string
}

export default function MealCard(props: MealCardProps) {
	const [name, setName] = useState('');
	const [numCalories, setNumCalories] = useState(0);
	const [imageSource, setImageSource] = useState('');

	async function getRecipe() {
		const recipeData = await axios.get(
			`${RECIPES_ENDPOINT}?id=${props.recipeID}`
		);

		const recipe = recipeData.data;
		setName(recipe.title);
		// setNumCalories(recipe.nutrition.nutrients)
		setNumCalories(util.getNumCalories(recipe));
		setImageSource(recipe.image);


		// console.log(recipeData);

	};

	useEffect(() => {
		getRecipe();
	}, []);

	return (
		<div className='meal-card-div'>
			<h1>{name}</h1>
		</div>
	)
}