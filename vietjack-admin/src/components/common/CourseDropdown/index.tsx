import { FC } from 'react';

import useGetCoursesList from '@/modules/course/apis/getPageCourse';

import { DropdownStandard } from '../DropdownStandard';

type Props = {
  courseId: string;
  onChange?: (value?: string) => void;
};

const CourseDropdown: FC<Props> = ({ courseId, onChange }) => {
  const { data } = useGetCoursesList({
    queryParams: {},
  });

  const handleChange = (val?: string) => {
    onChange?.(val);
  };

  return (
    <div className="mt-5">
      <DropdownStandard
        containerClassName="min-w-[400px]"
        label="Course"
        onChange={(val) => handleChange?.(val as string)}
        selectedValue={courseId}
        canSearch
        showClearIcon
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

export default CourseDropdown;
