import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Axios } from '../../libs/http/config';
import { HandleSignIn } from '../../domain';
import { signIn } from '../../libs/http/sign-in';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    //const token = localStorage.getItem('@TAREAS:token');
    const token = Cookie.get('@TAREAS:token');
    if (token) {
      Axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = async (user: HandleSignIn) => {
    try {
      setIsLoading(true);
      const response = await signIn(user);
      if (!response.token) navigate('/');
      const cookieExpirationTime = new Date(Date.now() + 5 * 60 * 1000);
      Cookie.set('@TAREAS:token', JSON.stringify(response.token), {
        expires: cookieExpirationTime,
      });
      Cookie.set('@TAREAS:email', JSON.stringify(response.token), {
        expires: cookieExpirationTime,
      });
      Axios.defaults.headers.Authorization = `Bearer ${response.token}`;
      setAuthenticated(true);
      setIsLoading(false);
      navigate('/home');
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.status) {
        if (error.status >= 400 && error.status < 500)
          toast.warning('Usuário sem permissão! Verifique e-mail e senha');
      }
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    Cookie.remove('@TAREAS:token');
    Cookie.remove('@TAREAS:email');
    Axios.defaults.headers.Authorizarion = '';
    navigate('/');
  };

  return { isLoading, authenticated, handleSignIn, handleLogout };
}
