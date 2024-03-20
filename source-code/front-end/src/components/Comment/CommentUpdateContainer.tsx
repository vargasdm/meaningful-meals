import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";

type cucProps = { contentId: string };
function CommentUpdateContainer(prop: cucProps) {
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState("loading...");

  const user = useSelector((state: any) => state.user);

  async function loadUserComment() {
    // load comment specific to this content
    try {
      const favorite = await axios.get(
        `${endpoints.COMMENTS_ENDPOINT}/?user=${user.userID}&item=${prop.contentId}`,
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
      setDisplay(favorite.data.user_comment)
    } catch (error) {}
  }

  async function handleSubmit() {
    try {
      await axios.put(
        endpoints.COMMENTS_ENDPOINT,
        {
          user_id: user.userID,
          content_id: prop.contentId,
          user_comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    loadUserComment();
  }, [comment]);

  return (
    <>
      <div id="current-comment">Current Comment: {display}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput">Your Comment:</label>
        <textarea
          id="commentInput"
          value={comment}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CommentUpdateContainer;
