import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { User } from 'lucide-react';
import { memo, useState } from 'react';

import { cn } from '@/utilities/helper';

type Props = {
  size?: number;
  src?: string;
  iconSize?: number;
  onClick?: () => void;
};

const Avatar = ({ size = 32, iconSize, src, onClick }: Props) => {
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState(src);

  const handleError = () => setIsError(true);

  useIsomorphicLayoutEffect(() => {
    setSource(src);
    setIsError(false);
  }, [src]);

  return (
    <div
      role="presentation"
      className={cn(
        'flex items-center justify-center rounded-full bg-dark-100',
        onClick ? 'cursor-pointer' : 'cursor-auto'
      )}
      style={{
        width: size,
        height: size,
        minHeight: size,
        maxHeight: size,
        minWidth: size,
        maxWidth: size,
      }}
      onClick={onClick}
    >
      {source && !isError ? (
        <img
          className="object-cover w-full h-full rounded-full"
          src={source}
          alt=""
          onError={handleError}
        />
      ) : (
        <User size={iconSize ?? size / 2} />
      )}
    </div>
  );
};

export default memo(Avatar);
