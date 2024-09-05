export type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type User = {
  id: string;
  email: string;
};

export type HandleSignIn = {
  email: string;
  password: string;
};
