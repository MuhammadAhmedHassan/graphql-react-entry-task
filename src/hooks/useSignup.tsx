import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { AppLocalStorage } from '../utils/app-localstorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export function useSignup() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signup, { data, loading, error, reset }] = useMutation(
    gql`
      mutation CreateUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password)
      }
    `
  );

  const onSignUp = useCallback(
    async (email: string, password: string) => {
      try {
        reset();
        const data = await signup({ variables: { email, password } });
        if (!(data.data && data.data.createUser)) return;
        AppLocalStorage.setItem('user-token', data.data.createUser);
        auth.setUser(data.data.createUser);
        navigate('/', { replace: true });
      } catch (error) {
        console.log(error);
      }
    },
    [signup, reset, navigate, auth]
  );

  const errorMsg = error && error.graphQLErrors?.length > 0 ? error.graphQLErrors[0].message : null;
  return { onSignUp, data, loading, error, errorMsg, reset };
}
