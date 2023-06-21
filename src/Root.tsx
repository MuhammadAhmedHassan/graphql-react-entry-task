import { gql, useQuery } from '@apollo/client';
import { PropsWithChildren, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MyTodos, Signup } from './pages';
import { AppLocalStorage } from './utils/app-localstorage';
import { AuthProvider, useAuth } from './utils/auth';

export const Root = () => {
  const auth = useAuth();

  const { loading, error } = useQuery(gql`
    query GetUser {
      getUser {
        id
        email
      }
    }
  `);

  useEffect(() => {
    if (error && error?.graphQLErrors.length > 0) {
      AppLocalStorage.removeItem('user-token');
    } else {
      auth.setUser(AppLocalStorage.getItem('user-token'));
    }
  }, [error, auth]);

  if (loading) return null;

  return (
    <AuthProvider>
      <div className="h-screen w-screen bg-gray-300 pt-6">
        <div className="h-full w-full sm:w-2/3 mx-auto">
          <Routes>
            <Route
              path="/login"
              element={
                <NotProtected>
                  <Signup />
                </NotProtected>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MyTodos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = useAuth();
  if (!auth.user) return <Navigate to="/login" />;
  return children;
}

function NotProtected({ children }: PropsWithChildren) {
  const auth = useAuth();
  if (auth.user) return <Navigate to="/" />;
  return children;
}
