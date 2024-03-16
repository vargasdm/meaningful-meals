import React, { useEffect, useState } from "react";
import { ToggleButton } from "react-bootstrap";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

function Favorite() {
  const [isFavorited, setIsFavorited] = useState(false);

  

  const handleToggle = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    /*<ToggleButtonGroup
      type="checkbox"
      value={isFavorited}
      onChange={() => handleToggle()}
    >*/
      <button id="favorite-btn" onClick={handleToggle}>
        {isFavorited ? (
          <i className="bi bi-heart-fill"></i>
        ) : (
            <i className="bi bi-heart"></i>
        )}
      </button>
    /*</ToggleButtonGroup>*/
  );
}

export default Favorite;
