export const AppRoutes = Object.freeze({
  INDEX: '/',
  AUTH: {
    INDEX: '/auth',
  },
  DASHBOARD: {
    INDEX: '/dashboard',
  },
  USERS: {
    INDEX: '/users',
    DETAIL: '/users/:username',
  },
  COURSES: {
    INDEX: '/courses',
    CREATE_COURSE: '/courses/new',
    CREATE_COURSE_CONTENT: '/courses/new-course-content',
  },
  CHAPTER: {
    INDEX: '/chapter',
  },
  LESSON: {
    INDEX: '/lessons',
  },
});
