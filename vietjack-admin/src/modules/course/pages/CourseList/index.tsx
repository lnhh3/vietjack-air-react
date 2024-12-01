import { type ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MyButton from '@/components/common/Button';
import Input from '@/components/common/Input';
import Table from '@/components/common/Table';
import { AppRoutes } from '@/constants';
import { useQueryString } from '@/hooks/useQueryString';
import { CourseDetail } from '@/types/course';

import useGetCoursesList, { CourseListQueryParams } from '../../apis/getPageCourse';
import FreeTag from '../../components/FreeTag';

const CourseList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [queryParams, setQueryParams] = useQueryString<CourseListQueryParams>();
  const { data, isLoading } = useGetCoursesList({ queryParams });

  const columns: ColumnDef<CourseDetail>[] = [
    {
      header: () => t`title`,
      accessorKey: 'title',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <p className="text-sm-bold">{row.original.title}</p>
          <p className="text-gray-400">{row.original.code}</p>
        </div>
      ),
    },
    {
      header: () => t`type`,
      accessorKey: 'courseType',
    },
    {
      header: () => t`price`,
      accessorKey: 'price',
      cell({ row }) {
        return <FreeTag price={row.original.price} />;
      },
    },
    {
      header: () => t`viewed`,
      accessorKey: 'viewed',
    },
  ];

  const timeoutSearch = useRef<any>();

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

  return (
    <div className="p-8 mt-[32px]">
      <div className="flex justify-end mb-4">
        <MyButton onClick={() => navigate(AppRoutes.COURSES.CREATE_COURSE)}>
          {t`createNewCourse`}
        </MyButton>
      </div>
      <div className="w-full border-2 border-gray-100 rounded-[12px]">
        <div className="px-4 py-5">
          <Input
            autoComplete="off"
            spellCheck="false"
            leftSection={<Search />}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t`search`}
            className="max-w-[400px]"
          />
        </div>
        <Table
          pagingData={data}
          isLoading={isLoading}
          onRowClick={(row) => navigate(`/courses/-/${row.slug}`)}
          rowClickable
          tableClassName="w-full"
          headClassName="h-10 border-b-2 border-gray-100"
          columns={columns}
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

export default CourseList;
