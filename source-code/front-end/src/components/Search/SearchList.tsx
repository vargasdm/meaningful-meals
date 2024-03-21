import React from "react";
import { Link } from "react-router-dom";

function SearchList(props: any) {
	// console.log(props.searchResponse);
	const results = props.searchResponse;
	return (
		<>
			<div className="searchList">
				{results && results.length > 0 ? results.map((recipe: any) => (
					<div key={recipe.id}>
						<Link to={`/recipes/${recipe.id}`}>
							<h3>{recipe.title}</h3>
						</Link>
						{recipe.image && <img src={recipe.image} alt={recipe.title} />}
					</div>
				))
					: props.searchResponse.results && (
						<p>No results found</p>
					) // Show "No results found" only when something has been searched for and results are empty
				}
			</div>
		</>
	);
}

export default SearchList;
