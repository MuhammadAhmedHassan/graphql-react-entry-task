import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useDeleteTodo() {
  const [deleteTodo, { data, loading, error, reset }] = useMutation(
    gql`
      mutation DeleteTodo($id: ID!) {
        deleteTodo(id: $id)
      }
    `
  );

  const onDeleteTodo = useCallback(
    async (id: number) => {
      try {
        reset();
        await deleteTodo({
          variables: { id },
          update(cache) {
            cache.modify({
              fields: {
                userTodos(existingTodos = [], { readField }) {
                  return existingTodos.filter((todo: Todo) => id !== readField('id', todo));
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
    [deleteTodo, reset]
  );

  const errorMsg = error && error.graphQLErrors?.length > 0 ? error.graphQLErrors[0].message : null;
  return { onDeleteTodo, data, loading, error, errorMsg, reset };
}
