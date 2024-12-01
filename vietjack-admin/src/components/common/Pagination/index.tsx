import { MoveLeft, MoveRight } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';

import { DropdownStandard, TDropdownOption } from '@/components/common/DropdownStandard';

type Props = {
  totalPages: number;
  pageSize?: number;
  pageIndex: number;
  numberOfElements: number;
  totalElements: number;
  pageSizeOptions?: TDropdownOption[];
  setPageIndex: (page: number) => void;
  setPageSize: (page: number) => void;
  customElements?: ReactNode;
};

/**
 * @param totalPages total page
 * @param pageSize page size default is 50
 * @param pageSizeOptions page size option used for dropdown page option: default: [10,20,50]
 * @param pageIndex current page
 * @param totalElements total element
 * @param numberOfElements total element in current page
 * @param setPageIndex to set page index
 * @param setPageSize to set page size
 */
export const Pagination = ({
  totalPages,
  pageSize = 10,
  pageSizeOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 },
  ],
  pageIndex,
  totalElements,
  numberOfElements,
  setPageIndex,
  setPageSize,
  customElements,
}: Props) => {
  const { t } = useTranslation();

  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(window.innerWidth > 1280 ? 3 : 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) {
        setPageRangeDisplayed(3);
        return;
      }

      setPageRangeDisplayed(0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-2.5 border-t p-6">
      <ReactPaginate
        breakLabel={<span className="w-10 h-10 leading-10">...</span>}
        nextLabel={
          <span className="flex items-center justify-center w-full h-full">
            <MoveRight />
          </span>
        }
        onPageChange={(selectedItem) => setPageIndex(selectedItem.selected)}
        forcePage={pageIndex - 1}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        previousLabel={
          <span className="flex items-center justify-center w-full h-full">
            <MoveLeft />
          </span>
        }
        containerClassName="flex items-center text-sm-medium text-gray-600 text-center gap-2 md:gap-4 lg:gap-8"
        pageLinkClassName="block justify-between items-center h-10 w-10 leading-10 text-center"
        activeLinkClassName="text-gray-800 bg-gray-50 rounded-full"
        previousLinkClassName="block h-10 w-10 leading-10 border shadow-xs rounded-lg"
        disabledLinkClassName="cursor-default opacity-50"
        nextLinkClassName="block h-10 w-10 leading-10 text-center border shadow-xs rounded-lg"
      />

      <div className="w-full">{customElements}</div>

      <div className="flex items-center gap-4">
        <p className="text-gray-400 whitespace-nowrap text-sm-regular">{t('rowPerPage')}</p>

        <DropdownStandard
          dropdownClassName="lg:!w-[110px]"
          options={pageSizeOptions}
          defaultValue={pageSize}
          onChange={(val) => {
            setPageSize(Number(val));
          }}
        />

        <p className="text-gray-400 whitespace-nowrap text-sm-regular">
          {t('paginator', {
            startIndex: (pageIndex - 1) * pageSize + 1,
            endIndex: (pageIndex - 1) * pageSize + numberOfElements,
            totalElement: totalElements,
          })}
        </p>
      </div>
    </div>
  );
};
