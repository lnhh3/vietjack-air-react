import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/locales';
import { authRemoteId } from '@/routes';
import useThemeMode from '@/store/useThemeMode';

import AppProvider from '../AppProvider';
import style from './style.module.scss';

const AuthContainer = ({ children }: PropsWithChildren) => {
  const theme = useThemeMode();

  return (
    <I18nextProvider i18n={i18n}>
      <AppProvider>
        <div
          className={clsx(
            `AuthRemoteContainer-${authRemoteId}`,
            style.container,
            theme === 'dark' && style.dark
          )}
        >
          {children}
        </div>
      </AppProvider>
    </I18nextProvider>
  );
};

export default AuthContainer;
