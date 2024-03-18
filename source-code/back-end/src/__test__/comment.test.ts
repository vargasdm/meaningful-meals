import CommentService from "../service/commentService";

let contentTable = [
  {
    content_id: "1",
    content: "Random Content 1",
  },
  {
    content_id: "2",
    content: "Random Content 2",
  },
  {
    content_id: "3",
    content: "Random Content 3",
  },
];

let commentsTable = [
  {
    comment_id: "1",
    content_id: "1",
    user_id: "1",
    user_comment: "Test Comment 1",
  },
  {
    comment_id: "2",
    content_id: "2",
    user_id: "2",
    user_comment: "Test Comment 2",
  },
  {
    comment_id: "3",
    content_id: "3",
    user_id: "3",
    user_comment: "Test Comment 3",
  },
];

const mockCreateComment = jest.fn(async (item) => {
  try {
    commentsTable.push(item);
    return item;
  } catch (err) {
    throw new Error();
  }

  return null;
});
const mockDeleteComment = jest.fn(async (commentId) => {
  try {
    for (let i = 0; i < commentsTable.length; i++) {
      if (commentId === commentsTable[i].comment_id) {
        commentsTable.splice(i, 1);
        return;
      }
    }
  } catch (err) {
    throw new Error();
  }

  return null;
});
const mockUpdateComment = jest.fn(async (item) => {
  try {
    commentsTable.forEach((comment) => {
      if (
        comment.user_id === item.user_id &&
        comment.content_id === item.content_id
      ) {
        comment.user_comment = item.comment;
      }
    });
  } catch (error) {
    throw new Error();
  }
});

const mockGetCommentByUserAndContent = jest.fn(async (input) => {
  try {
    let data: any;
    commentsTable.forEach((comment) => {
      if (
        comment.user_id === input.user_id &&
        comment.content_id === input.content_id
      ) {
        data = comment;
      }
    });
    return data;
  } catch (err) {
    throw new Error();
  }
});

const mockGetCommentsByUserId = jest.fn(async (input) => {
  try {
    let data: any[] = [];
    commentsTable.forEach((comment) => {
      if (comment.user_id === input) {
        data.push(comment);
      }
    });

    return data;
  } catch (err) {
    throw new Error();
  }
});

const mockGetCommentsByContentId = jest.fn(async (input) => {
  try {
    let data: any[] = [];
    commentsTable.forEach((comment) => {
      if (comment.content_id === input) {
        data.push(comment);
      }
    });

    return data;
  } catch (err) {
    throw new Error();
  }
});

const mockGetComments = jest.fn(async (input) => {
  return commentsTable;
});

const commentDao = {
  getCommentByUserAndContent: mockGetCommentByUserAndContent,
  getCommentsByUserId: mockGetCommentsByUserId,
  createComment: mockCreateComment,
  deleteComment: mockDeleteComment,
  getCommentsByContentId: mockGetCommentsByContentId,
  getComments: mockGetComments,
  updateComment: mockUpdateComment,
};

const commentService = CommentService(commentDao);

/**
 * Comments
 *
 *  Tests:
 *      - User can create a comment
 *      - User can only comment on valid content id's
 *      - User can update their comments
 *      - User cannot update other user comments
 *      - User can delete their comments
 *      - User cannot delete other user comments
 *
 */
