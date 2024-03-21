import React, { useEffect, useState } from "react";
import CommentDisplay from "./CommentDisplay";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";

type clProps = { contentId: string };
function CommentList(prop: clProps) {
  const [comments, setComments] = useState([]);

  const user = useSelector((state: any) => state.user);

  async function loadComments() {
    try {
      const favorite = await axios.get(
        `${endpoints.COMMENTS_ENDPOINT}/?item=${prop.contentId}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      setComments(favorite.data);
    } catch (error) {}
  }

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      <h3 id="comment-list-header">Comments: </h3>
      <div id="comment-list">
        {comments.map((item: any) => {
          return (
            <CommentDisplay
              username={item.username}
              comment={item.user_comment}
            />
          );
        })}
      </div>
    </>
  );
}

export default CommentList;