import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById } from '@/entities/post/model/postApi';
import { fetchCommentsByPostId } from '@/entities/comment/model/commentApi'
import CommentList from '@/entities/comment/ui/CommentList';
import AddCommentForm from '@/features/add-comment/ui/AddCommentForm'
import { setItem, STORAGE_KEYS, removePostFromCache } from '@/shared/lib/storage';

function PostPage() {
  const { id } = useParams(); // получаем id из URL
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();

  const toggleComments = () => {
    setShowComments(prev => !prev);
  }

  const addComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    const cacheKey = STORAGE_KEYS.COMMENTS_BY_POST(id);
    setItem(cacheKey, updatedComments);
  }

  const handlerDeletePost = () => {
    if (window.confirm('Удалить этот пост?')) {
      removePostFromCache(Number(id));
      navigate('/');
    }
  };

  const handlerDeleteComment = (commentId) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);
    const cacheKey = STORAGE_KEYS.COMMENTS_BY_POST(id);
    setItem(cacheKey, updatedComments);
  }

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        setErrorPost(err.message);
      } finally {
        setLoadingPost(false);
      }
    };

    const loadComment = async () => {
      setLoadingComments(true);
      try {
        const data = await fetchCommentsByPostId(id);
        setComments(data);
      } catch (err) {
        setErrorComments(err.message);
      } finally {
        setLoadingComments(false);
      }
    };

    loadPost();
    loadComment();
  }, [id]);

  if (loadingPost) return <p>Загрузка...</p>;
  if (errorPost) return <p>Ошибка: {errorPost}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition"
        >
          ← Назад
        </button>
        <button
          onClick={handlerDeletePost}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Удалить пост
        </button>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-3">{post.title}</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{post.body}</p>

      <button
        onClick={toggleComments}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition mb-4"
      >
        {(showComments) ? 'Скрыть' : 'Показать'}
      </button>

      {showComments && (
        <>
          {loadingComments && <p>Загрузка комментариев...</p>}
          {errorComments && <p>Ошибка комментариев: {errorComments}</p>}
          {!loadingComments && !errorComments && (
            <>
              <CommentList comments={comments} onDeleteComment={handlerDeleteComment} />
              <AddCommentForm postId={id} onAddComment={addComment} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PostPage;