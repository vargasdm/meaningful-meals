import React, { useEffect, useState } from "react";
import CommentDisplay from "./CommentDisplay";
import { useSelector } from "react-redux";

type clProps = { contentId: string };
function CommentList(prop: clProps) {
  const [comments, setComments] = useState([]);

  const user = useSelector((state: any) => state.user);

  async function loadComments() {}

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      <div id="comment-list">
        {comments.map((item:any) => {
          return (
            <CommentDisplay username={item.username} comment={item.comment} />
          );
          // if user owns comment add update button
        })}
      </div>
    </>
  );
}

export default CommentList;
