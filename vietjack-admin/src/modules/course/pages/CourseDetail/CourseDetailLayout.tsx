import { SquareGanttChart } from 'lucide-react';

import BreadcrumbHeader from '@/components/common/BreadcrumbHeader';
import { AppRoutes } from '@/constants';
import { CourseAllDataDetail } from '@/types/course';

const CourseDetailLayout = ({ data }: { data?: CourseAllDataDetail['course'] }) => {
  const items = [
    {
      title: 'Techplatform',
      path: AppRoutes.DASHBOARD.INDEX,
    },
    {
      title: 'courses',
      path: AppRoutes.COURSES.INDEX,
    },
  ];

  if (data) {
    items.push({
      title: data.title,
      path: `/courses/-/${data.slug}`,
    });
  }

  return (
    <>
      <BreadcrumbHeader
        breadcrumb={{
          icon: <SquareGanttChart color="#667085" size={20} />,
          items: items,
        }}
      />
    </>
  );
};

export default CourseDetailLayout;
