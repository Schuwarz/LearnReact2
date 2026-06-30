import { useState, useEffect } from 'react';
import { usePosts } from '@/features/post-list/model/usePosts';
import AddPostForm from '@/features/add-post/ui/AddPostForm';
import PostCard from '@/entities/post/ui/PostCard';
import './HomePage.css';
import { clearAllPostsCache, setItem, STORAGE_KEYS } from '@/shared/lib/storage';
import { removePostFromCache, removePostFromListCache } from '@/shared/lib/storage';
import { usePagination } from '@/features/post-list/model/usePagination';

function HomePage() {
  const { posts, loading, error, setPosts } = usePosts();
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('id');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortType === 'id') return a.id - b.id
    if (sortType === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const { currentPage, totalPages, limit, setLimit, nextPage, prevPage, getCurrentItems, goToPage } =
    usePagination(sortedPosts.length);

  const currentPosts = getCurrentItems(sortedPosts);

  useEffect(() => {
    goToPage(1);
  }, [search, sortType]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const handlerDeletePost = (postId) => {
    const updatedPosts = removePostFromListCache(postId, posts);
    setPosts(updatedPosts);
    removePostFromCache(postId);
  }

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
    setItem(STORAGE_KEYS.POST_BY_ID(newPost.id), newPost);
    setItem(STORAGE_KEYS.COMMENTS_BY_POST(newPost.id), []);  // [] - пустой массив комментариев
    goToPage(1);
  };

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

      <div style={{ marginTop: '10px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>Назад</button>
        <span style={{ margin: '0 10px' }}>Страница {currentPage} из {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Вперед</button>
        <span style={{ marginLeft: '20px' }}>
          <label>
            Показывать:
            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </span>
      </div>

      <ul>
        {currentPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handlerDeletePost} />
        ))}
      </ul>
    </>
  );
}

export default HomePage;