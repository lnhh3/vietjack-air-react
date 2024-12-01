import { BookOpen, BookText, House, LibraryBig, User } from 'lucide-react';
import { ReactNode } from 'react';

import { AppRoutes } from '@/constants';

export type NavBarItem = {
  key: string;
  title: string;
  icon: ReactNode;
  link: string;
  children?: NavBarItem[];
};

export const navbarModule: NavBarItem[] = [
  {
    key: 'dashboard',
    title: 'dashboard',
    icon: <House size={22} />,
    link: AppRoutes.DASHBOARD.INDEX,
  },
  {
    key: 'user-management',
    title: 'users',
    icon: <User size={22} />,
    link: AppRoutes.USERS.INDEX,
  },
  {
    key: 'course-management',
    title: 'courses',
    icon: <LibraryBig size={22} />,
    link: AppRoutes.COURSES.INDEX,
    children: [
      {
        key: 'chapter-management',
        title: 'chapters',
        icon: <BookText size={22} />,
        link: AppRoutes.CHAPTER.INDEX,
      },
      {
        key: 'lesson-management',
        title: 'lessons',
        icon: <BookOpen size={22} />,
        link: AppRoutes.LESSON.INDEX,
      },
    ],
  },
];
