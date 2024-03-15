import axios from "axios";
import { useLoaderData } from "react-router-dom";
import './Recipe.css';

const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/recipes`;
export async function loader({ params }: any) {
	try {
		const res = await axios.get(`${URL}?id=${params.id}`);

		return res.data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export default function Recipe() {
	const data: any = useLoaderData();
	console.log(data);

	const instructions: any = data.analyzedInstructions[0].steps.map(
		(step: any) => <li key={step.number}>{step.step}</li>
	);
	const ingredients: any = data.nutrition.ingredients.map(
		(ingredient: any) => <li key={ingredient.id}>{ingredient.name}</li>
	);

	return (
		<div className='recipe-div'>
			<div className='recipe-main-header'>
				<h1>{data.title}</h1>
				<input type='button' value='Add to Meal Plan' />
			</div>
			<img src={data.image} alt={data.title} />
			<h2>Ingredients</h2>
			<ul>{ingredients}</ul>
			<h2>Instructions</h2>
			<ol>{instructions}</ol>
		</div>
	);
}
