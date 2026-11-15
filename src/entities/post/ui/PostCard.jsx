import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@/shared/ui/Modal';

function PostCard({ post, onDelete }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirm = () => {
    onDelete(post.id);
    setIsConfirmOpen(false);
  };

  return (
    <li className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 hover:shadow-md transition bg-white dark:bg-gray-800">
      <Link className="block" to={`/posts/${post.id}`}>
        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          {post.title}
        </h3>
      </Link>
      <p className="text-gray-700 dark:text-gray-300 mt-1">{post.body}</p>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="mt-3 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
      >
        Удалить
      </button>
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Удалить пост?
        </h4>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Пост «{post.title}» будет удалён.
        </p>
        <div className="mt-2 text-gray-700 dark:text-gray-300">
          <button
            onClick={() => setIsConfirmOpen(false)}
            className="px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-md text-sm transition"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition"
          >
            Удалить
          </button>
        </div>
      </Modal>
    </li>
  );
}

export default memo(PostCard);