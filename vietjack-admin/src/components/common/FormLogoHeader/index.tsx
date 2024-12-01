import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { AppRoutes } from '@/constants';

import styles from './index.module.scss';

type Props = {
  onClose: () => void;
  title?: string;
  hasProgress?: boolean;
};
export default function FormLogoHeader({ onClose = () => {}, title, hasProgress = true }: Props) {
  return (
    <>
      <div className={twMerge(styles.headerBg, 'p-10 pb-[17px]')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-white">
            <Link to={AppRoutes.INDEX} className="text-display-xs-bold">
              Techplatform
            </Link>
            <div className="my-[5px] w-[2px] self-stretch bg-primary-400"></div>
            <p className="text-lg-bold">{title}</p>
          </div>

          <div role="presentation" className="text-white cursor-pointer" onClick={onClose}>
            <X width="40" height="40" />
          </div>
        </div>
      </div>

      <div className="relative h-1.5 bg-gray-200">
        {hasProgress && (
          <div
            className={twMerge('absolute h-1.5 w-2/5 rounded-r-lg', styles.highlightProgress)}
          ></div>
        )}
      </div>
    </>
  );
}
