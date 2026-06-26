import { Routes, Route } from 'react-router-dom';
import Layout from '@/app/layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import PostPage from '@/pages/PostPage/PostPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
