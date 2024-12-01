import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PagingWithoutContent } from '@/types/common';
import { cn } from '@/utilities/helper';

import { Pagination } from '../Pagination';
import { Skeleton } from '../Skeleton';

export type SortBy<T extends object> = {
  isAscSort?: boolean;
  sortField?: keyof T | string;
};

type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  rowClickable?: boolean;
  isLoading?: boolean;
  className?: string;
  sortBy?: SortBy<T>;
  tableClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  footClassName?: string;
  renderEmpty?: ReactNode;
  pagingData?: PagingWithoutContent;
  onPagingDataChange?: (value: { pageNumber: number; pageSize: number }) => void;
  onSortByChange?: (value: { ascSort?: boolean; sortField?: keyof T | string }) => void;
  onRowClick?: (row: T) => void;
};

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    data,
    columns,
    rowClickable = false,
    tableClassName,
    headClassName,
    bodyClassName,
    footClassName,
    className,
    renderEmpty,
    isLoading,
    pagingData,
    sortBy,

    onSortByChange,
    onPagingDataChange,
    onRowClick,
  } = props;
  const { t } = useTranslation();

  const tableInstance = useReactTable<T>({
    columns,
    data,
    manualPagination: true,

    getCoreRowModel: getCoreRowModel<T>(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderSortIcon = (id: string) => {
    return (
      <div className={cn(sortBy?.sortField !== id && 'invisible group-hover:visible')}>
        {sortBy?.sortField === id && sortBy.isAscSort ? (
          <ArrowUpIcon width="15px" height="15px" />
        ) : (
          <ArrowDownIcon width="15px" height="15px" />
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!data.length && (pagingData?.totalPages ?? 1) > 1) {
      onPagingDataChange?.({
        pageNumber: pagingData?.totalPages || 1,
        pageSize: pagingData?.pageSize || 10,
      });
    }
  }, [data.length]);

  return (
    <div className={className}>
      <table className={tableClassName}>
        {!isLoading &&
          data.length <= 0 &&
          (renderEmpty ?? (
            <div className="flex justify-center w-1/3 mx-auto my-10">
              <div>
                <div className="flex justify-center m-auto mb-6">
                  <img src="/assets/images/NoDataFound.png" alt="no data found" />
                </div>

                <div className="flex flex-col justify-center gap-2 text-center">
                  <p className="text-gray-900 text-xl-semi-bold">{t('noDataFound')}</p>
                  <p className="text-gray-600 text-md-regular">{t('noDataFoundDesc')}</p>
                </div>
              </div>
            </div>
          ))}
        {data.length > 0 && (
          <>
            <thead className={headClassName}>
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'px-6 py-3 text-left !text-xs-medium capitalize text-gray-600 last:text-right',
                        sortBy && header.column.getCanSort() && 'cursor-pointer'
                      )}
                      style={{
                        minWidth: header.column.columnDef.minSize,
                        width: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.maxSize,
                      }}
                      onClick={() => {
                        if (!sortBy || !header.column.getCanSort()) return;
                        onSortByChange?.({
                          sortField: header.id,
                          ascSort: sortBy?.sortField === header.id ? !sortBy.isAscSort : false,
                        });
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sortBy && header.column.getCanSort() && (
                            <div>{renderSortIcon(header.id)}</div>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className={bodyClassName}>
              {isLoading &&
                Array(10)
                  .fill('')
                  .map((_, index) => (
                    <tr className="h-[72px] border-b border-gray-200 last:border-b-0" key={index}>
                      {columns.map((cell, index) => (
                        <td
                          key={index}
                          style={{
                            minWidth: cell.minSize,
                            width: cell.size,
                            maxWidth: cell.maxSize,
                          }}
                        >
                          <Skeleton childClassName="py-3" />
                        </td>
                      ))}
                    </tr>
                  ))}
              {!isLoading &&
                tableInstance.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="'h-[72px] border-b border-gray-200 text-gray-900 last:border-b-0',"
                    onClick={() => rowClickable && onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-6 py-4 text-sm-regular"
                        style={{
                          minWidth: cell.column.columnDef.minSize,
                          width: cell.column.columnDef.size,
                          maxWidth: cell.column.columnDef.maxSize,
                        }}
                        key={cell.id}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
            <tfoot className={footClassName}>
              {tableInstance.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <th
                      key={footer.id}
                      style={{
                        minWidth: footer.column.columnDef.minSize,
                        width: footer.column.columnDef.size,
                        maxWidth: footer.column.columnDef.maxSize,
                      }}
                    >
                      {footer.isPlaceholder
                        ? null
                        : flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </>
        )}
      </table>
      <div className="bg-white">
        {!!data.length && pagingData && (
          <Pagination
            totalPages={pagingData?.totalPages || 10}
            setPageIndex={(value) => onPagingDataChange?.({ pageNumber: value + 1, pageSize: 10 })}
            setPageSize={(value) => onPagingDataChange?.({ pageNumber: 1, pageSize: value })}
            pageSize={pagingData.pageSize}
            pageIndex={pagingData.pageNumber}
            numberOfElements={pagingData?.numberOfItems}
            totalElements={pagingData.totalItems}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
