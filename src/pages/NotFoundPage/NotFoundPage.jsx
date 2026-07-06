import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</h1>
      <p className="text-xl mt-4">Страница не найдена</p>
      <Link
        to="/"
        className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        На главную
      </Link>
    </div>
  );
}

export default NotFoundPage;