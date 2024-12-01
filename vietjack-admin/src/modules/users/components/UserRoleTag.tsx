import Tag from '@/components/common/Tag';
import { ETagColor } from '@/types/tags';
import { UserRole } from '@/types/user';

const UserRoleTag = ({ role }: { role: UserRole }) => {
  const render = () => {
    switch (role) {
      case UserRole.ADMIN:
        return <Tag name={UserRole.ADMIN} type={ETagColor.error} />;
      case UserRole.USER:
        return <Tag name={UserRole.USER} type={ETagColor.blue} />;
      default:
        break;
    }
  };

  return render();
};

export default UserRoleTag;
