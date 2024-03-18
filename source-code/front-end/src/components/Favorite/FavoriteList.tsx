import React, { useEffect, useState } from "react";
import axios from "axios";
import store from "../../store/store";
const globalState = store.getState().user;
const USER = globalState.userID;
const PORT = process.env.REACT_APP_PORT;
const URL = `http://localhost:${PORT}/favorite/?user=${USER}`;

function FavoriteList(props: any) {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    fetchUserFavorites();
    props.userFavorites = favoriteList;
  }, [])

  async function fetchUserFavorites() {
    const response = await axios.get(URL);;
    setFavoriteList(response.data);
}

  return <div>FavoriteList</div>;
}

export default FavoriteList;
