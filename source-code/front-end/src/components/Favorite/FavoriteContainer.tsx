import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";
import endpoints from "../../endpoints";

type fcProps = { contentId: string };
function FavoriteContainer(prop: fcProps) {
  const [isFavorited, setFavorited] = useState(false);

  const user = useSelector((state: any) => state.user);
  const jwt = user.jwt;
  const url = `${endpoints.FAVORITES_ENDPOINT}/?user=${user.userID}&item=${prop.contentId}`;

  async function getSpecificFavorite(): Promise<void> {
    try {
      const favorite = await axios.get(url, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!favorite.data) {
        setFavorited(false);
      } else {
        setFavorited(true);
      }
    } catch (error) {
      setFavorited(false);
    }
  }

  const handleToggle = () => {
    if (!isFavorited) {
      // user favorites content
      createFavorite(); 
    }
    if (isFavorited) {
      // user unfavorites content
      deleteFavorite();
    }
    setFavorited(!isFavorited);
  };

  async function createFavorite() {
    try {
      await axios.post(
        endpoints.FAVORITES_ENDPOINT,
        {
          user_id: user.userID,
          content_id: prop.contentId,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFavorite() {
    try {
      const result = await axios.delete(url,{
        headers: { Authorization: `Bearer ${jwt}` },
      });

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getSpecificFavorite();
  }, [isFavorited]);

  return (
    <FavoriteButton isFavorited={isFavorited} handleToggle={handleToggle} />
  );
}

export default FavoriteContainer;
