import React, { useEffect, useState } from "react";

type fbProps = {isFavorited: boolean, handleToggle:any}
function FavoriteButton(prop: fbProps) {
  return (
    <button id="favorite-btn" onClick={prop.handleToggle}>
      {prop.isFavorited ? (
        <i className="bi bi-heart-fill" aria-placeholder="heart-fill"></i>
      ) : (
        <i className="bi bi-heart" aria-placeholder="heart-empty"></i>
      )}
    </button>
  );
}

export default FavoriteButton;