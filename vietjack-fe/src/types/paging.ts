export type PagingResponse<T> = {
  content: T[];
} & PaginationObject;

export type PaginationObject = {
  elementPerPage: number;
  currentPage: number;
  totalPages: number;
  totalElements: number;
};
