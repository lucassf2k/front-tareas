import { Task } from '../../domain';
import { Axios } from './config';

export const getTaskOfId = async () => {
  const output = await Axios.get<Task>('/task');
  return output.data;
};
