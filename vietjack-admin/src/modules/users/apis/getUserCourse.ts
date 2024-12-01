import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { PagingResponse } from '@/types/common';
import { CourseDetail } from '@/types/course';
import { replacePathDynamic } from '@/utilities/helper';

export type UserCourseResponse = {
  id: string;
  userId: string;
  course: CourseDetail;
  createdAt: number;
  updatedAt: number;
};

type UserCourseRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchJey?: string;
  userId: string;
};

const getUserCourse = async ({ userId, ...params }: UserCourseRequest) => {
  const res = await httpRequest.get<PagingResponse<UserCourseResponse>>(
    replacePathDynamic(ApiPath.USERS.USER_COURSE, {
      userId,
    }),
    { params }
  );
  return res.data;
};

const useGetUserCourse = ({ params }: { params: UserCourseRequest }) =>
  useQuery({
    queryKey: ['user-course'],
    queryFn: () => getUserCourse(params),
    enabled: !!params.userId,
  });

export default useGetUserCourse;
