import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../components/card';
import { Banner } from '../components/banner';
import { Button } from '../components/button';
import { Loader } from '../components/loader';
import { ErrorComp, Input, InputContainer } from '../components/input';
import { AuthContext } from '../context/auth-context';

const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .min(1, 'E-mail não pode ser vazio')
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .min(1, 'Senha não pode ser vazia'),
});

type SignInShema = z.infer<typeof signInSchema>;

export function SignIn() {
  const { handleSignIn, isLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInShema>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="bg-black w-screen h-screen flex items-center justify-between gap-8">
        {/* LEFT */}
        <Banner
          imgPath="/cats.svg"
          imgAlt="Imagem de dois gatos em cima do nome Welcome"
        />
        {/* RIGHT */}
        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <h1 className="text-zinc-50 font-bold text-4xl">Entrar</h1>
          <p className="text-zinc-400 mt-2">
            Entre com os dados que se pede para acessar a plataforma
          </p>
          <Card className="px-4 py-6 max-w-[480px] w-full mt-4">
            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="text-zinc-200 space-y-6"
            >
              <InputContainer>
                <Input
                  label="E-mail"
                  type="email"
                  placeholder="example@mail.com"
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
          <p className="text-zinc-400 text-sm max-w-[480px] w-full text-start mt-1">
            Ainda não possui uma conta?{' '}
            <Link to="/sign-up" className="text-cyan-300">
              Crie aqui
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
