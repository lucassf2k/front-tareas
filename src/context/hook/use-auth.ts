import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../libs/http/config';
import { HandleSignIn } from '../../domain';
import { signIn } from '../../libs/http/sign-in';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TAREAS:token');
    if (token) {
      Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = async (user: HandleSignIn) => {
    try {
      setIsLoading(true);
      const authorization = await signIn(user);
      const [_, token] = authorization.split(' ');
      if (!token) navigate('/');
      localStorage.setItem('@TAREAS:token', JSON.stringify(token));
      localStorage.setItem('@TAREAS:email', user.email);
      Axios.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      setIsLoading(false);
      navigate('/home');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.status) {
        toast.warning('Usuário não encontrado!');
      }
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem('@TAREAS:token');
    localStorage.removeItem('@TAREAS:email');
    Axios.defaults.headers.Authorizarion = '';
    navigate('/sign-in');
  };

  return { isLoading, authenticated, handleSignIn, handleLogout };
}
