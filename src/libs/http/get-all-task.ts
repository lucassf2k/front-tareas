import { Task } from '../../domain';
import { Axios } from './config';

export const getAllTask = async () => {
  const output = await Axios.get<Task[]>('/tasks');
  return output.data;
};
