"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function default_1(commentDb) {
    function validateInputComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.user_id || !input.content_id || !input.user_comment || !input.username) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            // check if comment exists
            const comment = yield commentDb.getCommentByUserAndContent(input);
            if (comment && comment.content_id === input.content_id) {
                errors.push("COMMENT ALREADY EXISTS");
            }
            // apply comment restrictions
            if (input.user_comment.length > 750) {
                errors.push("COMMENT IS TOO LARGE");
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
    function validateUpdateComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id || !input.user_comment) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            // check if content is real
            const comments = yield commentDb.getCommentsByUserId(input.user_id);
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
        });
    }
    function validateDeleteComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            // check if content is real
            const comments = yield commentDb.getCommentsByUserId(input.user_id);
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
        });
    }
    function validateUserContent(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input || !input.content_id || !input.user_id) {
                errors.push("INPUTS ARE NULL");
                return { isValid: false, errors };
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
    function validateId(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            // validate input
            if (!input) {
                errors.push("INPUT IS NULL");
                return { isValid: false, errors };
            }
            if (errors.length > 0) {
                return { isValid: false, errors };
            }
            return { isValid: true, errors };
        });
    }
    function createComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield commentDb.createComment({
                    comment_id: (0, uuid_1.v4)(),
                    user_id: input.user_id,
                    username: input.username,
                    content_id: input.content_id,
                    user_comment: input.user_comment,
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    function deleteComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield commentDb.getCommentsByUserId(input.user_id);
                let commentId;
                data.forEach((item) => {
                    if (item.content_id === input.content_id) {
                        commentId = item.comment_id;
                    }
                });
                yield commentDb.deleteComment(commentId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    function updateComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield commentDb.getCommentByUserAndContent({
                    user_id: input.user_id,
                    content_id: input.content_id,
                });
                if (data) {
                    data.user_comment = input.user_comment;
                    yield commentDb.updateComment(data);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getUserContentComment(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentDb.getCommentByUserAndContent(input);
                return result;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getContentComments(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentDb.getComments();
                let data = [];
                result.forEach((item) => {
                    if (item.content_id === input) {
                        data.push(item);
                    }
                });
                return data;
            }
            catch (err) {
                throw err;
            }
        });
    }
    function getUserComments(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentDb.getCommentsByUserId(input);
                return result;
            }
            catch (err) {
                throw err;
            }
        });
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
exports.default = default_1;
