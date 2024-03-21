import React, { useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";
import endpoints from '../../endpoints';

const BACKEND_PORT = process.env.REACT_APP_PORT;
const RECIPES_ENDPOINT = endpoints.RECIPES_ENDPOINT
	|| `http://localhost:${BACKEND_PORT}`;

console.log(endpoints.RECIPES_ENDPOINT);

function SearchInput() {
	const [searchInput, setSearchInput] = useState("");
	const [searchResponse, setSearchResponse] = useState([]);

	async function handleSearchSubmit(event: any) {
		event.preventDefault();
		try {
			if (await searchApi(searchInput)) {
				console.log("success");

			}
		} catch (error) {
			console.error(error);
		}
	}

	async function searchApi(searchInput: any) {
		try {
			let response = await axios.get(
				`${RECIPES_ENDPOINT}?query=${searchInput}`
			);

			// console.log(response);
			setSearchResponse(response.data);

			return response;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<h1>SearchInput</h1>
			<form onSubmit={handleSearchSubmit}>
				<input
					type="search"
					name="search"
					placeholder="search something here"
					onChange={(e) => setSearchInput(e.target.value)}
				></input>

				<button type="submit">Search</button>
			</form>
			<div>
				<SearchList searchResponse={searchResponse} />
			</div>
		</>
	);
}

export default SearchInput;
