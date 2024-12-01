import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/constants';
import httpRequest from '@/https/Axios';
import { PagingResponse, SystemStatus } from '@/types/common';
import { UserDetail } from '@/types/user';

export enum TransactionStatus {
  FAILED = 'FAILED',
  SUCCEED = 'SUCCEED',
  PENDING = 'PENDING',
}

export enum TransactionType {
  BUY_COURSE = 'BUY_COURSE',
}

export type TransactionRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchKey?: string;
  transactionStatus?: TransactionStatus;
  type?: TransactionType;
  referenceId?: string;
};

export type TransactionResponse = {
  id: string;
  user: UserDetail;
  amount: number;
  referenceId: string;
  note: string;
  transactionType: TransactionType;
  status: TransactionStatus;
  systemStatus: SystemStatus;
  createAt: number;
  updateAt: number | null;
  detail: any;
};

const fetchTrans = async (req: TransactionRequest = {}) => {
  const res = await httpRequest.get<PagingResponse<TransactionResponse>>(ApiPath.TRANSACTION.PAGE, {
    params: req,
  });
  return res.data;
};

const useGetTransaction = (req: TransactionRequest = {}) =>
  useQuery({
    queryKey: ['transaction', req],
    queryFn: () => fetchTrans(req),
  });

export default useGetTransaction;
