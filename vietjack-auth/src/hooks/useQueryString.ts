import { type SetURLSearchParams, useSearchParams } from 'react-router-dom';

export const useQueryString = <T = any>(initialParams?: T): [T, SetURLSearchParams] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = { ...initialParams, ...Object.fromEntries(searchParams) } as T;
  return [queryParams, setSearchParams];
};
