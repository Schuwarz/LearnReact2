import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById } from '@/entities/post/model/postApi';
import { fetchCommentsByPostId } from '@/entities/comment/model/commentApi'
import CommentList from '@/entities/comment/ui/commentList';

function PostPage() {
  const { id } = useParams(); // получаем id из URL
  const [post, setPost] = useState(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorComments, setErrorComments] = useState(null);
  const navigate = useNavigate();

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
      <h2>{post.title}</h2>
      <p>{post.body}</p>

      {loadingComments && <p>Загрузка комментариев...</p>}
      {errorComments && <p>Ошибка комментариев: {errorComments}</p>}
      {!loadingComments && !errorComments && (<CommentList comments={comments} />)}
    </>
  );
}

export default PostPage;