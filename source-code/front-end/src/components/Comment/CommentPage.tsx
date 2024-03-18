import React, { useState } from "react";

function CommentPage() {
  const [content, setContent] = useState(<></>);

  function readContent() {
    setContent(<></>);
  }
  function makeContent() {
    setContent(<></>);
  }
  return (
    <>
      <div className="comment-buttons">
        <button onClick={readContent}>Read Comments</button>
        <button onClick={makeContent}>Make a Comment</button>
      </div>
      <div className="comment-content">{content}</div>
    </>
  );
}

export default CommentPage;
