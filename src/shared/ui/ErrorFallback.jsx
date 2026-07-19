import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-8 text-center">
      <img className="flex m-auto" src="https://media.discordapp.net/attachments/966792698407288862/1208775355121279077/and04.gif?ex=6a5d8186&is=6a5c3006&hm=bca9ebbd2b6f7b924841478854a2bef0b02b0e23e08aa27c720b3d88b894e41e&" alt="pig funny" />
      <h2 className="text-2xl fornt-bold text-red-600">Упс...</h2>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Попробовать снова
      </button>
    </div>
  );
}

export default ErrorFallback;