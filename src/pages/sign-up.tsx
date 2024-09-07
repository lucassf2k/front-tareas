import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Banner } from '../components/banner';
import { Button } from '../components/button';
import { Card } from '../components/card';
import { ErrorComp, Input, InputContainer } from '../components/input';
import { Loader } from '../components/loader';
import { signUp } from '../libs/http/sign-up';

const signUpSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .min(1, 'E-mail não pode ser vazio')
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha não pose ser vazia'),
});

type SignUpShema = z.infer<typeof signUpSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpShema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUpShema) => {
    try {
      setIsLoading(true);
      await signUp(data);
      toast.success('Cadastro realizado com sucesso!');
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      toast.error('Aconteceu algo inesperado! Tente novamente');
      setIsLoading(false);
      navigate('/sign-up');
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="bg-black w-screen h-screen flex items-center justify-between gap-8">
        <Banner
          imgPath="/completed-task.svg"
          imgAlt="Uma pessoa junto com uma lista de tarefas"
        />
        <div className="flex-1 flex flex-col justify-center h-screen items-center">
          <h1 className="text-zinc-50 font-bold text-4xl">Cadastra-se</h1>
          <p className="text-zinc-400 mt-2">
            Entre com os dados que se pede para criar uma conta
          </p>

          <Card className="p-3 max-w-[480px] w-full mt-4">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="text-zinc-200 space-y-6"
            >
              <InputContainer>
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="Seu e-mail"
                  {...register('email')}
                />
                {errors.email && <ErrorComp text={errors.email.message} />}
              </InputContainer>
              <InputContainer>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="Sua senha"
                  {...register('password')}
                />
                {errors.password && (
                  <ErrorComp text={errors.password.message} />
                )}
              </InputContainer>
              <Button size="full" variant="primary">
                Entrar
              </Button>
            </form>
          </Card>
          <p className="text-zinc-500 text-sm max-w-[480px] w-full text-start mt-1">
            Já possui uma conta?{' '}
            <Link to="/" className="text-cyan-400">
              Entre por aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
