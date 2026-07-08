import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { usePostStore } from '@/shared/lib/store/postStore';
import { useInput } from '@/shared/lib/dom/useInput'
import { usePagination } from '@/features/post-list/model/usePagination';
import AddPostForm from '@/features/add-post/ui/AddPostForm';
import PostCard from '@/entities/post/ui/PostCard';
import { usePosts } from '@/features/post-list/model/usePosts';

function HomePage() {
  const { posts, loading, error, fetchPosts, addPost, deletePost, clearCache } = usePostStore();
  const search = useInput('');
  const [sortType, setSortType] = useState('id');
  const searchInputRef = useRef(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.value.toLowerCase())
    );
  }, [posts, search.value]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortType === 'id') return a.id - b.id
      if (sortType === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filteredPosts, sortType]);

  const { currentPage, totalPages, limit, setLimit, nextPage, prevPage, getCurrentItems, goToPage } =
    usePagination(sortedPosts.length);
  const currentPosts = getCurrentItems(sortedPosts);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    goToPage(1);
  }, [search.value, sortType]);

  useEffect(() => {
    if (!loading) {
      searchInputRef.current?.focus();
    }
  }, [loading]);

  const handlerDeletePost = useCallback((postId) => {
    deletePost(postId);
  }, [deletePost]);

  const handlerAddPost = useCallback((newPost) => {
    addPost(newPost);
    goToPage(1);
  }, [addPost]);

  const handlerClearCache = useCallback(() => {
    clearCache();
    alert('Кеш очищен');
  }, [clearCache]);

  const handleReset = useCallback(() => {
    search.reset();
    setSortType('id');
  }, [search]);

  if (loading) return <p className="text-center">Загрузка...</p>;
  if (error) return <p className="text-center text-red-500">Ошибка: {error}</p>;

  return (
    <>
      <AddPostForm addPost={handlerAddPost} />
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-3'>
        <input
          ref={searchInputRef}
          type="text"
          placeholder='Поиск по заголовку...'
          value={search.value}
          onChange={search.onChange}
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