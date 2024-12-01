import { FC, memo, useEffect, useState } from 'react';

import { cn } from '@/utilities/helper';

type ObjectFit = 'cover' | 'contain' | 'fill' | 'none';

type Props = {
  src?: string;
  fallback?: string;
  alt?: string;
  imageClassName?: string;
  className?: string;
  objectFit?: ObjectFit;
};

const Image: FC<Props> = (props) => {
  const {
    fallback = '/assets/images/placeholder-image.png',
    src = '',
    alt = '',
    className,
    imageClassName,
    objectFit = 'cover',
  } = props;
  const [imgSrc, setImgSrc] = useState(src);

  const handleImageError = () => {
    setImgSrc(fallback);
  };

  useEffect(() => {
    if (src !== imgSrc) {
      setImgSrc(src);
    }
  }, [src]);

  const objectFitData = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  return (
    <div className={cn('w-full h-full', className)}>
      <img
        src={imgSrc}
        alt={alt}
        onError={handleImageError}
        className={cn('w-full h-full rounded', objectFitData[objectFit], imageClassName)}
      />
    </div>
  );
};

export default memo(Image);
