import { STORAGE_KEYS, getItem, setItem } from '@/shared/lib/storage'

export async function fetchCommentsByPostId(postId) {
  const cacheKey = STORAGE_KEYS.COMMENTS_BY_POST(postId);
  const cached = getItem(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Ошибка загрузки комментариев');
  const data = await res.json();
  setItem(cacheKey, data);
  return data;
}