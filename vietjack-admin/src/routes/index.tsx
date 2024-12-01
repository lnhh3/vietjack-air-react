import { authRouter } from '@authRemote/entry';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import ProtectedRoute from '@/components/common/ProtectedRoute';
import AppContainer from '@/components/core/AppContainer';
import { MainLayout, UnauthenticatedLayout } from '@/components/layouts';
import { AppRoutes } from '@/constants';
import { chapterRoutes } from '@/modules/chapter';
import { courseRoutes, createCourseRoutes } from '@/modules/course';
import { dashboardRoutes } from '@/modules/dashboard';
import { lessonsRoutes } from '@/modules/lessons';
import { userRoutes } from '@/modules/users';

const rootRouter = createBrowserRouter([
  {
    path: AppRoutes.INDEX,
    element: <AppContainer />,
    children: [
      {
        path: AppRoutes.INDEX,
        element: <ProtectedRoute />,
        children: [
          {
            path: AppRoutes.INDEX,
            element: <MainLayout />,
            children: [
              {
                index: true,
                loader: () => redirect(AppRoutes.DASHBOARD.INDEX),
              },
              dashboardRoutes,
              userRoutes,
              courseRoutes,
              lessonsRoutes,
              chapterRoutes,
            ],
          },
          createCourseRoutes,
        ],
      },
      {
        path: AppRoutes.INDEX,
        element: <UnauthenticatedLayout />,
        children: [...authRouter],
      },
      {
        path: '*',
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);

export default function RootRouterProvider() {
  return <RouterProvider router={rootRouter} />;
}
