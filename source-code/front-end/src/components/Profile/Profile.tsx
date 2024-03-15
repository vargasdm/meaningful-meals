import { useLoaderData } from 'react-router-dom';
import store from '../../store/store';

export async function loader() {
	// return store.getState().user;
	// GLOBAL STATE DOESN'T REHYDRATE TIL AFTER LOADERS RUN
	// DON'T ACCESS GLOBAL STATE IN THE LOADER
	return null;
}

export default function Profile() {
	const globalState = store.getState().user;

	return (
		<h1>{globalState.username}</h1>
	);
}