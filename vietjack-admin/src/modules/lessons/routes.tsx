import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import LessonLayout from './LessonLayout';
import LessonList from './pages/LessonList';

export const lessonsRoutes: RouteObject = {
  path: AppRoutes.LESSON.INDEX,
  element: <LessonLayout />,
  children: [
    {
      index: true,
      element: <LessonList />,
    },
  ],
};
