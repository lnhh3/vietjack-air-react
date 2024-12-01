import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';

import FormLogoHeader from '@/components/common/FormLogoHeader';
import StepsRoute from '@/components/common/Steps/StepsRoute';
import { AppRoutes } from '@/constants';

const CreateNewCoursePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <FormLogoHeader
        title={t`createNewCourse`}
        onClose={() => navigate(AppRoutes.COURSES.INDEX)}
      />
      <div className="flex gap-20 px-10 py-8">
        <div className="min-w-[300px]">
          <StepsRoute
            steps={[
              {
                label: t`createNewCourse`,
                url: AppRoutes.COURSES.CREATE_COURSE,
              },
            ]}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewCoursePage;
