import { useState } from 'react';

function AddPostForm({ addPost }) {
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [postAdded, setPostAdded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTitle.trim() || !newBody.trim()) {
      alert('Заполните все поля!');
      return;
    }

    const newPost = {
      id: Date.now(),  // Сдесь генерим уникальный ID
      title: newTitle,
      body: newBody,
    };

    addPost(newPost);
    setNewTitle('');
    setNewBody('');
    setPostAdded(true);
    setTimeout(() => setPostAdded(false), 2000);
  };

  return (
    <div className='form__wrap'>
      {postAdded && <p>Пост Добавлен!</p>}
      <form onSubmit={handleSubmit} className='form'>
        <input
          type="text"
          placeholder='Заголовок'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className='form__input'
        />
        <textarea
          placeholder='Текст'
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          rows={3}
          className='form__input'
        />
        <button type="submit">Добавить пост</button>
        <button type="button" onClick={() => { setNewTitle(''); setNewBody(''); }}>
          Очистить форму
        </button>
      </form>
    </div>
  );
}

export default AddPostForm;