import { create } from "zustand";
import { fetchPosts as apiFetchPosts, fetchPostById as apiFetchPostById } from '@/entities/post/model/postApi';
import { setItem, getItem, STORAGE_KEYS } from '@/shared/lib/storage';

const syncWithLocalStorage = (posts) => {
  if (!Array.isArray(posts)) {
    console.error('❌ syncWithLocalStorage ожидает массив, получен:', posts);
    return; // ничего не сохраняем, чтобы не испортить кеш
  }

  setItem(STORAGE_KEYS.POSTS, posts);
  posts.forEach(post => {
    setItem(STORAGE_KEYS.POST_BY_ID(post.id), post);
    setItem(STORAGE_KEYS.COMMENTS_BY_POST(post.id), getItem(STORAGE_KEYS.COMMENTS_BY_POST(post.id)) || []);
  });
};

export const usePostStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  cacheVersion: 0,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const cached = getItem(STORAGE_KEYS.POSTS);
      if (cached) {
        set({ posts: cached, loading: false });
        return;
      }
      const data = await apiFetchPosts();
      set({ posts: data, loading: false });
      syncWithLocalStorage(data);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPostById: async (id) => {
    try {
      const cached = getItem(STORAGE_KEYS.POST_BY_ID(id));
      if (cached) return cached;

      const existing = get().posts.find(p => p.id === id);
      if (existing) {
        setItem(STORAGE_KEYS.POST_BY_ID(id), existing);
        return existing;
      }

      const data = await apiFetchPostById(id);

      setItem(STORAGE_KEYS.POST_BY_ID(id), data);
      set((state) => {
        if (!state.posts.some(p => p.id === id)) {
          return { posts: [...state.posts, data] };
        }
        return state;
      });
      return data;

    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  addPost: (newPost) => {
    set((state) => {
      const updatedPosts = [newPost, ...state.posts];
      syncWithLocalStorage(updatedPosts);
      return { posts: updatedPosts };
    });
  },

  deletePost: (postId) => {
    set((state) => {
      const updatedPosts = state.posts.filter(post => post.id !== postId);
      syncWithLocalStorage(updatedPosts);
      return { posts: updatedPosts };
    });
  },

  clearCache: () => {
    const currentState = get();
    const keys = [
      STORAGE_KEYS.POSTS,
      ...currentState.posts.map(post => STORAGE_KEYS.POST_BY_ID(post.id)),
      ...currentState.posts.map(post => STORAGE_KEYS.COMMENTS_BY_POST(post.id)),
    ];
    keys.forEach(key => localStorage.removeItem(key));

    const commentKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('comments_post_')) {
        commentKeys.push(key);
      }
    }
    commentKeys.forEach(key => localStorage.removeItem(key));
    
    set({ posts: [], cacheVersion: get().cacheVersion + 1 });
  },

  getPostById: (id) => {
    const cached = getItem(STORAGE_KEYS.POST_BY_ID(id));
    if (cached) return cached;
    const post = get().posts.find(p => p.id === id);
    if (post) {
      setItem(STORAGE_KEYS.POST_BY_ID(id), post);
      return post;
    }
    return null;
  },
}));