import React, { useState } from "react";

function CommentButton() {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => {
    setIsHover(true);
  };

  const handleNotHover = () => {
    setIsHover(false);
  };

  return (
    <button onMouseOver={handleIsHover} onMouseLeave={handleNotHover} onMouseDown={handleNotHover}>
      {isHover ? (
        <i className="bi bi-chat-dots-fill"></i>
      ) : (
        <i className="bi bi-chat-dots"></i>
      )}
    </button>
  );
}

export default CommentButton;
