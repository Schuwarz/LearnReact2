import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/entities/post/model/postApi'

export function usePostById(id) {
  const { data: postById = null, isLoading, error, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
  });

  return { postById, isLoading, error, isError };
}

