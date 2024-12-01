import { useAuthRemoteConfig } from '@authRemote/entry';
import { Outlet, useNavigate } from 'react-router-dom';

import { AppRoutes } from '@/constants';

const AppContainer = () => {
  const navigate = useNavigate();

  useAuthRemoteConfig({
    language: 'en',
    canRegister: false,
    userRole: 'ADMIN',
    themeMode: 'light',
    onSuccess: () => navigate(AppRoutes.INDEX),
  });

  return (
    <div className="max-h-screen min-h-screen">
      <Outlet />
    </div>
  );
};

export default AppContainer;
