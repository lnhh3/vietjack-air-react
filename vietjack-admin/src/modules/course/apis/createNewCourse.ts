import { MutationOptions, useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { NewCourseRequest } from '@/types/course';

const createNewCourse = async (data: NewCourseRequest) => {
  const res = await httpRequest.post(ApiPath.COURSES.CREATE_NEW, data);
  return res;
};

export const useCreateNewCourse = (config: MutationOptions<any, Error, NewCourseRequest>) =>
  useMutation({
    mutationFn: createNewCourse,
    ...config,
  });
