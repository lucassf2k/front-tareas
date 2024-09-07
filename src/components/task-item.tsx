import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Button } from './button';
import { Card } from './card';
import { Loader } from './loader';
import { Modal, ModalContent } from './modal';
import { Input, InputContainer } from './input';

export interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    isCompleted?: boolean;
  };
  onDelete: () => void;
  onUpdate: () => void;
  onUpdateFields: (
    data: UpdateTaskSchema,
    props: {
      task: {
        id: string;
        title: string;
        description: string;
        isCompleted?: boolean;
      };
    },
  ) => Promise<void>;
}

export type UpdateTaskSchema = {
  title?: string;
  description?: string;
};

export const TaskItem = (props: TaskItemProps) => {
  const { register, handleSubmit } = useForm<UpdateTaskSchema>();
  const [toggleModalVisibility, setToggleModalVisibility] =
    useState<boolean>(false);

  const handleToggleVisibleModal = () => {
    setToggleModalVisibility((prevState) => !prevState);
  };

  return (
    <>
      <Modal isVisible={toggleModalVisibility}>
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
              onSubmit={handleSubmit((data) =>
                props.onUpdateFields(data, { task: props.task }),
              )}
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

      <Card
        className={`max-w-[980px] w-full mt-4 p-4 ${props.task.isCompleted && 'border-green-600 opacity-60'}`}
      >
        <h2 className="text-zinc-200 text-lg font-bold">{props.task.title}</h2>
        <p className="text-zinc-400 w-full text-justify text-sm">
          {props.task.description}
        </p>
        <div className="w-full flex items-center justify-end">
          <Button size="sm" variant="icon" onClick={props.onUpdate}>
            <FaCheck size={20} className="text-green-600" />
          </Button>
          <Button size="sm" variant="icon" onClick={handleToggleVisibleModal}>
            <FiEdit size={20} className="text-cyan-600" />
          </Button>
          <Button size="sm" variant="icon" onClick={props.onDelete}>
            <RiDeleteBin6Line size={20} className="text-red-600" />
          </Button>
        </div>
      </Card>
    </>
  );
};
