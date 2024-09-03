import { Button } from './components/button';
import { Card } from './components/card';

export function App() {
  return (
    <div className="bg-black w-screen h-screen">
      <div className="max-w-[800px] m-auto h-screen py-20">
        <h1 className="text-5xl text-white">Tareas</h1>
        <Card>
          <Button size="md" variant="primary">
            Olha
          </Button>
        </Card>
      </div>
    </div>
  );
}
