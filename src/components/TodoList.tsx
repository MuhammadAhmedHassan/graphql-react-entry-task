import { useState } from 'react';
import { EditTodo, TodoItem } from '.';

interface IProps {
  loading: boolean;
  todos: Todo[];
}

export function TodoList({ loading, todos }: IProps) {
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  if (loading) return null;

  return (
    <>
      {todoToEdit && <EditTodo todo={todoToEdit} setTodo={setTodoToEdit} />}
      <div className="w-full">
        <div className="w-full rounded-xl bg-gray-100 py-2 px-4">
          {todos.length === 0 && <EmptyList />}

          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} setTodoToEdit={setTodoToEdit} />;
          })}
        </div>
      </div>
    </>
  );
}

function EmptyList() {
  return (
    <>
      <p className="text-center text-gray-700 text-sm">You have no todos now.</p>
      <p className="text-center text-gray-700 text-sm">Did you just get everything done?</p>
    </>
  );
}
