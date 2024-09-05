import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { SignUp } from '../../pages/sign-up';
import { SignIn } from '../../pages/sign-in';
import { NotFound } from './not-found';
import { AuthProvider } from '../../context/auth-context';
import { Home } from '../../pages/home';

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
