import { type ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import Table from '@/components/common/Table';
import { useQueryString } from '@/hooks/useQueryString';

import useGetChapter, { ChapterRequest, ChapterResponse } from '../../apis/getChapter';
import CreateNewChapterPage from '../../components/CreateNewChapterModal';

const ChapterList = () => {
  const { t } = useTranslation();

  const [query, setQueryParams] = useQueryString<ChapterRequest>({
    pageNumber: 1,
    pageSize: 10,
  });

  const { data, isFetching } = useGetChapter({
    courseId: query?.courseId ?? undefined,
    ...query,
  });

  const column: ColumnDef<ChapterResponse>[] = [
    {
      accessorKey: 'id',
      header: () => t`id`,
    },
    {
      accessorKey: 'title',
      header: () => t`title`,
    },
    {
      accessorKey: 'Course',
      header: () => t`course`,
      cell: (item) => item.row.original.courseId,
    },
    {
      accessorKey: 'previousChapterId',
      header: () => t`previousChapterId`,
    },
  ];

  return (
    <div className="p-10">
      <CreateNewChapterPage />
      <div className="w-full border-2 border-gray-100 rounded-[12px]">
        <Table
          pagingData={data}
          tableClassName="w-full"
          headClassName="h-10 border-b-2 border-gray-100"
          columns={column}
          isLoading={isFetching}
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

export default ChapterList;
