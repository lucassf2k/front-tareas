import { HandleSignIn } from '../../domain';
import { Axios } from './config';

export type SignInResponse = {
  token: string;
  user: {
    id: string;
    email: string;
  };
};

export const signIn = async (input: HandleSignIn): Promise<SignInResponse> => {
  const response = await Axios.post<SignInResponse>('/user/sign-in', input);
  return response.data;
};
