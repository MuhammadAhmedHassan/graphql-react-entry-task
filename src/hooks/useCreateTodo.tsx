import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';

export function useCreateTodo() {
  const [createTodo, { data, loading, error, reset }] = useMutation(
    gql`
      mutation CreateTodo($content: String!) {
        createTodo(content: $content) {
          id
          content
          status
        }
      }
    `
  );

  const onCreateTodo = useCallback(
    async (content: string) => {
      try {
        reset();
        await createTodo({
          variables: { content },
          update(cache, { data: { createTodo } }) {
            cache.modify({
              fields: {
                userTodos(existingTodos = []) {
                  const newTodoRef = cache.writeFragment({
                    data: createTodo,
                    fragment: gql`
                      fragment NewTodo on Todo {
                        id
                        content
                        status
                      }
                    `
                  });
                  return [...existingTodos, newTodoRef];
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
    [createTodo, reset]
  );

  const errorMsg = error && error.graphQLErrors?.length > 0 ? error.graphQLErrors[0].message : null;
  return { onCreateTodo, data, loading, error, errorMsg, reset };
}
