import { useDeleteTodo } from '../hooks';
import { useUpdateTodo } from '../hooks/useUpdateTodo';

interface IProps {
  todo: Todo;
  setTodoToEdit(todo: Todo): void;
}

export function TodoItem({ todo, setTodoToEdit }: IProps) {
  const { onUpdateTodo } = useUpdateTodo();
  const { onDeleteTodo } = useDeleteTodo();

  const isDone = todo.status !== 'TODO';
  let cls = '';
  if (isDone) cls = 'line-through text-gray-400';

  return (
    <div key={todo.id} className={`flex flex-row items-center py-2`}>
      <div className="h-4 w-4 border-2	border-pink-500 rounded-full mr-2" />
      <p className={`w-full ${cls}`} role="button">
        {todo.content}
      </p>
      {!isDone && (
        <button
          className="text-gray-600"
          onClick={() => onUpdateTodo(todo.id, todo.content, 'DONE')}
        >
          Done
        </button>
      )}
      {isDone && (
        <>
          <button className="text-gray-600 mr-2" onClick={() => setTodoToEdit(todo)}>
            Edit
          </button>
          <button className="text-gray-600" onClick={() => onDeleteTodo(todo.id)}>
            Remove
          </button>
        </>
      )}
    </div>
  );
}
