import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useUpdateTodo() {
  const [updateTodo, { data, loading, error, reset }] = useMutation(
    gql`
      mutation UpdateTodo($todo: TodoInput!) {
        updateTodo(todo: $todo) {
          id
          content
          status
        }
      }
    `
  );

  const onUpdateTodo = useCallback(
    async (id: number, content: string, status: string) => {
      try {
        reset();
        await updateTodo({
          variables: { todo: { id, content, status } },
          update(cache, { data: { updateTodo } }) {
            cache.modify({
              fields: {
                userTodos(existingTodos = []) {
                  const updateTodoRef = cache.writeFragment({
                    data: updateTodo,
                    fragment: gql`
                      fragment UpdateTodo on Todo {
                        id
                        content
                        status
                      }
                    `
                  });
                  return existingTodos.map((todo: Todo) =>
                    todo.id === updateTodo.id ? updateTodoRef : todo
                  );
                }
              }
            });
          }
        });

        // await refetch();
      } catch (error) {
        console.log(error);
      }
    },
    [updateTodo, reset]
  );

  const errorMsg = error && error.graphQLErrors?.length > 0 ? error.graphQLErrors[0].message : null;
  return { onUpdateTodo, data, loading, error, errorMsg, reset };
}
