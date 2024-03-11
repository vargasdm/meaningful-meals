import React from "react";

function SearchList(props: any) {
  // console.log(props.searchResponse.results);
  return (
    <>
      <div className="searchList">
        {props.searchResponse.results && props.searchResponse.results.length > 0 ? (
          props.searchResponse.results.map((recipe: any) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
            </div>
          ))
        ) : (
          <p>No results found</p> // Display different set of elements when results are empty
        )}
      </div>
    </>
  );
}

export default SearchList;
