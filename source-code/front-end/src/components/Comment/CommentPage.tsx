import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";
import { useParams } from "react-router-dom";
import "./CommentPage.css";

function CommentPage() {
	const { contentId } = useParams();
	// const [content, setContent] = useState(
	// 	<CommentList contentId={contentId as string} />
	// );

	// async function readContent() {
	// 	setContent(<CommentList contentId={contentId as string} />);
	// }
	// async function makeContent() {
	// 	setContent(<CommentCreateContainer contentId={contentId as string} />);
	// }
	// async function updateContent() {
	// 	setContent(<CommentUpdateContainer contentId={contentId as string} />);
	// }

	return (
		<div id="comments-page">
			<h2 id="comments-page-header">Comments Page</h2>
			<CommentCreateContainer contentId={contentId as string} />
			<CommentList contentId={contentId as string} />
		</div>
	);
}

export default CommentPage;
