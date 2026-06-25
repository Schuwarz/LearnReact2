import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetails() {
  const {id} = useParams(); // получаем id из URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('Пост не найден');
        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);


  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!post) return <p>Пост не найден</p>;

    return (
    <>
      <Link to="/">← Назад к списку</Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
}

export default PostDetails;