import { useState } from 'react';
import { usePosts } from '@/features/post-list/model/usePosts';
import AddPostForm from '@/features/add-post/ui/AddPostForm';
import PostCard from '@/entities/post/ui/PostCard';
import './HomePage.css';
import { clearAllPostsCache, setItem, STORAGE_KEYS } from '@/shared/lib/storage';

function HomePage() {
  const { posts, loading, error, setPosts } = usePosts();
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('id');

  const handleReset = () => {
    setSearch('');
    setSortType('id');
  };

  const handlerClearCache = () => {
    clearAllPostsCache();
    alert('Кеш очищен. Перезагрузите страницу, чтобы получить свежие данные');
  };

  const addPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    setItem(STORAGE_KEYS.POSTS, updatedPosts);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'id') return a.id - b.id
    if (sortType === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      <AddPostForm addPost={addPost} />
      <input
        type="text"
        placeholder='Поиск по заголовку...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='button__wrap'>
        <button onClick={() => setSortType('title')}>A-Z</button>
        <button onClick={() => setSortType('id')}>ID</button>
        <button onClick={handleReset}>Сброс</button>
        <button onClick={handlerClearCache}>Очистить кеш</button>
      </div>
      <ul>
        {sortedPosts.map(post => <PostCard key={post.id} post={post} />)}
      </ul>
    </>
  );
}

export default HomePage;