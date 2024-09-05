import { Bounce, ToastContainer } from 'react-toastify';
import { Router } from './components/router';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
