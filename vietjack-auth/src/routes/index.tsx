import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import AuthContainer from '@/components/AuthContainer';
import LoginPage from '@/pages/Login';
import SignUpPage from '@/pages/SignUp';

const authRouter: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <AuthContainer>
        <Outlet />
      </AuthContainer>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: '/auth/login',
        element: <LoginPage />,
      },
      {
        path: '/auth/sign-up',
        element: <SignUpPage />,
      },
    ],
  },
];

export const authRemoteId = uuidV4();
export const prefix = 'AuthRemoteContainer';

export const rootAuthRouter: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
    ],
  },
  ...authRouter,
  {
    path: '*',
    element: <h1>NOT FOUND</h1>,
  },
];

export default authRouter;
