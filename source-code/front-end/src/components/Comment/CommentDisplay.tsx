import React from 'react';

  type cdProps = {username: string, comment: string}
 function CommentDisplay(props:cdProps) {
  return (
    <div>
      <p>{props.username}</p>
      <p>{props.comment}</p>
    </div>
 );
};

export default CommentDisplay
