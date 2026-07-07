import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
});



















// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       throw new Error(`Ошибка ${error.response.status}: ${error.response.data.message || 'Неизвестная ошибка'}`);
//     }
//     throw new Error('Ошибка сети: сервер не отвечает');
//   },
// );