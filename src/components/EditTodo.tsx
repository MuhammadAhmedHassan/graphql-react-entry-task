import { Button, InputField } from '.';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { memo, useEffect } from 'react';

const validationSchema = Yup.object({
  content: Yup.string().trim('Todo must not be empty').required('Todo must not be empty')
});

interface IProps {
  todo: Todo;
  setTodo: (todo: null | Todo) => void;
}

export const EditTodo = memo(({ todo, setTodo }: IProps) => {
  const { onUpdateTodo, loading } = useUpdateTodo();

  const formik = useFormik({
    initialValues: {
      content: todo.content || ''
    },
    validationSchema,
    async onSubmit(values) {
      await onUpdateTodo(todo.id, values.content, todo.status);
      setTodo(null);
    }
  });
  const { setFieldValue, handleChange, handleSubmit } = formik;

  useEffect(() => {
    setFieldValue('content', todo.content);
  }, [setFieldValue, todo.content]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <InputField
          name="content"
          placeholder="Edit todo"
          type="text"
          value={formik.values.content}
          onChange={handleChange}
          error={formik.touched.content ? formik.errors.content : null}
        />

        <Button type="submit" title="Edit" className=" bg-pink-600 text-white" disabled={loading} />
        <Button
          type="button"
          title="Cancel"
          className="  bg-white ml-2"
          disabled={loading}
          onClick={() => setTodo(null)}
        />
      </form>
    </div>
  );
});
