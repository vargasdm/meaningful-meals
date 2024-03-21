import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";

type cccProps = { contentId: string };
function CommentCreateContainer(prop: cccProps) {
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([] as any);

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
    } catch (error: any) {
      if (error.response.data.errors !== typeof []) {
        const newError = [error.response.data.errors];
        setErrors(newError);
      } else {
        setErrors(error);
      }

      setTimeout(() => {
        setErrors([]);
      }, 15000);
    }
  }

  return (
<<<<<<< HEAD
    <>
      <div id="errors">
        {errors &&
          errors.map((item: any, index: any) => {
            return <p>{`${item}\n `}</p>;
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput">
          <h3>Your Comment:</h3>
        </label>
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
=======
    <form onSubmit={handleSubmit}>
      <label htmlFor="commentInput">
        <h3>Your Comment:</h3>
      </label>
      <textarea
        id="commentInput"
        value={comment}
        onChange={handleInputChange}
        rows={5}
        cols={50}
      />
      <button type="submit">Submit</button>
    </form>
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
  );
}

export default CommentCreateContainer;
