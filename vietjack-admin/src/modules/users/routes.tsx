import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import UserDetailPage from './pages/UserDetail';
import UserList from './pages/UserList';
import UserLayout from './UserLayout';

export const userRoutes: RouteObject = {
  path: AppRoutes.USERS.INDEX,
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <UserList />,
    },
    {
      path: AppRoutes.USERS.DETAIL,
      element: <UserDetailPage />,
    },
  ],
};
