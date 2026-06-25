import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('id'); // id or title
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [postAdded, setPostAdded] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  useEffect(() => {
    if (postAdded) {
      const timer = setTimeout(() => {
        setPostAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [postAdded])

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы

    if (!newTitle.trim() || !newBody.trim()) {
      alert('Заполните оба поля!');
      return;
    }

    const newPost = {
      id: Date.now(),  // Сдесь генерим уникальный ID
      title: newTitle,
      body: newBody,
    };

    setPosts([...posts, newPost]);

    setNewTitle('');
    setNewBody('');
    setPostAdded(true);
  };

  function handleReset() {
    setSearch('');
    setSortType('id');
  }

  function handleClear() {
    setNewTitle('');
    setNewBody('');
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;


  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'id') return a.id - b.id
    if (sortType === 'title') return a.title.localeCompare(b.title)
  })


  return (
    <>

      {postAdded && <p>Пост Добавлен!</p>}

      <input
        type="text"
        placeholder='Поиск по заголовку...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='button__wrap'>
        <button onClick={() => setSortType('title')}>A-Z</button>
        <button onClick={() => setSortType('id')}>ID</button>
        <button onClick={handleReset}>СБРОС</button>
      </div>

      <div className='form__wrap'>
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
  
          <button type="button" onClick={handleClear}>Очистить форму</button>
        </form>
      </div>

      <ul>
        {sortedPosts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <strong>{post.title}</strong>
            </Link>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default PostList;
