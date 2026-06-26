import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById } from '@/entities/post/model/postApi';

function PostPage() {
  const { id } = useParams(); // получаем id из URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!post) return <p>Пост не найден</p>;

  return (
    <>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <button onClick={() => navigate('/')}>На главную</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
}

export default PostPage;