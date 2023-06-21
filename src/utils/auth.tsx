import { PropsWithChildren, createContext, useContext, useState } from 'react';

const AuthContext = createContext<{
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<null | string>>;
}>({
  user: null,
  setUser: () => {
    console.log('setUser');
  }
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<string | null>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
