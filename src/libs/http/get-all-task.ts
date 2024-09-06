import { Task } from '../../domain';
import { Axios } from './config';

export const getAllTask = async (
  currentPage: number,
  numberItemsPage: number = 10,
): Promise<Task[]> => {
  const output = await Axios.get<Task[]>(
    `/tasks?page=${currentPage}&pageSize=${numberItemsPage}`,
  );
  return output.data;
};
