import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }: any) {
	try {
		const res = await axios.get(
			`http://localhost:5000/recipes?id=${params.id}`
		);

		return res.data;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export default function Recipe() {
	const data: any = useLoaderData();
	const instructions: any = data.analyzedInstructions[0].steps.map(
		(step: any) => <li key={step.number}>{step.step}</li>
	)

	return (
		<>
			<h1>{data.title}</h1>
			<ol>{instructions}</ol>
		</>
	);
}