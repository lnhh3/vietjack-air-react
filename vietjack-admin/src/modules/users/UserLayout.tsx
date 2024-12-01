import { SquareGanttChart } from 'lucide-react';
import { useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';
import { getUserTitle, replacePathDynamic, templateString } from '@/utilities/helper';

import useGetUserDetailByUsername from './apis/getUserDetail';

const UserLayout = () => {
  const { username } = useParams();
  const { data: userDetail } = useGetUserDetailByUsername({
    username: username ? `${username}` : '',
  });

  const breadcrumbData = useMemo(() => {
    const res = [
      {
        title: 'Techplatform',
        path: AppRoutes.DASHBOARD.INDEX,
      },
      {
        title: 'users',
        path: AppRoutes.USERS.INDEX,
      },
    ];
    if (userDetail) {
      res.push({
        title: getUserTitle(userDetail),
        path: replacePathDynamic(AppRoutes.USERS.DETAIL, { username: userDetail.username }),
      });
    }
    return res;
  }, [userDetail]);

  return (
    <>
      <BreadcrumbHeader
        breadcrumb={{
          icon: <SquareGanttChart color="#667085" size={20} />,
          items: breadcrumbData,
        }}
      />
      <Outlet />
    </>
  );
};

export default UserLayout;
