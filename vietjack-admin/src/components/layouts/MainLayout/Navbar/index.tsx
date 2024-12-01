import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '@/constants';
import { cn } from '@/utilities/helper';

import LeftBar from './LeftBar';

const NavbarContainer = () => {
  const [isExplainNav, setIsExplainNav] = useState(true);

  return (
    <div
      className={cn(
        'bg-white',
        'bg-gradient-to-tr from-blue-500 to-blue-900',
        'w-20 relative min-h-full transition-all rounded-[32px]',
        isExplainNav && 'w-[280px]'
      )}
    >
      <div
        className={cn(
          'flex flex-col h-full pt-6 pb-12 transition-all',
          !isExplainNav && 'items-center'
        )}
      >
        <div className="flex items-center">
          <Link to={AppRoutes.INDEX} className="flex items-center flex-1 gap-3 px-4">
            <div
              className={cn('w-10 h-10 rounded-[8px] transition-all', !isExplainNav && 'w-8 h-8')}
            >
              <img className="w-full h-full" src="/assets/TechPlatformLogo.png" alt="" />
            </div>
            <span
              className={cn(
                'tracking-wide text-xl-bold transition-all',
                !isExplainNav && 'hidden',
                '!text-white'
              )}
            >
              Techplatform
            </span>
          </Link>
          <button
            onClick={() => setIsExplainNav((p) => !p)}
            className={cn(
              'flex absolute top-6 hover:bg-gray-100 -right-4 bg-white border border-gray-25 items-center justify-center mr-2 transition-all rounded-full w-6 h-6 m-1',
              isExplainNav && 'rotate-180 w-7 h-7'
            )}
          >
            <ChevronRight />
          </button>
        </div>
        <LeftBar isSidebarExplain={isExplainNav} />
      </div>
    </div>
  );
};

export default NavbarContainer;
