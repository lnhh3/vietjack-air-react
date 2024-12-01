import { omit } from "next/dist/shared/lib/router/utils/omit";
import { useCallback, useEffect, useRef, useState } from "react";

import { HttpResponse } from "@/http/type";
import { PaginationObject, PagingResponse } from "@/types/paging";

type CallbackFetchParams = {
  page: number;
};

type Params<T> = {
  onSuccess?: (response: PagingResponse<T>) => void;
  onError?: (error: HttpResponse) => void;
  onStartFetch?: (data: { currentPage: number }) => void;
  fetchOnMount?: boolean;
  filter?: (data: T[]) => T[];
  initialData?: T[];
};

type FetchDataParams = CallbackFetchParams & {
  enableLoading?: boolean;
};

const initPagination: PaginationObject = {
  elementPerPage: 0,
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
};

const useFetchPaging = <T>(
  callbackFetch: (params: CallbackFetchParams) => Promise<PagingResponse<T>>,
  params: Params<T>,
) => {
  const {
    initialData = [],
    fetchOnMount = true,
    onSuccess,
    onError,
    onStartFetch,
    filter = (data) => data,
  } = params;

  const callRef = useRef(callbackFetch);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);

  const [data, setData] = useState<T[]>(initialData);
  const [pagination, setPagination] =
    useState<PaginationObject>(initPagination);

  const fetchData = useCallback(
    async (
      { page = 1, enableLoading }: FetchDataParams = {
        page: 1,
        enableLoading: true,
      },
    ) => {
      try {
        if (enableLoading) setIsLoading(true);
        onStartFetch?.({
          currentPage: page,
        });
        const res = await callRef.current?.({ page: page ?? 1 });

        if (page === 1) {
          setHasLoadMore(true);
        } else if (res.currentPage >= res.totalPages) {
          setHasLoadMore(false);
        }
        setPagination({
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          totalElements: res.totalElements,
          elementPerPage: res.elementPerPage,
        });
        setData(
          page === 1
            ? (filter(res.content) ?? [])
            : (prev) => filter([...prev, ...res.content]),
        );
        if (enableLoading) setIsLoading(false);
        onSuccess?.(res);
        return res;
      } catch (e) {
        console.log("~ fetchData: ", e);
        onError?.(e as never);
        if (enableLoading) setIsLoading(false);
      }
    },
    [filter, onError, onStartFetch, onSuccess],
  );

  const fetchMore = useCallback(async () => {
    if (
      !hasLoadMore ||
      isLoading ||
      pagination.currentPage === 0 ||
      pagination.currentPage >= pagination.totalPages
    )
      return;
    try {
      setIsLoadingMore(true);
      await fetchData({
        page: pagination.currentPage + 1,
        enableLoading: false,
      });
      setIsLoadingMore(false);
    } catch (e) {
      setIsLoadingMore(false);
    }
  }, [fetchData, hasLoadMore, isLoading, pagination]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsLoadingMore(false);
    setHasLoadMore(false);
    setData([]);
    setPagination(initPagination);
  }, []);

  useEffect(() => {
    callRef.current = callbackFetch;
  }, [callbackFetch]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, []);

  return {
    isLoading,
    data: data ?? [],
    pagination,
    isLoadingMore,
    hasLoadMore,
    fetchData,
    fetchMore,
    reset,
  } as const;
};

export default useFetchPaging;
