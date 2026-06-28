import { useState } from "react";

function AddCommentForm({ postId, onAddComment }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Введите текст комментария');
      return;
    }

    const newComment = {
      id: Date.now(),  // Генерим id
      postId: Number(postId),
      name: 'Anonymous',
      email: 'pochta@pizda.ru',
      body: text.trim(),
    };

    onAddComment(newComment);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        rows="3"
        placeholder="Напишите комментарий..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default AddCommentForm;