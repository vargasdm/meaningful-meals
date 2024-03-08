import { useRouteError } from 'react-router-dom';

export default function Error() {
	const error: any = useRouteError();
	console.error(error);

	return (
		<>
			<p>Sorry, an unexpected error occurred.</p>
			<p>{error.statusText || error.message}</p>
		</>
	)
}