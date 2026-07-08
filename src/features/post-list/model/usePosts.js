import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/entities/post/model/postApi"

export function usePosts() {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return { data, isLoading, error, isError };
}