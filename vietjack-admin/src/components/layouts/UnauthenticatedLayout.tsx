import { useAuthStore } from '@authRemote/entry';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@/constants';

const UnauthenticatedLayout = () => {
  const { authDetail } = useAuthStore();

  if (authDetail && (authDetail?.accessToken || authDetail?.expireTime > Date.now())) {
    return <Navigate to={AppRoutes.DASHBOARD.INDEX} />;
  }

  return (
    <>
      <Outlet></Outlet>
    </>
  );
};

export default UnauthenticatedLayout;
