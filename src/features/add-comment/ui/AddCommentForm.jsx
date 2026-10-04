import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const commentSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя'),
  email: z.string().trim().min(1, 'Введите почту').email('Введите корректную почту'),
  body: z.string().trim().min(1, 'Введите комментарий'),
});

function AddCommentForm({ postId, onAddComment }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const nameInputRef = useRef(null);
  const { ref: nameRef, ...nameField } = register('name');

  const onSubmit = (data) => {
    const newComment = {
      id: Date.now(),  // Генерим id
      postId: Number(postId),
      name: data.name,
      email: data.email,
      body: data.body,
    };

    onAddComment(newComment);
    reset();
  };

  useEffect(() => {
    nameInputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mt-6 space-y-3"
    >
      <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">Добавить комментарий</h4>

      <input
        {...nameField}
        ref={(e) => {
          nameRef(e);
          nameInputRef.current = e;
        }}
        type='text'
        placeholder='Имя'
        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <input
        {...register('email')}
        type='email'
        placeholder='Почта'
        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      <textarea
        {...register('body')}
        rows={3}
        placeholder="Напишите комментарий..."
        className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
      />
      {errors.body && <p className="text-sm text-red-500">{errors.body.message}</p>}

      <button
        type="submit"
        className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
      >
        Отправить
      </button>
    </form>
  );
}

export default AddCommentForm;