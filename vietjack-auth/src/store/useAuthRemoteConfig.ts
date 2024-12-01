import { useLayoutEffect, useMemo, useRef } from 'react';

import useAuthConfig from './useAuthConfig';

type AuthConfig = {
  themeMode?: 'dark' | 'light';
  userRole?: 'ADMIN' | 'USER';
  language?: 'vi' | 'en';
  canRegister?: boolean;
  onSuccess?: (data?: any) => void;
  onError?: (e: any) => void;
};

const useAuthRemoteConfig = (props: AuthConfig) => {
  const { setAuthConfig } = useAuthConfig();

  const data = useRef('');

  const deps = useMemo(() => JSON.stringify(props), [props]);

  useLayoutEffect(() => {
    if (data.current === deps) return;
    data.current = deps;
    setAuthConfig({
      userRole: 'USER',
      themeMode: 'light',
      canRegister: true,
      language: 'vi',
      ...props,
    });
  }, [deps, props]);
};

export default useAuthRemoteConfig;
