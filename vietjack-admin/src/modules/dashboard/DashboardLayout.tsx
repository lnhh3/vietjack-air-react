import { SquareGanttChart } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';

const DashboardLayout = () => {
  return (
    <>
      <BreadcrumbHeader
        breadcrumb={{
          icon: <SquareGanttChart color="#667085" size={20} />,
          items: [
            {
              title: 'Techplatform',
              path: AppRoutes.DASHBOARD.INDEX,
            },
            {
              title: 'dashboard',
              path: AppRoutes.DASHBOARD.INDEX,
            },
          ],
        }}
      />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
