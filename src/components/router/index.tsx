import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from '../../pages/sign-up';
import { SignIn } from '../../pages/sign-in';
import { NotFound } from './not-found';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/home" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
