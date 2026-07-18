import { instance } from "@/shared/api/axiosInstance";

export async function fetchPosts() {
  const res = await instance.get('/posts');
  const data = res.data;
  return data;
}

export async function fetchPostById(id) {
  const res = await instance.get(`/posts/${id}`);
  const data = await res.data;
  return data;
}