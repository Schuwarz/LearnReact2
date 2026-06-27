import CommentItem from "./CommentItem";

function CommentList({ comments }) {
  if (comment.length === 0) {
    return <p>Комментариев нет</p>;
  }

  return (
    <div>
      <h3>Комментарии</h3>
      {comments.map(comment => <commentItem key={comment.id} comment={comment} />)}
    </div>
  );
}

export default CommentList;