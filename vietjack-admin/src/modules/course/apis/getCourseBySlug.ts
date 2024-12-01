import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { CourseAllDataDetail } from '@/types/course';
import { replacePathDynamic } from '@/utilities/helper';

const getCourseBySlug = async (slug: string) => {
  const res = await httpRequest.get<CourseAllDataDetail>(
    replacePathDynamic(ApiPath.COURSES.GET_DETAIL_BY_SLUG, {
      slug,
    })
  );
  return res.data;
};

export const useGetCourseBySlug = (slug: string) =>
  useQuery({
    queryKey: ['course-by-slug', slug],
    queryFn: () => getCourseBySlug(slug),
  });
