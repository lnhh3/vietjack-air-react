import { toast, TypeOptions } from 'react-toastify';

export enum EToastTheme {
  light,
  dark,
  colored,
}

export type Props = {
  content: string;
  type: TypeOptions;
};

export const toastNotification = ({ content, type = 'default' }: Props) =>
  toast(content, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    type: type,
  });
