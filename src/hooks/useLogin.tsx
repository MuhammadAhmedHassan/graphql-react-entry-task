import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { AppLocalStorage } from '../utils/app-localstorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export function useLogin() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [login, { data, loading, error, reset }] = useMutation(
    gql`
      mutation Login($email: String!, $password: String!) {
        token(email: $email, password: $password)
      }
    `
  );

  const onLogin = useCallback(
    async (email: string, password: string) => {
      try {
        reset();
        const data = await login({ variables: { email, password } });
        if (!(data.data && data.data.token)) return;
        AppLocalStorage.setItem('user-token', data.data.token);
        auth.setUser(data.data.createUser);
        navigate('/', { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    [auth, login, navigate, reset]
  );

  const errorMsg = error && error.graphQLErrors?.length > 0 ? error.graphQLErrors[0].message : null;
  return { onLogin, data, loading, error, errorMsg, reset };
}
