import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import Image from '@/components/common/Image';
import { UserStatus } from '@/types/user';

import useGetUserDetailByUsername from '../../apis/getUserDetail';
import UserCourseList from '../../components/UserCourseList';
import UserStatusTag from '../../components/UserStatusTag';

const UserDetailPage = () => {
  const { t } = useTranslation();
  const { username } = useParams();

  const { data } = useGetUserDetailByUsername({ username: `${username}` });

  return (
    <div className="px-10 py-10">
      <div className="flex gap-5">
        <Image
          className="size-[150px] rounded-[12px] border border-gray-100"
          imageClassName="rounded-[12px]"
          src={data?.profileImage}
        />
        <div className="py-4 px-8 border border-gray-100 rounded-[12px] flex gap-10">
          <div>
            <div>
              <p className="text-gray-800 font-semibold text-[14px] mb-1">{t`username`}:</p>
              <span className="text-gray-500 text-[14px]">{data?.username}</span>
            </div>
            <div className="mt-5">
              <p className="text-gray-800 font-semibold text-[14px] mb-1">{t`fullName`}:</p>
              <span className="text-gray-500 text-[14px]">
                {data?.firstName} {data?.lastName}
              </span>
            </div>
          </div>

          <div>
            <div className="">
              <p className="text-gray-800 font-semibold text-[14px] mb-1">{t`email`}:</p>
              <span className="text-gray-500 text-[14px]">{data?.email}</span>
            </div>
            <div className="mt-5">
              <p className="text-gray-800 font-semibold text-[14px] mb-1">{t`status`}:</p>
              <span className="text-gray-500 text-[14px]">
                {data?.userStatus && <UserStatusTag status={data?.userStatus as UserStatus} />}
              </span>
            </div>
          </div>
        </div>
      </div>
      <UserCourseList userId={data?.id || ''} />
    </div>
  );
};

export default UserDetailPage;
