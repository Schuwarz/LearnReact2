import { instance } from '@/shared/api/axiosInstance';

export async function fetchCommentsByPostId(postId) {
  const res = await instance.get(`/posts/${postId}/comments`);
  const data = res.data;
  return data;
}