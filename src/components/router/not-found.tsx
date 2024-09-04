import { Link } from 'react-router-dom';
import { Button } from '../button';

export function NotFound() {
  return (
    <div className="bg-black text-sky-200 w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Página não encontrada</h1>
      <Button size="lg" variant="outline">
        <Link to="/" className="flex items-center justify-center w-full h-full">
          Voltar ao login
        </Link>
      </Button>
    </div>
  );
}
