import { Outlet, redirect, type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import NewCourseData from './components/NewCourseData';
import CoursesLayout from './CoursesLayout';
import CourseDetailPage from './pages/CourseDetail';
import CourseList from './pages/CourseList';
import CreateNewCoursePage from './pages/CreateNewCourse';

export const courseRoutes: RouteObject = {
  path: AppRoutes.COURSES.INDEX,
  element: <Outlet />,
  children: [
    {
      path: AppRoutes.COURSES.INDEX,
      element: <CoursesLayout />,
      children: [
        {
          index: true,
          element: <CourseList />,
        },
      ],
    },
    {
      path: '/courses/-',
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          loader: () => redirect(AppRoutes.COURSES.INDEX),
        },
        {
          path: '/courses/-/:slug',
          element: <CourseDetailPage />,
        },
      ],
    },
  ],
};

export const createCourseRoutes: RouteObject = {
  path: AppRoutes.COURSES.INDEX,
  element: <CreateNewCoursePage />,
  children: [
    {
      index: true,
      loader: () => redirect(AppRoutes.COURSES.CREATE_COURSE),
    },
    {
      path: AppRoutes.COURSES.CREATE_COURSE,
      element: <NewCourseData />,
    },
    {
      path: AppRoutes.COURSES.CREATE_COURSE_CONTENT,
      element: <Outlet />,
    },
  ],
};
