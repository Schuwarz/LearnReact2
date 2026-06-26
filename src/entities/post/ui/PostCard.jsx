import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <li>
      <Link to={`/posts/${post.id}`}>
        <strong>{post.title}</strong>
      </Link>
      <p>{post.body}</p>
    </li>
  );
}

export default PostCard;