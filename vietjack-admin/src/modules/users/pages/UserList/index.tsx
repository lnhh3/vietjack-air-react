import { useAuthStore } from '@authRemote/entry';
import { type ColumnDef } from '@tanstack/react-table';
import { PencilLineIcon, Search } from 'lucide-react';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Avatar from '@/components/common/Avatar';
import { DropdownStandard } from '@/components/common/DropdownStandard';
import Image from '@/components/common/Image';
import Input from '@/components/common/Input';
import Table from '@/components/common/Table';
import { AppRoutes, FAKE_STATUS_DATA, FormatDate, ROLE_DATA } from '@/constants';
import { useQueryString } from '@/hooks/useQueryString';
import { UserDetail } from '@/types/user';
import { formatUserTitle, replacePathDynamic } from '@/utilities/helper';

import useGetUserList, { UserListQueryParams } from '../../apis/getUserPage';
import UserRoleTag from '../../components/UserRoleTag';
import UserStatusTag from '../../components/UserStatusTag';

const UserList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userDetail } = useAuthStore();
  const [queryParams, setQueryParams] = useQueryString<UserListQueryParams>();

  const { data, isLoading } = useGetUserList({
    queryParams: queryParams,
  });

  const columns: ColumnDef<UserDetail>[] = [
    {
      accessorKey: 'fullName',
      header() {
        return <div className="text-left text-gray-600 text-xs-medium">{t`fullName`}</div>;
      },
      cell({ row }) {
        return (
          <div className="flex flex-row gap-5">
            <Avatar size={36} src={row.original.profileImage} />
            <div className="">
              <p>
                {formatUserTitle(row.original)} {row.original.id === userDetail?.id && '(You)'}
              </p>
              <p className="text-gray-400">{row.original.username}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'email',
      header: () => t`email`,
      cell({ row }) {
        return <span>{t(row.original.email)}</span>;
      },
    },
    {
      accessorKey: 'userStatus',
      header: () => t`status`,
      cell({ row }) {
        return <UserStatusTag status={row.original.userStatus as any} />;
      },
    },
    {
      accessorKey: 'userRole',
      header: () => t`role`,
      cell({ row }) {
        return <UserRoleTag role={row.original.userRole} />;
      },
    },
    {
      accessorKey: 'lastLogin',
      header: () => t`lastActive`,
      cell({ row }) {
        return <span>{moment(row.original.lastLogin).format(FormatDate.FULL)}</span>;
      },
    },
    {
      accessorKey: 'lastIpAddress',
      header: () => t`lastIpAddress`,
      cell({ row }) {
        return <span>{t(row.original.lastIpAddress)}</span>;
      },
    },
  ];

  const timeoutSearch = useRef<any>();

  const [dropdownData, setDropdownUserStatus] = useState<{
    userRole: string;
    userStatus: string;
  }>({
    userRole: '',
    userStatus: '',
  });

  const handleSearch = (val: string) => {
    if (timeoutSearch.current !== undefined) {
      clearTimeout(timeoutSearch.current);
    }
    timeoutSearch.current = setTimeout(() => {
      setQueryParams((q) => {
        if (!val) {
          q.set('pageNumber', '1');
          q.delete('searchKey');
          return q;
        }
        q.set('pageNumber', '1');
        q.set('searchKey', val);
        return q;
      });
    }, 800);
  };

  const handleClickRow = (user: UserDetail) => {
    navigate(
      replacePathDynamic(AppRoutes.USERS.DETAIL, {
        username: user.username,
      })
    );
  };

  return (
    <div className="p-8 mt-[32px]">
      <div className="w-full border-2 border-gray-100 rounded-[12px]">
        <div className="flex items-center gap-20 px-4 py-4">
          <Input
            autoComplete="off"
            spellCheck="false"
            leftSection={<Search />}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t`search`}
            className="max-w-[400px]"
          />
          <div className="w-[132px]">
            <DropdownStandard
              showClearIcon
              dropdownClassName="flex items-center gap-2 h-10"
              options={FAKE_STATUS_DATA}
              placeholder={t('status') as string}
              leftIcon={<PencilLineIcon size={20} />}
              selectedValue={dropdownData.userStatus}
              onChange={(item) => {
                setDropdownUserStatus((p) => ({
                  ...p,
                  userStatus: item ? item + '' : '',
                }));
                setQueryParams((q) => {
                  if (item) {
                    q.set('userStatus', item + '');
                  } else {
                    q.delete('userStatus');
                  }
                  return q;
                });
              }}
            />
          </div>
          <div className="w-[132px]">
            <DropdownStandard
              showClearIcon
              dropdownClassName="flex items-center gap-2 h-10"
              options={ROLE_DATA}
              placeholder={t('role') as string}
              leftIcon={<PencilLineIcon size={20} />}
              selectedValue={dropdownData.userRole}
              onChange={(item) => {
                setDropdownUserStatus((p) => ({
                  ...p,
                  userRole: item ? item + '' : '',
                }));
                setQueryParams((q) => {
                  if (item) {
                    q.set('userRole', item + '');
                  } else {
                    q.delete('userRole');
                  }
                  return q;
                });
              }}
            />
          </div>
        </div>
        <Table
          pagingData={data}
          isLoading={isLoading}
          tableClassName="w-full"
          headClassName="h-10 border-b-2 border-gray-100"
          columns={columns}
          rowClickable
          onRowClick={handleClickRow}
          data={data?.content ?? []}
          onPagingDataChange={(value) =>
            setQueryParams((prevSearchParams) => {
              prevSearchParams.set('pageNumber', String(value.pageNumber));
              prevSearchParams.set('pageSize', String(value.pageSize));
              return prevSearchParams;
            })
          }
        />
      </div>
    </div>
  );
};

export default UserList;
