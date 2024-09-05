import { HandleSignIn } from '../../domain';
import { Axios } from './config';

export const signIn = async (input: HandleSignIn) => {
  const { headers } = await Axios.post('/sign-in', input);
  return headers.authorizarion as string;
};
