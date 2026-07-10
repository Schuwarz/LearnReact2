import { useMutation } from "@tanstack/react-query";
import { instance } from "@/shared/api/axiosInstance";
import { queryClient } from "@/shared/lib/query/queryClient";
import { POSTS_QUERY_KEY } from "./usePosts";

export function useAddPost() {
  return useMutation({
    mutationFn: (newPost) => {
      instance.post('/posts', newPost).then((res) => res.data);
      queryClient.setQueryData(POSTS_QUERY_KEY, (oldData) => [newPost, ...oldData]);
    },
    onSuccess: () => console.log('Успех query'),
    onError: () => console.log('Ошибка query'),
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: (id) => {
      instance.delete(`/posts/${id}`).then((res) => res.data);
      queryClient.setQueryData(POSTS_QUERY_KEY, (oldData) => oldData.filter(post => post.id !== id))
    },
    onSuccess: (data) => { },
    onError: () => { },
  });
}