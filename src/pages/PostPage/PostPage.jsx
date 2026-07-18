import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from '@/entities/comment/ui/CommentList';
import AddCommentForm from '@/features/add-comment/ui/AddCommentForm'
import { fetchCommentsByPostId } from '@/entities/comment/model/commentApi'
import { useComments } from '@/entities/comment/model/useComments';
import { usePostById } from '@/features/post-details/model/usePostById';
import { useAddComment, useDeleteComment } from '@/features/add-comment/model/useCommentMutation';
import { useDeletePost } from '@/features/post-list/model/usePostMutations'


function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);

  const { postById: post, isLoading: postIsLoading, error: postError, isError: postIsError } = usePostById(postId);
  const { data: comments, isLoading: commentIsLoading, error: commentError, isError: commentIsError } = useComments(postId);

  const addCommentMutation = useAddComment(postId);
  const deleteCommentMutation = useDeleteComment(postId);
  const deletePostMutation = useDeletePost(postId);

  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  const handlerAddComment = useCallback((newComment) => {
    addCommentMutation.mutate(newComment);
  }, [addCommentMutation]);

  const handlerDeleteComment = useCallback((commentId) => {
    deleteCommentMutation.mutate(commentId);
  }, [deleteCommentMutation]);

  const handlerDeletePost = useCallback(() => {
    if (window.confirm('Удалить этот пост?')) {
      deletePostMutation.mutate(postId);
      navigate('/');
    }
  }, [deletePostMutation, postId, navigate]);

  if (postIsLoading) return <p className='text-center text-gray-500 dark:text-gray-400'>Загрузка...</p>;
  if (postIsError) return <p className='text-center text-red-500'>Ошибка: {postError.message}</p>;
  if (!post) return <p className='text-center text-gray-500 dark:text-gray-400'>Пост не найден</p>;

  return (
    <div>
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
          {commentIsLoading && (
            <p className='text-gray-500 dark:text-gray-400 mt-4'>Загрузка комментариев...</p>
          )}
          {commentIsError && (
            <p className='text-red-500 mt-4'>Ошибка комментариев: {commentError.message}</p>
          )}
          {!commentIsLoading && !commentIsError && (
            <>
              <CommentList comments={comments} onDeleteComment={handlerDeleteComment} />
              <AddCommentForm postId={id} onAddComment={handlerAddComment} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default PostPage;