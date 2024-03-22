// import React, { useEffect, useState } from "react";
import CommentDisplay from "./CommentDisplay";
// import { useSelector } from "react-redux";
// import axios from "axios"; 
import endpoints from "../../endpoints";
console.log(endpoints.COMMENTS_ENDPOINT);

type clProps = { contentId: string, comments: any[] };
function CommentList(props: clProps) {
	return (
		<>
			<h3 id="comment-list-header">Comments: </h3>
			<div id="comment-list">
				{props.comments.map((item: any, index: number) => {
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
