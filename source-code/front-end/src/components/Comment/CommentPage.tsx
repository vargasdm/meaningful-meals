import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentCreateContainer from "./CommentCreateContainer";
import { useSelector } from "react-redux";
import CommentUpdateContainer from "./CommentUpdateContainer";
import { useParams } from "react-router-dom";
import "./CommentPage.css";
import axios from "axios";
import endpoints from "../../endpoints";

function CommentPage() {
	const { contentId } = useParams();
	const [comments, setComments] = useState([]);
	const user = useSelector((state: any) => state.user);
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


	async function loadComments() {
		try {
			const comments = await axios.get(
				`${endpoints.COMMENTS_ENDPOINT}/?item=${contentId}`,
				{
					headers: { Authorization: `Bearer ${user.jwt}` },
				}
			);
			console.log(comments);
			setComments(comments.data);
		} catch (error) {
			console.error(error);
			setComments([]);
		}
	}

	useEffect(() => {
		loadComments();
	}, [])

	return (
		<div id="comments-page">
			<h2 id="comments-page-header">Comments Page</h2>
			<CommentCreateContainer
				contentId={contentId as string}
				getMeals={loadComments}
			/>
			<CommentList contentId={contentId as string}
			comments={comments} />
		</div>
	);
}

export default CommentPage;
