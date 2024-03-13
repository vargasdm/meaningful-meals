import { v4 as uuid } from "uuid";

let contentTable = [
  {
    content_id: "content_id_1",
    content: "Random Content 1",
  },
  {
    content_id: "content_id_2",
    content: "Random Content 2",
  },
  {
    content_id: "content_id_3",
    content: "Random Content 3",
  },
];

let likesTable = [
  { like_id: "1", content_id: "content_id_1", user_id: "test_user_id_1" },
  { like_id: "2", content_id: "content_id_2", user_id: "test_user_id_2" },
  { like_id: "3", content_id: "content_id_3", user_id: "test_user_id_3" },
];

let commentsTable = [
  {
    comment_id: "1",
    content_id: "content_id_1",
    user_id: "test_user_id_1",
    comment: "Test Comment 1",
  },
  {
    comment_id: "2",
    content_id: "content_id_2",
    user_id: "test_user_id_2",
    comment: "Test Comment 2",
  },
  {
    comment_id: "3",
    content_id: "content_id_3",
    user_id: "test_user_id_3",
    comment: "Test Comment 3",
  },
];

const mockPostLike = jest.fn((item) => {
  try {
    likesTable.push(item);
    return item;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});
const mockDeleteLike = jest.fn((likeId) => {
  try {
    let temp: any = [];
    likesTable.forEach((like) => {
      if (like.like_id != likeId) {
        temp.push(like);
      }
    });
    likesTable = temp;
    return `Like delted`;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});

const mockPostComment = jest.fn((item) => {
  try {
    likesTable.push(item);
    return item;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});
const mockDeleteComment = jest.fn((likeId) => {
  try {
    let temp: any = [];
    likesTable.forEach((like) => {
      if (like.like_id != likeId) {
        temp.push(like);
      }
    });
    likesTable = temp;
    return `Like delted`;
  } catch (err) {
    throw new Error(`Unable to post item. Error: ${err}`);
  }

  return null;
});
const mockUpdateComment = jest.fn((item) => {
  try {
    commentsTable.forEach((comment) => {
      if (comment.comment_id == item.comment_id) {
        comment.comment = item.comment;
      }
    });
  } catch (error) {
    throw new Error(`Unable to update item. Error: ${error}`);
  }
});

const socialMediaService = SocialMediaService({
  postLike: mockPostLike,
  deleteLike: mockDeleteLike,
  postComment: mockPostComment,
  deleteComment: mockDeleteComment,
  updateComment: mockUpdateComment,
});

/**
 * likes
 *
 *  Tests:
 *      - User can like content
 *      - User can only like valid content id's
 *      - User can delete their likes
 *      - User cannot delete other user's likes
 *
 *
 */

describe("Likes Test", () => {
  test("User can like content", async () => {
    // Arrange
    const input = { user_id: "test_user_id_1", content_id: "content_id_1" };
    const expected = "User liked content";
    // Act
    const result = socialMediaService.postLike(input);
    // Assert
    expect(result).toBe(expected);
  });
  test("User can only like valid content id's", async () => {
    // Arrange
    const input = { user_id: "test_user_id_1", content_id: "Not Valid" };
    // Act
    const result = socialMediaService.postLike(input);
    // Assert
    expect(result).toBeNull();
  });
  test("User can delete their likes", async () => {
    // Arrange
    const input = { user_id: "test_user_id_3", like_id: 3 };
    const expected = "User liked content";
    // Act
    const result = socialMediaService.deleteLike(input);
    // Assert
    expect(result).toBe(expected);
  });
  test("User cannot delete other user's likes", async () => {
    // Arrange
    const input = { user_id: "test_user_id_1", like_id: 2 };
    // Act
    const result = socialMediaService.deleteLike(input);
    // Assert
    expect(result).toBeNull();
  });
});

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
 */
describe("Comments Test", () => {
  test("User can create a comment", async () => {
    // Arrange
    const input = {
      content_id: "content_id_1",
      user_id: "test_user_id_1",
      comment: "New Test Comment 1",
    };
    const expected = "User liked content";
    // Act
    const result = socialMediaService.postComment(input);
    // Assert
    expect(result).toBe(expected);
  });
  test("User can only comment on valid content id's", async () => {
    // Arrange
    const input = {
      content_id: "Not Valid",
      user_id: "test_user_id_1",
      comment: "New Test Comment 1",
    };
    // Act
    const result = socialMediaService.postLike(input);
    // Assert
    expect(result).toBeNull();
  });
  test("User can update their comments", async () => {
    // Arrange
    const input = {
      comment_id: "3",
      user_id: "test_user_id_3",
      comment: "Update Test Comment 3",
    };
    const expected = "User updated content";
    // Act
    const result = socialMediaService.updateComment(input);
    // Assert
    expect(result).toBe(expected);
  });
  test("User can only update their own comments", async () => {
    // Arrange
    const input = {
      comment_id: "3",
      user_id: "test_user_id_1",
      comment: "Update Test Comment 3",
    };
    // Act
    const result = socialMediaService.updateComment(input);
    // Assert
    expect(result).toBeNull();
  });
  test("User can delete their comments", async () => {
    // Arrange
    const input = {
      comment_id: "3",
      user_id: "test_user_id_3",
    };
    const expected = "User updated content";
    // Act
    const result = socialMediaService.deleteComment(input);
    // Assert
    expect(result).toBe(expected);
  });
  test("User cannot delete other user comments", async () => {
    // Arrange
    const input = {
      comment_id: "3",
      user_id: "test_user_id_1",
    };
    // Act
    const result = socialMediaService.deleteComment(input);
    // Assert
    expect(result).toBeNull();
  });
});
