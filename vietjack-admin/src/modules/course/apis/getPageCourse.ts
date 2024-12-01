import { QueryOptions, useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { PagingResponse } from '@/types/common';
import { CourseDetail } from '@/types/course';

export type CourseListQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  sortTypeDate?: 'ASC' | 'DESC';
  searchKey?: string;
};

const gePageList = async (params: CourseListQueryParams = {}) => {
  const res = await httpRequest.get<PagingResponse<CourseDetail>>(ApiPath.COURSES.PAGE, {
    params: params,
  });
  return res.data;
};

type Config = QueryOptions<PagingResponse<CourseDetail>> & { enabled?: boolean };

const useGetCoursesList = ({
  queryParams,
  config = {},
}: {
  queryParams: CourseListQueryParams;
  config?: Config;
}) =>
  useQuery({
    queryKey: ['user-list', queryParams],
    queryFn: () => gePageList(queryParams),
    gcTime: 60 * 5 * 1000,
    ...config,
  });

export default useGetCoursesList;
