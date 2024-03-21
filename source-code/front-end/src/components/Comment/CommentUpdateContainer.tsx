import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";
import CommentDisplay from "./CommentDisplay";
<<<<<<< HEAD
import "./CommentUpdateContainer";
=======
import "./CommentUpdateContainer"
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

type cucProps = { contentId: string };
function CommentUpdateContainer(prop: cucProps) {
  const [comment, setComment] = useState("");
  const [display, setDisplay] = useState(<p>loading...</p>);
<<<<<<< HEAD
  const [errors, setErrors] = useState([] as any);
=======
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

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
<<<<<<< HEAD
      setDisplay(
        <CommentDisplay
          username={user.username}
          comment={favorite.data.user_comment}
        />
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
=======
      setDisplay(<CommentDisplay username={user.username} comment={favorite.data.user_comment}/>)
    } catch (error) {}
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
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

  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    loadUserComment();
  }, [comment]);

  return (
<<<<<<< HEAD
    <div id="comments-page">
      <div id="errors">
        {errors &&
          errors.map((item: any, index: any) => {
            return <p>{`${item}\n `}</p>;
          })}
      </div>
      <div id="current-comment">
        <h3>Current Comment:</h3>
        {display}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput">
          <h3>Your New Comment:</h3>
        </label>
=======
    <>
      <div id="current-comment"><h3>Current Comment:</h3>{display}</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentInput"><h3>Your New Comment:</h3></label>
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        <textarea
          id="commentInput"
          value={comment}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentUpdateContainer;
