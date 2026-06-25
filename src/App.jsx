import { Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostDetails from './PostDetails';
import HelloReact from "./HelloReact.jsx";

function App() {
  return (
    <div>
      <HelloReact />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </div>
  );
}

export default App;
