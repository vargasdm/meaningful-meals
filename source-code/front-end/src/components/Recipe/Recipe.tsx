import axios from 'axios';
import { useLoaderData } from 'react-router-dom';

export async function loader({ params }: any) {
	// const data = {};

	try {
		const res = await axios.get('https://api.spoonacular.com'
			+ `/recipes/${params.id}/information`);

		console.log(res);
		return res;
	} catch (err) {
		console.error(err);
		return null;
	}
}

export default function Recipe() {
	const data = useLoaderData();

	return (
		<>
			{data}
		</>
	);
}