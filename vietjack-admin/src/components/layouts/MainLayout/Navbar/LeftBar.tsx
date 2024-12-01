import { navbarModule } from './data';
import NavItem from './NavItem';

const LeftBar = ({ isSidebarExplain }: { isSidebarExplain: boolean }) => {
  return (
    <div className="px-4 mt-8">
      {navbarModule && (
        <>
          {navbarModule.map((navItem) => (
            <NavItem key={navItem.key} data={navItem} isSidebarExplain={isSidebarExplain} />
          ))}
        </>
      )}
    </div>
  );
};

export default LeftBar;
