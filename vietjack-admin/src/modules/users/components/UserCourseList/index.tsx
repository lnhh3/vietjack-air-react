import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Table from '@/components/common/Table';

import useGetUserCourse, { UserCourseResponse } from '../../apis/getUserCourse';

type Props = {
  userId: string;
};

const UserCourseList = (props: Props) => {
  const { userId } = props;
  const { t } = useTranslation();
  const { data: userCourseData } = useGetUserCourse({
    params: { userId: userId },
  });
  const navigate = useNavigate();

  const column: ColumnDef<UserCourseResponse>[] = [
    {
      accessorKey: 'title',
      header: () => <div className="text-left text-gray-600 text-xs-medium">{t`title`}</div>,
      cell: ({ row: { original: data } }) => data.course.title,
    },
    {
      accessorKey: 'price',
      header: () => <div className="text-left text-gray-600 text-xs-medium">{t`price`}</div>,
      cell: ({ row: { original: data } }) => data.course.price,
    },
    {
      accessorKey: 'price',
      header: () => <div className="text-left text-gray-600 text-xs-medium">{t`price`}</div>,
    },
  ];

  const handleRowClick = ({ course }: UserCourseResponse) => {
    navigate(`/courses/-/${course.slug}`);
  };

  return (
    <div className="inline-block border-2 border-gray-100 rounded-[12px] mt-5">
      <Table
        tableClassName=""
        rowClickable
        onRowClick={handleRowClick}
        headClassName="h-10 border-b-2 border-gray-100"
        columns={column}
        data={userCourseData?.content ?? []}
      />
    </div>
  );
};

export default UserCourseList;
