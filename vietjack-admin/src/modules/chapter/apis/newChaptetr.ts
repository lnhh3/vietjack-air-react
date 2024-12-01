import { MutateOptions, useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { HttpResponse } from '@/https/types';
import queryClient from '@/libs/react-query';

export type NewChapterRequest = {
  title: string;
  previousChapterId?: string;
  courseId: string;
};

const createNewChapter = async (req: NewChapterRequest) => {
  const res = await httpRequest.post(ApiPath.CHAPTER.INDEX, req);
  return res.data;
};

type Options = {
  configs?: MutateOptions<any, HttpResponse, NewChapterRequest>;
};
export const useCreateNewChapter = ({ configs }: Options = {}) =>
  useMutation({
    mutationKey: ['newCHapter'],
    mutationFn: createNewChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapter'] });
    },
    ...configs,
  });
