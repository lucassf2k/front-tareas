import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
  children: ReactNode;
}

export function Private(props: PrivateProps) {
  const isAuthentication = false;
  if (!isAuthentication) return <Navigate to="/" replace />;
  return props.children;
}
