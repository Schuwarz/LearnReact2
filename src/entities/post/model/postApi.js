import { STORAGE_KEYS, getItem, setItem } from "@/shared/lib/storage";
import { instance } from "@/shared/api/axiosInstance";

export async function fetchPosts() {
  const cached = getItem(STORAGE_KEYS.POSTS);
  if (cached) return cached;

  const res = await instance.get('/posts');
  const data = res.data;

  setItem(STORAGE_KEYS.POSTS, data);
  return data;
}

export async function fetchPostById(id) {
  const cacheKey = STORAGE_KEYS.POST_BY_ID(id);
  const cached = getItem(cacheKey);
  if (cached) return cached;

  const res = await instance.get(`/posts/${id}`);
  const data = await res.data;
  
  setItem(cacheKey, data);
  return data;
}