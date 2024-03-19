import React, { useState } from 'react';

function CommentForm() {
  const [comment, setComment] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting normally
    console.log(comment)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="commentInput">Your Comment:</label>
      <textarea
        id="commentInput"
        value={comment}
        onChange={handleInputChange}
        rows={5} // Adjust the number of rows as needed
        cols={50} // Adjust the number of columns as needed
      />
      <button type="submit">Submit</button>
    </form>
 );
}

export default CommentForm
