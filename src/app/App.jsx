import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from '@/app/layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';

const PostPage = lazy(() => import('@/pages/PostPage/PostPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));


function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center p-8 text-gray-500 dark:text-gray-400">Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
