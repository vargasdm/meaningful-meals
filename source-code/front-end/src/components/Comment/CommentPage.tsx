import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";

type cpProps = { contentId: string };
function CommentPage(prop: cpProps) {
  const [content, setContent] = useState(<></>);

  async function readContent() {
    setContent(<CommentList contentId={prop.contentId} />);
  }
  async function makeContent() {
    setContent(<CommentCreateContainer contentId={prop.contentId} />);
  }
  async function updateContent() {
    setContent(<CommentUpdateContainer contentId={prop.contentId} />);
  }

  return (
    <>
      <h2>Comments Page</h2>
      <div className="comment-buttons">
        <button onClick={readContent}>Read Comments</button>
        <button onClick={makeContent}>Make a Comment</button>
        <button onClick={updateContent}>Update Comment </button>
      </div>
      <div className="comment-content">{content}</div>
    </>
  );
}

export default CommentPage;
