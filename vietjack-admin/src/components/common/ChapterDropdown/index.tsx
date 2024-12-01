import { FC } from 'react';

import useGetChapter from '@/modules/chapter/apis/getChapter';

import { DropdownStandard } from '../DropdownStandard';

type Props = {
  courseId?: string;
  courseSlug?: string;
  onChange?: (val?: string) => void;
};

const ChapterDropdown: FC<Props> = ({ courseId, onChange }) => {
  const { data } = useGetChapter({
    courseId: courseId || '',
  });

  return (
    <div className="mt-5">
      <DropdownStandard
        containerClassName="min-w-[400px]"
        label="Previous chapter"
        onChange={(val) => onChange?.(val as string)}
        canSearch
        options={
          data?.content?.map((item) => ({
            label: item.title,
            value: item.id,
          })) ?? []
        }
      />
    </div>
  );
};

export default ChapterDropdown;
