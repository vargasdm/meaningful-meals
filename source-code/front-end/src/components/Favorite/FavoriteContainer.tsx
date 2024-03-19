import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import endpoints from "../../endpoints";

const BACKEND_PORT = process.env.REACT_APP_PORT;
const FAVORITES_ENDPOINT = `http://localhost:${BACKEND_PORT}/favorites`;

type fcProps = { content_id: string };
function FavoriteContainer(prop: fcProps) {
  console.log(FAVORITES_ENDPOINT);
  const [isFavorited, setFavorited] = useState(false);

  const user = useSelector((state: any) => state.user);
  const jwt = user.jwt;
  const url = `${FAVORITES_ENDPOINT}/?user=${user.user_id}&item=${prop.content_id}`;

  async function getSpecificFavorite(): Promise<void> {
    try {
      const favorite = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!favorite) {
        setFavorited(false);
      } else {
        setFavorited(true);
      }
    } catch (error) {
      setFavorited(false);
    }
  }

  const handleToggle = () => {
    if (isFavorited) {
      // user unfavorites content
      deleteFavorite();
    }

    if (!isFavorited) {
      // user favorites content
      createFavorite();
    }
    setFavorited(!isFavorited);
  };

  async function createFavorite() {
    try {
      await axios.post(
        FAVORITES_ENDPOINT,
        {
          user_id: user.user_id,
          content_id: prop.content_id,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavorite() {
    try {
      const result = await axios.delete(FAVORITES_ENDPOINT);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSpecificFavorite();
  }, []);

  return (
    <FavoriteButton isFavorited={isFavorited} handleToggle={handleToggle} />
  );
}

export default FavoriteContainer;
