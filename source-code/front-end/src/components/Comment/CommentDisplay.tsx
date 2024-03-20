import React from "react";
import "./CommentDisplay.css";
import RandomIcon from "../DisplayIcon/RandomIcon";

type cdProps = { username: string; comment: string };
function CommentDisplay(props: cdProps) {
  return (
    <div id="comment">
      <div id="comment-user">
        {RandomIcon()}
        <h4>{props.username}</h4>
      </div>
      <div id="comment-content">
        <p>{props.comment}</p>
      </div>
    </div>
  );
}

export default CommentDisplay;
