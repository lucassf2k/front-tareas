import { HandleSignIn } from '../../domain';
import { Axios } from './config';

export const signUp = async (input: HandleSignIn) => {
  const response = await Axios.post('/user/sign-up', input);
  return response.data;
};
