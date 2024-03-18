import React, { useEffect, useState } from "react";

function FavoriteButton(prop: any) {
  const [isFavorited, setIsFavorited] = useState(prop.isFavorited);

  return (
    <button id="favorite-btn" onClick={prop.handleToggle()}>
      {isFavorited ? (
        <i className="bi bi-heart-fill"></i>
      ) : (
        <i className="bi bi-heart"></i>
      )}
    </button>
  );
}

export default FavoriteButton;
