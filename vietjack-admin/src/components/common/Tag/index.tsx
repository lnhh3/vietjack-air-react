import React from 'react';
import { twMerge } from 'tailwind-merge';

import { tagColors } from '@/constants/tag';
import { ETagColor } from '@/types/tags';

export enum ETagSize {
  sm = 'sm',
  lg = 'lg',
}

type Props = {
  name: string;
  type: ETagColor;
  size?: ETagSize;
  leftIcon?: React.ReactNode;
  className?: string;
};

function Tag({ name, type, size = ETagSize.sm, leftIcon, className }: Props) {
  const tagColor = tagColors[type];

  return (
    <span
      className={twMerge(
        tagColor,
        'inline-flex items-center rounded-2xl px-2 py-0.5 !text-xs-medium',
        className,
        size === ETagSize.lg && 'py-1 !text-sm-medium'
      )}
    >
      <span className="truncate text-ellipsis text-xs-medium">{name}</span>
      {leftIcon && <span className="ml-1">{leftIcon}</span>}
    </span>
  );
}

export default Tag;
