import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FavoriteButton from "./FavoriteButton";

function FavoriteContainer() {
  const [isFavorited, setFavorited] = useState(false);

  const user = useSelector((state: any) => state.user);
  const jwt = user.jwt;
  const url = `url/?user=${/*user id*/ 0}&item=${/*item id*/ 0}`;

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
    setFavorited(!isFavorited);
  }

  useEffect(() => {
    if (isFavorited) {
        // user favorites content
    } else {
        // user unfavorites content
    }
    getSpecificFavorite();
  }, []);

  return (
    <FavoriteButton isFavorited={isFavorited} handleToggle={handleToggle} />
  );
}

export default FavoriteContainer;
