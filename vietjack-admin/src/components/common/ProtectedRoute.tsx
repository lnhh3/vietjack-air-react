import { useAuthStore } from '@authRemote/entry';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constants';

const ProtectedRoute = () => {
  const { authDetail, logout } = useAuthStore();

  const authExpire =
    !authDetail?.accessToken || !authDetail.expireTime || authDetail.expireTime <= Date.now();

  useEffect(() => {
    if (authExpire) {
      logout();
    }
  }, [authExpire]);

  if (authExpire) {
    return <Navigate to={AppRoutes.AUTH.INDEX} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