describe("Comments Test", () => {
  test("User can create a comment", async () => {
    // Arrange
    const input = {
      content_id: "1",
      user_id: "3",
      user_comment: "New Test Comment 1",
    };
    // Act
    const valid = await commentService.validateInputComment(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const process = await commentService.createComment(input);

    const result = await commentService.getUserComments(input.user_id);

    let userId: string = "";
    let contentId: string = "";
    let userComment: string = "";

    if (result) {
      result.forEach((comment) => {
        if (
          comment.user_id === input.user_id &&
          comment.content_id === input.content_id &&
          comment.user_comment === input.user_comment
        ) {
          userId = comment.user_id;
          contentId = comment.content_id;
          userComment = comment.user_comment;
        }
      });
    }

    // Assert
    expect(userId).toBe(input.user_id);
    expect(contentId).toBe(input.content_id);
    expect(userComment).toBe(input.user_comment);
  });
  test("Empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";
    // Act
    const result = await commentService.validateInputComment(input as any);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("User can only comment on a content once.", async () => {
    // Arrange
    const input = {
      content_id: "1",
      user_id: "1",
      user_comment: "New Test Comment 1",
    };
    const expected = "COMMENT ALREADY EXISTS";
    // Act
    const result = await commentService.validateInputComment(input);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });

  test("User can get their specific comment", async () => {
    // Arrange
    const input = {
      content_id: "3",
      user_id: "3",
    };
    let expected;
    commentsTable.forEach((item) => {
      if (
        item.user_id === input.user_id &&
        item.content_id === input.content_id
      ) {
        expected = item.user_comment;
      }
    });

    // Act
    const valid = await commentService.validateUserContent(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const result = await commentService.getUserContentComment(input);

    // Assert
    expect(result.user_id).toBe(input.user_id);
    expect(result.content_id).toBe(input.content_id);
  });

  test("validateUserContent with empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";

    // Act
    const result = await commentService.validateUserContent(input as any);

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });

  test("User can get their comments", async () => {
    // Arrange
    const input = {
      user_id: "3",
    };
    let expected: any[] = [];
    commentsTable.forEach((item) => {
      if (item.user_id === input.user_id) {
        expected.push(item.user_comment);
      }
    });

    // Act
    const valid = await commentService.validateId(input.user_id);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const result = await commentService.getUserComments(input.user_id);

    // Assert
    result.forEach((item) => {
      expect(item.user_id).toBe(input.user_id);
    });
    expect(result.length).toBe(expected.length);
  });

  test("validateId with empty input", async () => {
    // Arrange
    const input = "";
    const expected = "INPUT IS NULL";

    // Act
    const result = await commentService.validateId(input);

    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });

  test("Content can get their comments", async () => {
    // Arrange
    const input = {
      content_id: "3",
    };
    let expected: any[] = [];
    commentsTable.forEach((item) => {
      if (item.content_id === input.content_id) {
        expected.push(item.user_comment);
      }
    });

    // Act
    const valid = await commentService.validateId(input.content_id);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const result = await commentService.getContentComments(input.content_id);

    // Assert
    result.forEach((item) => {
      expect(item.content_id).toBe(input.content_id);
    });
    expect(result.length).toBe(expected.length);
  });

  test("User can update their comments", async () => {
    // Arrange
    const input = {
      content_id: "3",
      user_id: "3",
      user_comment: "Update Test Comment 3",
    };
    // Act
    const valid = await commentService.validateUpdateComment(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const process = await commentService.updateComment(input);

    const result = await commentService.getUserComments(input.user_id);

    let userId: string = "";
    let contentId: string = "";
    let userComment: string = "";

    if (result) {
      result.forEach((comment) => {
        if (
          comment.user_id === input.user_id &&
          comment.content_id === input.content_id &&
          comment.user_comment === input.user_comment
        ) {
          userId = comment.user_id;
          contentId = comment.content_id;
          userComment = comment.user_comment;
        }
      });
    }
    // Assert
    expect(userId).toBe(input.user_id);
    expect(contentId).toBe(input.content_id);
    expect(userComment).toBe(input.user_comment);
  });
  test("Empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";
    // Act
    const result = await commentService.validateUpdateComment(input as any);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("User can only update their own comments", async () => {
    // Arrange
    const input = {
      content_id: "3",
      user_id: "1",
      user_comment: "Update Test Comment 3",
    };
    const expected = "USER DOES NOT OWN COMMENT";
    // Act
    const result = await commentService.validateUpdateComment(input);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("User can delete their comments", async () => {
    // Arrange
    const input = {
      content_id: "3",
      user_id: "3",
    };
    // Act
    const valid = await commentService.validateDeleteComment(input);
    if (!valid.isValid) {
      expect(true).toBe(false);
      return;
    }

    const process = await commentService.deleteComment(input);

    const result = await commentService.getUserComments(input.user_id);

    let userId: any = undefined;
    let contentId: any = undefined;

    if (result) {
      result.forEach((comment) => {
        if (
          comment.user_id === input.user_id &&
          comment.content_id === input.content_id
        ) {
          userId = comment.user_id;
          contentId = comment.content_id;
        }
      });
    }
    // Assert
    expect(userId).toBe(undefined);
    expect(contentId).toBe(undefined);
  });
  test("User cannot delete other user comments", async () => {
    // Arrange
    const input = {
      content_id: "3",
      user_id: "1",
    };
    const expected = "USER DOES NOT OWN COMMENT";
    // Act
    const result = await commentService.validateDeleteComment(input);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
  test("Empty input", async () => {
    // Arrange
    const input = {};
    const expected = "INPUTS ARE NULL";
    // Act
    const result = await commentService.validateDeleteComment(input as any);
    // Assert
    expect(result.isValid).toBe(false);
    expect(result.errors.find((error) => error === expected)).toBe(expected);
  });
});
