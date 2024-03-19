import React, { useState } from "react";
import { Link } from "react-router-dom";

function CommentButton() {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => {
    setIsHover(true);
  };

  const handleNotHover = () => {
    setIsHover(false);
  };

  return (
    <Link
      to="/comments"
      onMouseOver={handleIsHover}
      onMouseLeave={handleNotHover}
      onMouseDown={handleNotHover}
    >
      {isHover ? (
        <i className="bi bi-chat-dots-fill"></i>
      ) : (
        <i className="bi bi-chat-dots"></i>
      )}
    </Link>
  );
}

export default CommentButton;
