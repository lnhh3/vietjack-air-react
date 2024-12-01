import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { PagingResponse, SystemStatus } from '@/types/common';

export type ChapterRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchKey?: string;
  courseId?: string;
  courseSlug?: string;
};

export type ChapterResponse = {
  id: string;
  title: string;
  previousChapterId: number;
  courseId: string;
  systemStatus: SystemStatus;
  createAt: number;
  updateAt: number;
};

const getPageChapter = async (params: ChapterRequest = {}) => {
  const res = await httpRequest.get<PagingResponse<ChapterResponse>>(ApiPath.CHAPTER.PAGE, {
    params: params,
  });
  return res.data;
};

const useGetChapter = (req: ChapterRequest = {}) =>
  useQuery({
    queryKey: ['chapter', req],
    queryFn: () => getPageChapter(req),
  });

export default useGetChapter;
