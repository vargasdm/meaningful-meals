import React, { useState } from "react";
import CommentDisplay from "./CommentDisplay";

type clProps = { content_id: string };
function CommentList(prop: clProps) {
  const [comments, setComments] = useState([]);

  return (
    <div className="comment-list">
      {comments &&
        comments.forEach((item) => {
          <CommentDisplay username={item.username} comment={item.comment} />;
        })}
    </div>
  );
}

export default CommentList;
