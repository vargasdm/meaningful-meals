import React, { useState } from "react";
import { Link } from "react-router-dom";

type cbProps = {contentId: string}
function CommentButton(prop: cbProps) {
  const [isHover, setIsHover] = useState(false);

  const handleIsHover = () => {
    setIsHover(true);
  };

  const handleNotHover = () => {
    setIsHover(false);
  };

  return (
      <Link
        to={`/comments/${prop.contentId}`}
        onMouseOver={handleIsHover}
        onMouseLeave={handleNotHover}
        onMouseDown={handleNotHover}
      >
        {isHover ? (
          <i className="bi bi-chat-dots-fill">Comments</i>
        ) : (
          <i className="bi bi-chat-dots">Comments</i>
        )}
      </Link>
  );
}

export default CommentButton;
