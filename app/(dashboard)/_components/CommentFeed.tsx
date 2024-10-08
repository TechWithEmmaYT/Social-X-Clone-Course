import React from "react";
import CommentItem from "./_common/CommentItem";

interface PropsType {
  comments: CommentType[];
}

const CommentFeed: React.FC<PropsType> = ({ comments }) => {
  return (
    <div>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentFeed;
