import { memo } from "react";

function CommentItem({ comment, onDelete }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3 bg-white dark:bg-gray-800 hover:shadow-sm transition">
      <div className="flex justify-between items-start gap-2 flex-wrap">
        <div>
          <strong className="text-gray-900 dark:text-gray-100">{comment.name}</strong>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">— {comment.email}</span>
        </div>
        <button
          onClick={() => onDelete(comment.id)}
          className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 text-sm transition"
        >
          Удалить
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{comment.body}</p>
    </div>
  );
}

export default memo(CommentItem);