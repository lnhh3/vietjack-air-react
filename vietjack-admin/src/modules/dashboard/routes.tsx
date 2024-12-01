import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import DashboardLayout from './DashboardLayout';
import DashboardMain from './pages/DashboardMain';

export const dashboardRoutes: RouteObject = {
  path: AppRoutes.DASHBOARD.INDEX,
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardMain />,
    },
  ],
};
