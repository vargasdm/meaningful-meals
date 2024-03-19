import React from "react";
import CommentForm from "./CommentForm";

type cccProps = { contentId: string };
function CommentCreateContainer(prop: cccProps) {
  async function handleSubmit() {}

  return <CommentForm handleSubmit={handleSubmit} />;
}

export default CommentCreateContainer;
