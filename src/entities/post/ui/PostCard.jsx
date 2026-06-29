import { Link } from 'react-router-dom';

function PostCard({ post, onDelete }) {
  return (
    <li style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <Link to={`/posts/${post.id}`}>
        <strong>{post.title}</strong>
      </Link>
      <p>{post.body}</p>
      <button onClick={() => onDelete(post.id)}>Удалить</button>
    </li>
  );
}

export default PostCard;