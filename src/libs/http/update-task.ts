import { Task } from '../../domain';
import { Axios } from './config';

export type UpdateTaskDTO = {
  title?: string;
  description?: string;
  isCompleted?: boolean;
};

export const updateTask = async (id: string, input: UpdateTaskDTO) => {
  const output = await Axios.patch<Task>(`/task/${id}`, input);
  return output.data;
};
