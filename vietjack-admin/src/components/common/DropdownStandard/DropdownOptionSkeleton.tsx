import { Skeleton } from '../Skeleton';

export const DropdownOptionSkeleton = () => {
  return (
    <li className="flex h-11 cursor-progress items-center px-3.5 py-2.5">
      <Skeleton parentClassName="flex items-center p-0" childClassName="h-4 w-full" />
    </li>
  );
};
