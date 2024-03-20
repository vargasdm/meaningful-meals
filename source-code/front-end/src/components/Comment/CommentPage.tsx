import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";
import { useParams } from 'react-router-dom';

function CommentPage() {
  const { contentId } = useParams();
  const [content, setContent] = useState(<CommentList contentId={contentId as string} />);

  async function readContent() {
    setContent(<CommentList contentId={contentId as string} />);
  }
  async function makeContent() {
    setContent(<CommentCreateContainer contentId={contentId as string} />);
  }
  async function updateContent() {
    setContent(<CommentUpdateContainer contentId={contentId as string} />);
  }

  return (
    <>
      <h2 className="comments-page-header">Comments Page</h2>
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
