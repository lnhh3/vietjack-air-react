import { PropsWithChildren, useLayoutEffect } from 'react';

import { I18NextKey, LanguageType, updateLanguage } from '@/locales';
import useAuthConfig from '@/store/useAuthConfig';

const AppProvider = ({ children }: PropsWithChildren) => {
  const { language } = useAuthConfig();

  useLayoutEffect(() => {
    if (localStorage.getItem(I18NextKey) !== language) {
      updateLanguage((language as LanguageType) || LanguageType.EN);
    }
  }, [language]);

  return <>{children}</>;
};

export default AppProvider;
