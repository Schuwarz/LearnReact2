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
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder='Имя'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='form__input'
      />
      <input
        type='email'
        placeholder='Почта'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='form__input'
      />
      <textarea
        rows="3"
        placeholder="Напишите комментарий..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='form__input'
      />
      <button type="submit">Отправить</button>
    </form>
  );
}

export default AddCommentForm;