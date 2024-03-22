import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import endpoints from "../../endpoints";

type cccProps = { contentId: string, getMeals: Function };
function CommentCreateContainer(prop: cccProps) {
	const [comment, setComment] = useState("");
	const [errors, setErrors] = useState([] as any);
	const user = useSelector((state: any) => state.user);

	const handleInputChange = (event: any) => {
		setComment(event.target.value);
	};

	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			await axios.post(
				endpoints.COMMENTS_ENDPOINT,
				{
					user_id: user.userID,
					content_id: prop.contentId,
					username: user.username,
					user_comment: comment,
				},
				{
					headers: { Authorization: `Bearer ${user.jwt}` },
				}
			);
			setComment('');
		} catch (error: any) {
			console.error(error);
			if (error.response.data.errors !== typeof []) {
				const newError = [error.response.data.errors];
				setErrors(newError);
			} else {
				setErrors(error);
			}

			setTimeout(() => {
				setErrors([]);
			}, 15000);
		}
	}

	return (
		<>
			<div id="errors">
				{errors &&
					errors.map((item: any, index: any) => {
						return <p>{`${item}\n `}</p>;
					})}
			</div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="commentInput">
					<h3>Your Comment:</h3>
				</label>
				<textarea
					id="commentInput"
					value={comment}
					onChange={handleInputChange}
					rows={5}
					cols={50}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default CommentCreateContainer;
