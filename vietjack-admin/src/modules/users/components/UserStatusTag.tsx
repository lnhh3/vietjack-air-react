import Tag from '@/components/common/Tag';
import { ETagColor } from '@/types/tags';
import { UserStatus } from '@/types/user';

const UserStatusTag = ({ status }: { status: UserStatus }) => {
  const render = () => {
    switch (status) {
      case UserStatus.ACTIVE:
        return <Tag name={UserStatus.ACTIVE} type={ETagColor.green} />;
      case UserStatus.INACTIVE:
        return <Tag name={UserStatus.INACTIVE} type={ETagColor.gray} />;
      default:
        break;
    }
  };

  return render();
};

export default UserStatusTag;
