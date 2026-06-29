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
      <button onClick={() => navigate(-1)}>← Назад</button>
      <button onClick={() => navigate('/')}>На главную</button>
      <button onClick={handlerDeletePost}>Удалить пост</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={toggleComments}>
        {(showComments) ? 'Скрыть' : 'Показать'}
      </button>

      {showComments && (
        <>
          {loadingComments && <p>Загрузка комментариев...</p>}
          {errorComments && <p>Ошибка комментариев: {errorComments}</p>}
          {!loadingComments && !errorComments && (
            <>
              <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
              <AddCommentForm postId={id} onAddComment={addComment} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default PostPage;