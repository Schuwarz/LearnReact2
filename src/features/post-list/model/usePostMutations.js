import { useMutation } from "@tanstack/react-query";
import { instance } from "@/shared/api/axiosInstance";
import { queryClient } from "@/shared/lib/query/queryClient";
import { POSTS_QUERY_KEY } from "./usePosts";

export function useAddPost() {
  return useMutation({
    mutationFn: async (newPost) => {
      const res = await instance.post('/posts', newPost);
      return res.data;
    },
    onSuccess: (data, newPost) => {
      queryClient.setQueryData(POSTS_QUERY_KEY, (oldData) => [newPost, ...oldData]);
    },
    onError: () => console.log('Ошибка мутации query'),
  });
}

export function useDeletePost() {
  return useMutation({
    mutationFn: async (id) => {
      await instance.delete(`/posts/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(POSTS_QUERY_KEY, (oldData) => oldData.filter(post => post.id !== id))
    },
    onError: () => console.log('Ошибка мутации query'),
  });
}