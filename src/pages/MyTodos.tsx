import { gql, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Button, InputField, TodoList } from '../components';
import { useCreateTodo } from '../hooks';

const validationSchema = Yup.object({
  content: Yup.string().trim('Todo must not be empty').required('Todo must not be empty')
});

export function MyTodos() {
  const { loading: todosLoading, data } = useQuery(gql`
    query GetTodos {
      userTodos {
        id
        content
        status
      }
    }
  `);
  const { onCreateTodo, loading, errorMsg } = useCreateTodo();

  const [searchTxt, setsearchTxt] = useState('');

  const formik = useFormik({
    initialValues: {
      content: ''
    },
    validationSchema,
    async onSubmit(values) {
      await onCreateTodo(values.content);
      formik.resetForm();
    }
  });

  const getTodos = () => {
    if (!data) return [];
    if (searchTxt.trim() === '') return data.userTodos;
    return data.userTodos.filter((todo: Todo) => todo.content.startsWith(searchTxt));
  };

  return (
    <div className="px-4">
      <h1 className="font-bold mb-2">My Todos</h1>
      <p className="mb-2 text-red-600">{errorMsg}</p>
      <div className="mb-2">
        <InputField
          name="content"
          placeholder="Create a todo..."
          onChange={formik.handleChange}
          type="text"
          value={formik.values.content}
          error={formik.touched.content ? formik.errors.content : null}
        />

        <div className="flex flex-row items-center">
          <input
            type="search"
            value={searchTxt}
            onChange={(e) => setsearchTxt(e.target.value)}
            className="w-full rounded-xl focus:border-none focus:outline-none bg-gray-100 h-10 px-3"
            placeholder="Search todos..."
          />

          <Button
            type="button"
            title="Search"
            className="bg-gray-100 ml-2"
            onClick={() => {
              console.log('Search todo');
            }}
            disabled={loading}
          />
          <Button
            type="submit"
            title="Create"
            className=" bg-pink-600 text-white ml-2"
            onClick={() => {
              formik.submitForm();
            }}
            disabled={loading}
          />
        </div>
      </div>

      <TodoList loading={todosLoading} todos={getTodos()} />
    </div>
  );
}
