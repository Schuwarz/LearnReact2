import { useMutation } from "@tanstack/react-query";
import { instance } from "@/shared/api/axiosInstance";
import { queryClient } from "@/shared/lib/query/queryClient";

export function useAddComment(postId) {
  return useMutation({
    mutationFn: async (newComment) => {
      const res = await instance.post(`/posts/${postId}/comments`, newComment);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', postId], (oldData) => {
        return oldData ? [data, ...oldData] : [data];
      });
    },
    onError: (error) => {
      console.error('Ошибка добавления комментария:', error);
    },
  })
}

export function useDeleteComment(postId) {
  return useMutation({
    mutationFn: async (commentId) => {
      await instance.delete(`/comments/${commentId}`);
      return commentId;
    },
    onSuccess: (data, commentId) => {
      queryClient.setQueryData(['comments', postId], (oldData) => {
        return oldData ? oldData.filter(comment => comment.id !== commentId) : [];
      });
    },
    onError: (error) => {
      console.error('Ошибка удаления комментария:', error);
    },
  });
}