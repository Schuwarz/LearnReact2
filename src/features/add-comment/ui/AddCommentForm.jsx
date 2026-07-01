import { useState } from "react";

function AddCommentForm({ postId, onAddComment }) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !name.trim() || !email.trim()) {
      alert('Заполните все поля!');
      return;
    }

    const newComment = {
      id: Date.now(),  // Генерим id
      postId: Number(postId),
      name: name.trim(),
      email: email.trim(),
      body: text.trim(),
    };

    onAddComment(newComment);
    setText('');
    setName('');
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:bprder-gray-700 mt-6 space-y-3"
    >
      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Добавить комментарий</h4>

      <input
        type="text"
        placeholder='Имя'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full px-4 py-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      <input
        type='email'
        placeholder='Почта'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      <textarea
        rows={3}
        placeholder="Напишите комментарий..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      <button
        type="submit"
        className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
      >
        Отправить
      </button>
    </form>
  );
}

export default AddCommentForm;