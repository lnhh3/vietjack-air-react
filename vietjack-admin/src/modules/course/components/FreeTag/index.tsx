import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Tag from '@/components/common/Tag';
import { ETagColor } from '@/types/tags';
import { formatNumber } from '@/utilities/helper';

type Props = {
  price: number;
};

const FreeTag: FC<Props> = ({ price }) => {
  const { t } = useTranslation();

  const isFree = price <= 0;

  return (
    <Tag
      name={isFree ? t`free` : `${formatNumber(price)} VND`}
      type={isFree ? ETagColor.blue : ETagColor.orange}
    ></Tag>
  );
};

export default FreeTag;
