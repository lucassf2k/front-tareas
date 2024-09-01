import { createPortal } from 'react-dom';
import S from './styles.module.css';

export type LoaderProps = {
  isLoading: boolean;
};

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null;
  return createPortal(
    <div className={S.overlay}>
      <div className={S.loader} />
    </div>,
    document.getElementById('loaderRoot') as Element,
  );
}
