import { MutationOptions, useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';

export enum UploadFileType {
  COURSE = 'COURSE',
}

export type UploadFileRequest = {
  type: UploadFileType;
  file: FormData;
};

export type UploadFileResponse = {
  url: string;
  type: UploadFileType;
  publicId: string;
};

const uploadApi = async ({ type, file }: UploadFileRequest): Promise<UploadFileResponse> => {
  const res = await httpRequest.post<FormData, UploadFileResponse>(ApiPath.UPLOAD.INDEX, file, {
    params: { type },
  });
  return res.data;
};

export const useUploadFile = (
  config?: MutationOptions<UploadFileResponse, Error, UploadFileRequest>
) => {
  return useMutation({
    mutationFn: uploadApi,
    ...config,
  });
};
