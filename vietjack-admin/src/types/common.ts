import { MouseEvent } from 'react';

export type Nullable<T> = T | null;

export type FalsyAble<T> = T | undefined | null | '' | 0 | false;

export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type WithRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<T, K>;

export type MouseEventClick = MouseEvent<HTMLDivElement, globalThis.MouseEvent>;

export type PagingResponse<T = any> = {
  content: T[];
  totalItems: number;
  numberOfItems: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
};

export type PagingWithoutContent = Omit<PagingResponse, 'content'>;

export enum SystemStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
