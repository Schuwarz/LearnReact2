import { STORAGE_KEYS, getItem, setItem } from "@/shared/lib/storage";

export async function fetchPosts() {
  const cached = getItem(STORAGE_KEYS.POSTS);
  if (cached) return cached;

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Ошибка загрузки');
  const data = await res.json();
  setItem(STORAGE_KEYS.POSTS, data);
  return data;
}

export async function fetchPostById(id) {
  const cacheKey = STORAGE_KEYS.POST_BY_ID(id);
  const cached = getItem(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Пост не найден');
  const data = await res.json();
  setItem(cacheKey, data);
  return data;
}