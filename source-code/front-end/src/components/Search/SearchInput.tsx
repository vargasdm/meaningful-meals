import React, { useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";
function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResponse, setSearchResponse] = useState([]);

  async function handleSearchSubmit(event: any) {
    event.preventDefault();
    try {
      // console.log(searchInput);

      // sends post request to backend
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
        `http://localhost:5000/recipes?query=${searchInput}`
      );

      console.log(response);
        
    //   if(response.data.results.length === 0){
    //     setSearchResponse([]);
    //   }
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
        <SearchList searchResponse={searchResponse} searchInput={searchInput} />
      </div>
    </>
  );
}

export default SearchInput;
