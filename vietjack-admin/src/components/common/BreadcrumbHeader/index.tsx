import Breadcrumbs from '@/components/common/Breadcrumb';

import { BreadcrumbProps } from '../Breadcrumb';
import UserProfilePopup from '../UserProfilePopup';

type Props = {
  breadcrumb: BreadcrumbProps;
};

function BreadcrumbHeader({ breadcrumb }: Props) {
  return (
    <div className="flex items-center justify-between px-[32px]">
      <div>
        <Breadcrumbs items={breadcrumb.items} icon={breadcrumb.icon} />
      </div>

      <div>
        <UserProfilePopup />
      </div>
    </div>
  );
}

export default BreadcrumbHeader;
