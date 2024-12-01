import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { UserDetail } from '@/types/user';
import { replacePathDynamic } from '@/utilities/helper';

const fetchUserByUsername = async (username: string) => {
  const res = await httpRequest.get<UserDetail>(
    replacePathDynamic(ApiPath.USERS.USERNAME, {
      username,
    })
  );
  return res.data;
};

const useGetUserDetailByUsername = ({ username }: { username: string }) =>
  useQuery({
    queryKey: ['user-detail-username', username],
    queryFn: () => fetchUserByUsername(username),
    enabled: !!username,
  });

export default useGetUserDetailByUsername;
