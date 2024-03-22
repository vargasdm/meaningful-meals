import React, { useEffect, useState } from "react";
import CommentDisplay from "./CommentDisplay";
import { useSelector } from "react-redux";
import axios from "axios";
import endpoints from "../../endpoints";
console.log(endpoints.COMMENTS_ENDPOINT);

type clProps = { contentId: string };
function CommentList(prop: clProps) {
	const [comments, setComments] = useState([]);

	const user = useSelector((state: any) => state.user);

	async function loadComments() {
		try {
			const comments = await axios.get(
				`${endpoints.COMMENTS_ENDPOINT}/?item=${prop.contentId}`,
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
	}, []);

	return (
		<>
			<h3 id="comment-list-header">Comments: </h3>
			<div id="comment-list">
				{comments.map((item: any, index: number) => {
					return (
						<CommentDisplay
							key={index}
							username={item.username}
							comment={item.user_comment}
						/>
					);
				})}
			</div>
		</>
	);
}

export default CommentList;
