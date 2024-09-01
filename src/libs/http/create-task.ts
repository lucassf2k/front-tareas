import { Task } from '../../domain';
import { Axios } from './config';

export type CreateTaskDTO = {
  title: string;
  description: string;
};

export const createTask = async (input: CreateTaskDTO) => {
  const output = await Axios.post<Task>('/task', input);
  return output.data;
};
