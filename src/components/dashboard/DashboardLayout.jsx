import { Link, Outlet } from 'react-router-dom';
import { HouseIcon, UsersIcon, ShoppingBagIcon, WalletIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const DashboardLayout = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <h1 className="text-[#0d141c] text-base font-medium leading-normal">MatrixPro</h1>
                  <p className="text-[#49739c] text-sm font-normal leading-normal">ID: 123456</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#e7edf4]">
                    <HouseIcon className="h-6 w-6 text-[#0d141c]" />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Dashboard</p>
                  </Link>
                  <Link to="/dashboard/network" className="flex items-center gap-3 px-3 py-2">
                    <UsersIcon className="h-6 w-6 text-[#0d141c]" />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Network</p>
                  </Link>
                  <Link to="/dashboard/products" className="flex items-center gap-3 px-3 py-2">
                    <ShoppingBagIcon className="h-6 w-6 text-[#0d141c]" />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Products</p>
                  </Link>
                  <Link to="/dashboard/wallet" className="flex items-center gap-3 px-3 py-2">
                    <WalletIcon className="h-6 w-6 text-[#0d141c]" />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Wallet</p>
                  </Link>
                  <Link to="/dashboard/support" className="flex items-center gap-3 px-3 py-2">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-[#0d141c]" />
                    <p className="text-[#0d141c] text-sm font-medium leading-normal">Support</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;