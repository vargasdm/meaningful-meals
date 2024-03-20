import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";

type cccProps = { contentId: string };
function CommentCreateContainer(prop: cccProps) {
  const [comment, setComment] = useState("");

  const user = useSelector((state: any) => state.user);

  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  async function handleSubmit() {
    try {
      await axios.post(
        endpoints.COMMENTS_ENDPOINT,
        {
          user_id: user.userID,
          content_id: prop.contentId,
          username: user.username,
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

  return (
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
  );
}

export default CommentCreateContainer;
