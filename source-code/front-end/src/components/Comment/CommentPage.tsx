import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";
import { useParams } from "react-router-dom";
import "./CommentPage.css";

function CommentPage() {
  const { contentId } = useParams();
  const [content, setContent] = useState(
    <CommentList contentId={contentId as string} />
  );

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
    <div id="comments-page">
      <h2 id="comments-page-header">Comments Page</h2>
      <div id="comment-buttons">
        <button onClick={readContent}>Read Comments</button>
        <button onClick={makeContent}>Make a Comment</button>
        <button onClick={updateContent}>Update Comment </button>
      </div>
      <div id="comment-content">{content}</div>
    </div>
  );
}

export default CommentPage;
