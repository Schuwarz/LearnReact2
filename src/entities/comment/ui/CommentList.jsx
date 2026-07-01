import CommentItem from "./CommentItem";

function CommentList({ comments, onDeleteComment }) {
  if (comments.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
        Комментариев нет
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Комментарии
      </h3>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDeleteComment}
        />
      ))}
    </div>
  );
}

export default CommentList;