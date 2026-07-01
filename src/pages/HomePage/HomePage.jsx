import { useState, useEffect } from 'react';
import { usePosts } from '@/features/post-list/model/usePosts';
import AddPostForm from '@/features/add-post/ui/AddPostForm';
import PostCard from '@/entities/post/ui/PostCard';
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
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        LoremBook
      </h1>
      <AddPostForm addPost={addPost} />
      <input
        type="text"
        placeholder='Поиск по заголовку...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded-md transition ${sortType === 'title' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          onClick={() => setSortType('title')}
        >
          По названию
        </button>
        <button
          className={`px-3 py-1 rounded-md transition ${sortType === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          onClick={() => setSortType('id')}
        >
          По ID
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Сброс
        </button>
        <button
          onClick={handlerClearCache}
          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
        >
          Очистить кеш
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition"
          >
            Назад
          </button>
          <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition"
          >
            Вперед
          </button>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm">
            Показывать:
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
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