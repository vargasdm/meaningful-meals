import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import "./CommentPage.css";
=======
import { useParams } from 'react-router-dom';
import "./CommentPage.css"
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77

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
<<<<<<< HEAD
      <h2 id="comments-page-header">Comments Page</h2>
      <div id="comment-buttons">
=======
      <h2 className="comments-page-header">Comments Page</h2>
      <div className="comment-buttons">
>>>>>>> ef5e4a0ec591fc053043cac237b53fedca36fa77
        <button onClick={readContent}>Read Comments</button>
        <button onClick={makeContent}>Make a Comment</button>
        <button onClick={updateContent}>Update Comment </button>
      </div>
      <div id="comment-content">{content}</div>
    </div>
  );
}

export default CommentPage;
