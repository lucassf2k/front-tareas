import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiLogout } from 'react-icons/ci';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { Button } from '../components/button';
import { Loader } from '../components/loader';
import { Modal, ModalContent } from '../components/modal';
import { TaskItem, UpdateTaskSchema } from '../components/task-item';
import { Card } from '../components/card';
import { Input, InputContainer } from '../components/input';
import { Task } from '../domain';
import { AuthContext } from '../context/auth-context';
import { createTask } from '../libs/http/create-task';
import { getAllTask } from '../libs/http/get-all-task';
import { deleteTask } from '../libs/http/deleteTask';
import { updateTask } from '../libs/http/update-task';

export type CreateTaskSchema = {
  title: string;
  description: string;
};

export type PaginationSchema = {
  currentPage: number;
  total: number;
  pageSize?: number;
};

export type UpdateTask = {
  task: {
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
  };
};

export function Home() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationSchema>({
    currentPage: 1,
    total: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { register, handleSubmit, reset } = useForm<CreateTaskSchema>();
  const { handleLogout } = useContext(AuthContext);

  const handleToggleVisibleModal = () => {
    setToggleModal((prevState) => !prevState);
  };

  const loadTask = async () => {
    try {
      setIsLoading(true);
      const tasks = await getAllTask(pagination.currentPage);
      setTasks(tasks);
      setPagination({
        currentPage: pagination.currentPage,
        total: tasks.length,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.status) {
        if (error.status === 500) {
          toast.error('Algo inesperado aconteceu! Tente novamente mais tarde.');
        }
      }
    }
  };

  const handleNextPage = (page: number) => {
    return () => {
      setPagination({ currentPage: page, total: 0 });
    };
  };

  const handleCreateTask = async (data: CreateTaskSchema) => {
    try {
      setIsLoading(true);
      reset();
      await createTask(data);
      loadTask();
      setIsLoading(false);
      handleToggleVisibleModal();
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.status) {
        if (error.status === 500) {
          toast.error('Algo inesperado aconteceu! Tente novamente mais tarde.');
        }
      }
    }
  };

  const handleDeleteTask = (id: string) => {
    return async () => {
      try {
        setIsLoading(true);
        await deleteTask(id);
        loadTask();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof AxiosError && error.status) {
          if (error.status === 404) toast.info('Tarefa não encontrada!');
          if (error.status === 500) {
            toast.error(
              'Algo inesperado aconteceu! Tente novamente mais tarde.',
            );
          }
        }
      }
    };
  };

  const handleCompletedTask = (id: string, isCompleted: boolean) => {
    return async () => {
      try {
        setIsLoading(true);
        await updateTask(id, { isCompleted: !isCompleted });
        loadTask();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof AxiosError && error.status) {
          if (error.status === 404) toast.info('Tarefa não encontrada!');
          if (error.status === 500) {
            toast.error(
              'Algo inesperado aconteceu! Tente novamente mais tarde.',
            );
          }
        }
      }
    };
  };

  const handleUpdateTask = async (
    data: UpdateTaskSchema,
    props: UpdateTask,
  ) => {
    const updatedTask: UpdateTaskSchema & { isCompleted?: boolean } = {
      title: props.task.title,
      description: props.task.description,
      isCompleted: props.task.isCompleted,
    };
    if (data.title !== props.task.title) updatedTask.title = data.title;
    if (data.description !== props.task.description) {
      updatedTask.description = data.description;
    }
    try {
      setIsLoading(true);
      await updateTask(props.task.id, updatedTask);
      loadTask();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError && error.status) {
        if (error.status === 404) toast.info('Tarefa não encontrada!');
        if (error.status === 500) {
          toast.error('Algo inesperado aconteceu! Tente novamente mais tarde.');
        }
      }
    }
  };

  useEffect(() => {
    loadTask();
  }, [pagination.currentPage]);

  const totalPagesItems: number[] = [];
  for (let index = 0; index < pagination.total; index++) {
    totalPagesItems.push(index + 1);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <Modal isVisible={toggleModal}>
        <ModalContent className="p-5">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-cyan-600 font-bold text-xl">
              Criar ou Atualizar tarefa
            </h2>
            <Button size="sm" variant="icon" onClick={handleToggleVisibleModal}>
              <IoIosClose size={20} />
            </Button>
          </div>
          <Card className="mt-3 p-3">
            <form
              className="space-y-5"
              onSubmit={handleSubmit(handleCreateTask)}
            >
              <InputContainer>
                <Input
                  label="Título"
                  type="text"
                  placeholder="Título da tarefa"
                  {...register('title')}
                />
              </InputContainer>
              <InputContainer>
                <Input
                  label="Descrição"
                  type="text"
                  placeholder="Descrição da tarefa"
                  {...register('description')}
                />
              </InputContainer>
              <Button size="full" variant="primary">
                Confirmar
              </Button>
            </form>
          </Card>
        </ModalContent>
      </Modal>
      <div className="relative w-screen h-screen bg-black text-zinc-300 flex flex-col items-center">
        <button
          className="absolute top-7 right-7 bg-cyan-400 p-3 rounded-full flex items-center justify-center hover:opacity-95"
          onClick={handleLogout}
        >
          <CiLogout size={28} className="text-zinc-950" />
        </button>
        <header className="max-w-[980px] w-full mt-28 flex items-center justify-between gap-3">
          <h1 className="text-cyan-400 text-6xl font-bold">Tareas</h1>
          <Button
            size="md"
            variant="outline"
            onClick={handleToggleVisibleModal}
          >
            Nova tarefa
          </Button>
        </header>

        {/* TASK ITEM */}
        {tasks.length === 0 && (
          <p className="mt-[180px]">Nenhuma tarefa cadastrada...</p>
        )}
        <div className="max-w-[980px] w-full h-full overflow-auto mb-8 [&::-webkit-scrollbar]:hidden">
          {tasks.length > 0 &&
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask(task.id)}
                onUpdate={handleCompletedTask(task.id, task.isCompleted)}
                onUpdateFields={handleUpdateTask}
              />
            ))}
          <div className="mt-3 w-full text-end flex items-center gap-3 justify-end">
            {pagination.currentPage > 1 && (
              <button
                className="border-none bg-none flex items-center justify-center text-sm hover:opacity-80"
                onClick={handleNextPage(pagination.currentPage - 1)}
              >
                <IoIosArrowBack size={20} />
              </button>
            )}
            {totalPagesItems.length == 10 && (
              <button
                className="border-none bg-none flex items-center justify-center text-sm hover:opacity-80"
                onClick={handleNextPage(pagination.currentPage + 1)}
              >
                <IoIosArrowForward size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
