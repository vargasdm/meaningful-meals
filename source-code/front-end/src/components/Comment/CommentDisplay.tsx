import React from "react";
import "./CommentDisplay.css"
import RandomIcon from "../DisplayIcon/RandomIcon";

type cdProps = { username: string; comment: string };
function CommentDisplay(props: cdProps) {
  return (
    <div id="comment">
      {RandomIcon()}
      <p>{props.username}</p>
      <p>{props.comment}</p>
    </div>
  );
}

export default CommentDisplay;
