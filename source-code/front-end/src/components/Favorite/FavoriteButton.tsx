import React, { useEffect, useState } from "react";

function FavoriteButton(prop: any) {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (prop.favoriteList) {
      (prop.favoriteList as any[]).forEach((item) => {
        if (item.content_id === prop.contentId) {
          setIsFavorited(true);
        }
      });
    }
  }, []);

  const handleToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button id="favorite-btn" onClick={handleToggle}>
      {isFavorited ? (
        <i className="bi bi-heart-fill"></i>
      ) : (
        <i className="bi bi-heart"></i>
      )}
    </button>
  );
}

export default FavoriteButton;
