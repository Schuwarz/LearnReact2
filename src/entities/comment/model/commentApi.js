import { STORAGE_KEYS, getItem, setItem } from '@/shared/lib/storage'
import { instance } from '@/shared/api/axiosInstance';

export async function fetchCommentsByPostId(postId) {
  const cacheKey = STORAGE_KEYS.COMMENTS_BY_POST(postId);
  const cached = getItem(cacheKey);
  if (cached) return cached;

  const res = await instance.get(`/posts/${postId}/comments`);
  const data = await res.data;
  
  setItem(cacheKey, data);
  return data;
}