import { useState } from 'react';
import { useForm } from 'react-hook-form';

function AddPostForm({ addPost }) {

  const { register, handleSubmit, reset } = useForm();
  const [postAdded, setPostAdded] = useState(false);

  const onSubmit = (data) => {
    if (!data.title.trim() || !data.body.trim()) {
      alert('Заполните все поля!');
      return;
    }

    const newPost = {
      id: Date.now(),  // Сдесь генерим уникальный ID
      title: data.title,
      body: data.body,
    };

    addPost(newPost);
    reset();
    setPostAdded(true);
    setTimeout(() => setPostAdded(false), 2000);

  };

  return (
    <div>
      {postAdded && <p>Пост Добавлен!</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-3">
        <input
          type="text"
          placeholder='Заголовок'
          {...register('title')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <textarea
          placeholder='Текст'
          {...register('body')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Добавить пост
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-md transition"
          >
            Очистить форму
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddPostForm;