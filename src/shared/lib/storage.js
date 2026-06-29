const STORAGE_KEYS = {
  POSTS: 'posts',
  POST_BY_ID: (id) => `post_${id}`,
  COMMENTS_BY_POST: (id) => `comments_post_${id}`,
};

export function getItem(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Ошибка записи в localStorage:', e);
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    console.warn('Ошибка удаления из localStorage:', e);
  }
}

export function clearAllPostsCache() {
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith('post_') || key === 'posts' || key.startsWith('comments_post_'))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => removeItem(key));
}

export function removePostFromCache(postId) {
  removeItem(STORAGE_KEYS.POST_BY_ID(postId));
  removeItem(STORAGE_KEYS.COMMENTS_BY_POST(postId));
}

export function removePostFromListCache(postId, currentPosts) {
  const updatedPosts = currentPosts.filter(post => post.id !== postId);
  setItem(STORAGE_KEYS.POSTS, updatedPosts);
  return updatedPosts;
}

export { STORAGE_KEYS }