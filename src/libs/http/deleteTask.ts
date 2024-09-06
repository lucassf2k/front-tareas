import { Task } from '../../domain';
import { Axios } from './config';

export const deleteTask = async (id: string) => {
  const output = await Axios.delete<Task>(`/task/${id}`);
  return output.data;
};
