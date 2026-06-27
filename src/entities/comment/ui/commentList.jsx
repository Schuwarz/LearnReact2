import CommentItem from "./CommentItem";

function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p>Комментариев нет</p>;
  }

  return (
    <div>
      <h3>Комментарии</h3>
      {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
    </div>
  );
}

export default CommentList;