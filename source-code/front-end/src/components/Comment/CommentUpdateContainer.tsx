import React, { useEffect, useState } from "react";
import CommentForm from "./CommentForm";

type cucProps = { contentId: string };
function CommentUpdateContainer(prop: cucProps) {
    const [comment, setComment] = useState("");

    async function loadUserComments() {
      // load comment specific to this content
    }
  
    async function handleSubmit() {
      // put updates to backend
    }
  
    useEffect(() => {
      loadUserComments();
    }, []);
  
    return (
      <>
        <div id="current-comment">Current Comment: {comment}</div>
        <CommentForm handleSubmit={handleSubmit} />
      </>
    );
}

export default CommentUpdateContainer;
