import { type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants';

import ChapterLayout from './ChapterLayout';
import ChapterList from './pages/ChapterList';

export const chapterRoutes: RouteObject = {
  path: AppRoutes.CHAPTER.INDEX,
  element: <ChapterLayout />,
  children: [
    {
      index: true,
      element: <ChapterList />,
    },
  ],
};
