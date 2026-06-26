export async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
}

export async function fetchPostById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error('Пост не найден');
  return res.json();
}