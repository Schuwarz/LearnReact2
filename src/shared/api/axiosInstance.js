import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Произошла неизвестная ошибка';

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 400: message = 'Некорректный запрос';
          break;
        case 401: message = 'Не авторизован';
          break;
        case 403: message = 'Доступ запрещён';
          break;
        case 404: message = 'Запрашиваемые данные не найдены';
          break;
        case 500: message = 'Ошибка сервера, попробуйте позже';
          break;
        default: message = `Ошибка сервера (${status})`;
      }
    } else if (error.request) {
      message = 'Проверьте соединение с интернетом';
    } else {
      message = error.message || message;
    }

    throw new Error(message);
  },
);