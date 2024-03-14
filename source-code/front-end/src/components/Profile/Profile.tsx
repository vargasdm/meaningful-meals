// import {useSelector} from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import store from '../../store/store';

export async function loader() {
	// const user = useSelector((state: any) => state.user);
	// const user = store.getState().user;
	// console.log(`Profile.tsx user: ${JSON.stringify(user)}`);
	// return null;
	return store.getState().user;
}

export default function Profile() {
	const data: any = useLoaderData();

	return (
		<h1>{data.username}</h1>
	);
}