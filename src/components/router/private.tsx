import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { Loader } from '../loader';

interface PrivateProps {
  children: ReactNode;
}

export function Private(props: PrivateProps) {
  const authContext = useContext(AuthContext);
  if (authContext.isLoading) {
    return <Loader isLoading />;
  }
  if (!authContext.authenticated) return <Navigate to="/" replace />;
  return props.children;
}
