import { Outlet } from 'react-router-dom';

import NavbarContainer from './Navbar';

const MainLayout = () => {
  return (
    <div className="relative flex flex-col h-full min-h-screen overflow-hidden bg-gray-200">
      <div className="flex flex-row flex-1 h-full gap-5 py-3 pl-3">
        <NavbarContainer />
        <div className="full-scale flex-1 bg-white rounded-l-[36px] flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="relative flex flex-col flex-1 h-full py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
