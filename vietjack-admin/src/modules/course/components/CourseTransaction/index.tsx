import { type ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useGetTransaction, { TransactionResponse } from '@/apis/transactions';
import Table from '@/components/common/Table';
import { formatNumber, templateString } from '@/utilities/helper';

type Props = {
  courseId: string;
};

const CourseTransaction: FC<Props> = ({ courseId }) => {
  const { data } = useGetTransaction({ referenceId: courseId });
  const { t } = useTranslation();

  const column: ColumnDef<TransactionResponse>[] = [
    {
      accessorKey: 'id',
      header: () => t`id`,
    },
    {
      accessorKey: 'amount',
      header: () => t`amount`,
      cell: (item) => formatNumber(item.row.original.amount),
    },
    {
      accessorKey: 'status',
      header: () => t`status`,
    },
    {
      accessorKey: 'note',
      header: () => t`note`,
    },
    {
      accessorKey: 'fullName',
      header: () => t`fullName`,
      cell: (item) =>
        templateString`${item.row.original.user.firstName} ${item.row.original.user.lastName}`,
    },
    {
      accessorKey: 'email',
      header: () => t`email`,
      cell: (item) => item.row.original.user.email,
    },
  ];

  return (
    <Table className="w-full" tableClassName="w-full" columns={column} data={data?.content ?? []} />
  );
};

export default CourseTransaction;
