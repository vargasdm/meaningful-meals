// import {useSelector} from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import store from '../../store/store';

export async function loader() {
	// const user = useSelector((state: any) => state.user);
	// const user = store.getState().user;
	// console.log(`Profile.tsx user: ${JSON.stringify(user)}`);
	// return null;
	return store.getState().user;
	// GLOBAL STATE DOESN'T REHYDRATE TIL AFTER LOADERS RUN
	// DON'T ACCESS GLOBAL STATE IN THE LOADER
}

export default function Profile() {
	// const data: any = useLoaderData();
	// console.log(store.getState());
	const globalState = store.getState();
	// INSTEAD, ACCESS GLOBAL STATE IN THE COMPONENT ITSELF
	console.log(globalState);

	return (
		<h1>{globalState.user.username}</h1>
	);
}