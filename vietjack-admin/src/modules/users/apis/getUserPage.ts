import { UserDetail } from '@authRemote/entry';
import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { PagingResponse } from '@/types/common';

export type UserListQueryParams = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchKey?: string;
};

const getUserList = async (params: UserListQueryParams = {}) => {
  const res = await httpRequest.get<PagingResponse<UserDetail>>(ApiPath.USERS.PAGE, {
    params: params,
  });
  return res.data;
};

const useGetUserList = ({ queryParams }: { queryParams: UserListQueryParams }) =>
  useQuery({
    queryKey: ['user-list', queryParams],
    queryFn: async () => await getUserList(queryParams),
  });

export default useGetUserList;
