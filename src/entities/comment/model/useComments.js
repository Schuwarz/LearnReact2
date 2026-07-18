import { useQuery } from '@tanstack/react-query';
import { fetchCommentsByPostId } from '@/entities/comment/model/commentApi.js'

export function useComments(postId) {
  const { data = [], isLoading, error, isError } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(postId),
  });

  return { data, isLoading, error, isError };
}
