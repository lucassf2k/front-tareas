import { Task } from '../../domain';
import { Axios } from './config';

export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  isCompleted?: boolean;
};

export const updateTask = async (input: UpdateTaskDTO) => {
  const output = await Axios.post<Task>('/task', input);
  return output.data;
};
