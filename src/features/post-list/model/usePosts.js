import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/entities/post/model/postApi"

export const POSTS_QUERY_KEY = ['posts'];

export function usePosts() {
  const { data: posts = [], isLoading, error, isError } = useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: fetchPosts,
  });

  return { posts, isLoading, error, isError };
}