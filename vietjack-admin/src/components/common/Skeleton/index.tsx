import { twMerge } from 'tailwind-merge';

type Props = {
  parentClassName?: string;
  childClassName?: string;
};
export const Skeleton = ({ parentClassName = '', childClassName = '' }: Props) => {
  return (
    <div className={twMerge('w-full animate-pulse p-3', parentClassName)}>
      <div
        className={twMerge('h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700', childClassName)}
      ></div>
    </div>
  );
};
