import { createContext, type ReactNode } from 'react';
import { useAuth } from './hook/use-auth';
import { HandleSignIn } from '../domain';

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextProps = {
  authenticated: boolean;
  isLoading: boolean;
  handleSignIn: (user: HandleSignIn) => Promise<void>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider(props: AuthProviderProps) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
