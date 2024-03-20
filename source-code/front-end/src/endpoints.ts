const BACKEND_IP: string = process.env.REACT_APP_BACKEND_IP as string;
const BACKEND_SOCKET: string = `${BACKEND_IP}:${process.env.REACT_APP_BACKEND_PORT}`;
const RECIPES_ENDPOINT: string = `${BACKEND_SOCKET}${process.env.REACT_APP_RECIPES_PATH}`;
const MEALS_ENDPOINT: string = `${BACKEND_SOCKET}${process.env.REACT_APP_MEALS_PATH}`;
const FAVORITES_ENDPOINT: string = `${BACKEND_SOCKET}${process.env.REACT_APP_FAVORITES_PATH}`;
const COMMENTS_ENDPOINT: string = `${BACKEND_SOCKET}${process.env.REACT_APP_COMMENTS_PATH}`;

export default {
	BACKEND_IP,
	BACKEND_SOCKET,
	RECIPES_ENDPOINT,
	MEALS_ENDPOINT,
	FAVORITES_ENDPOINT,
	COMMENTS_ENDPOINT
}