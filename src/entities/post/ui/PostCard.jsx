import { memo } from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post, onDelete }) {
  return (
    <li className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 hover:shadow-md transition bg-white dark:bg-gray-800">
      <Link className="block" to={`/posts/${post.id}`}>
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-700 dark:text-gray-300 mt-1">{post.body}</p>
      <button
        onClick={() => onDelete(post.id)}
        className="mt-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
      >
        Удалить
      </button>
    </li>
  );
}

export default memo(PostCard);