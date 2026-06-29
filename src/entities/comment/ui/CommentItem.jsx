function CommentItem({ comment, onDelete }) {
  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '8px 0' }}>
      <strong>{comment.name}</strong> <em>— {comment.email}</em>
      <p>{comment.body}</p>
      <button onClick={() => onDelete(comment.id)}>Удалить</button>
    </div>
  );
}

export default CommentItem;