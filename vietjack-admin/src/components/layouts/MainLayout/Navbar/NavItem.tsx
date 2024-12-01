import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { cn } from '@/utilities/helper';

import { NavBarItem } from './data';

type Props = {
  data: NavBarItem;
  isSidebarExplain?: boolean;
  asChild?: boolean;
};

const NavItem = ({ data: item, isSidebarExplain, asChild }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();

  const childRoute = useMemo(() => item.children?.map((item) => item.link), [item.children]);

  return (
    <NavLink to={item.link}>
      {({ isActive }) => (
        <>
          <div
            className={cn(
              'flex items-center !text-white gap-3 text-md-semi-bold py-3 px-3 rounded-[12px] mb-1 tracking-wider',
              isActive && '!bg-orange-600 ',
              asChild && 'pl-10'
            )}
          >
            {item.icon}
            {isSidebarExplain && <span>{t(item.title)}</span>}
          </div>
          {item.children &&
            isSidebarExplain &&
            (isActive || childRoute?.includes(location.pathname)) && (
              <>
                {item.children.map((navItem) => (
                  <NavItem
                    key={navItem.key}
                    data={navItem}
                    asChild
                    isSidebarExplain={isSidebarExplain}
                  />
                ))}
              </>
            )}
        </>
      )}
    </NavLink>
  );
};

export default NavItem;
