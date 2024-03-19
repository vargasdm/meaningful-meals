import React, { useState } from 'react';

type cfProps = {handleSubmit: any}
function CommentForm(prop: cfProps) {
  const [comment, setComment] = useState('')

  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={prop.handleSubmit}>
      <label htmlFor="commentInput">Your Comment:</label>
      <textarea
        id="commentInput"
        value={comment}
        onChange={handleInputChange}
        rows={5}
        cols={50}
        
      />
      <button type="submit">Submit</button>
    </form>
 );
}

export default CommentForm
