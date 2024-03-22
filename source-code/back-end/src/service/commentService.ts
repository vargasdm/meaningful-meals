import { v4 as uuid } from "uuid";
import { Validation } from "../util/validation.type";

type comment = {
	comment_id: string;
	user_id: string;
	username: string;
	content_id: string;
	user_comment: string;
};

type commentInput = {
	user_id: string;
	content_id: string;
	user_comment: string;
	username: string;
};

type commentUpdate = {
	user_id: string;
	content_id: string;
	user_comment: string;
};

type commentUserContentInput = {
	user_id: string;
	content_id: string;
};

export default function (commentDb: any) {
	async function validateInputComment(
		input: commentInput
	): Promise<Validation> {
		const errors: string[] = [];
		// validate input
		if (!input || !input.user_id || !input.content_id || !input.user_comment || !input.username) {
			errors.push("INPUTS ARE NULL");
			return { isValid: false, errors };
		}
		// check if comment exists
		// const comment = await commentDb.getCommentByUserAndContent(input);

		// if (comment && comment.content_id === input.content_id) {
		//   errors.push("COMMENT ALREADY EXISTS");
		// }

		// apply comment restrictions
		if (input.user_comment.length > 750) {
			errors.push("COMMENT IS TOO LARGE");
		}

		if (errors.length > 0) {
			return { isValid: false, errors };
		}

		return { isValid: true, errors };
	}

	async function validateUpdateComment(
		input: commentUpdate
	): Promise<Validation> {
		const errors: string[] = [];
		// validate input
		if (!input || !input.content_id || !input.user_id || !input.user_comment) {
			errors.push("INPUTS ARE NULL");
			return { isValid: false, errors };
		}
		// check if content is real
		const comments: comment[] = await commentDb.getCommentsByUserId(
			input.user_id
		);

		if (!comments) {
			errors.push("COMMENT DOES NOT EXISTS");
		}

		let notUsers = true;
		comments.forEach((item) => {
			// check if user owns the comment
			if (item.content_id == input.content_id) {
				notUsers = false;
			}
		});
		if (notUsers) {
			errors.push("USER DOES NOT OWN COMMENT");
		}

		// apply comment restrictions
		if (input.user_comment.length > 750) {
			errors.push("COMMENT IS TOO LARGE");
		}

		if (errors.length > 0) {
			return { isValid: false, errors };
		}

		return { isValid: true, errors };
	}

	async function validateDeleteComment(
		input: commentUserContentInput
	): Promise<Validation> {
		const errors: string[] = [];
		// validate input
		if (!input || !input.content_id || !input.user_id) {
			errors.push("INPUTS ARE NULL");
			return { isValid: false, errors };
		}
		// check if content is real
		const comments: comment[] = await commentDb.getCommentsByUserId(
			input.user_id
		);

		if (!comments) {
			errors.push("NO USER COMMENTS");
		}

		let notUsers = true;
		comments.forEach((item) => {
			// check if user owns the comment
			if (item.content_id == input.content_id) {
				notUsers = false;
			}
		});
		if (notUsers) {
			errors.push("USER DOES NOT OWN COMMENT");
		}

		if (errors.length > 0) {
			return { isValid: false, errors };
		}

		return { isValid: true, errors };
	}

	async function validateUserContent(
		input: commentUserContentInput
	): Promise<Validation> {
		const errors: string[] = [];
		// validate input
		if (!input || !input.content_id || !input.user_id) {
			errors.push("INPUTS ARE NULL");
			return { isValid: false, errors };
		}

		if (errors.length > 0) {
			return { isValid: false, errors };
		}

		return { isValid: true, errors };
	}

	async function validateId(input: string): Promise<Validation> {
		const errors: string[] = [];
		// validate input
		if (!input) {
			errors.push("INPUT IS NULL");
			return { isValid: false, errors };
		}

		if (errors.length > 0) {
			return { isValid: false, errors };
		}

		return { isValid: true, errors };
	}

	async function createComment(input: commentInput) {
		try {
			await commentDb.createComment({
				comment_id: uuid(),
				user_id: input.user_id,
				username: input.username,
				content_id: input.content_id,
				user_comment: input.user_comment,
			});
		} catch (err) {
			throw err;
		}
	}

	async function deleteComment(input: commentUserContentInput) {
		try {
			const data: comment[] = await commentDb.getCommentsByUserId(
				input.user_id
			);

			let commentId;

			data.forEach((item) => {
				if (item.content_id === input.content_id) {
					commentId = item.comment_id;
				}
			});

			await commentDb.deleteComment(commentId);
		} catch (err) {
			throw err;
		}
	}

	async function updateComment(input: commentUpdate) {
		try {
			const data = await commentDb.getCommentByUserAndContent({
				user_id: input.user_id,
				content_id: input.content_id,
			});
			if (data) {
				data.user_comment = input.user_comment;
				await commentDb.updateComment(data);
			}
		} catch (err) {
			throw err;
		}
	}

	async function getUserContentComment(
		input: commentUserContentInput
	): Promise<comment> {
		try {
			const result = await commentDb.getCommentByUserAndContent(input);
			return result;
		} catch (err) {
			throw err;
		}
	}

	async function getContentComments(input: string): Promise<comment[]> {
		try {
			const result = await commentDb.getComments();

			let data: comment[] = [];

			result.forEach((item: comment) => {
				if (item.content_id === input) {
					data.push(item);
				}
			});

			return data;
		} catch (err) {
			throw err;
		}
	}

	async function getUserComments(input: string): Promise<comment[]> {
		try {
			const result = await commentDb.getCommentsByUserId(input);
			return result;
		} catch (err) {
			throw err;
		}
	}

	return {
		validateInputComment,
		createComment,
		validateUpdateComment,
		deleteComment,
		updateComment,
		validateUserContent,
		validateId,
		getUserContentComment,
		getContentComments,
		getUserComments,
		validateDeleteComment,
	};
}
