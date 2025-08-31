import { Link } from 'react-router-dom';
import DownlineMembers from '../components/dashboard/DownlineMembers';

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <h1 className="text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</h1>
      </div>
      
      <h3 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Network Position</h3>
      <div className="flex w-full grow bg-slate-50 p-4">
        <div className="w-full gap-1 overflow-hidden bg-slate-50 aspect-[3/2] rounded-lg flex">
          <div 
            className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_6rC9osJ48z-e4VOq-iK9KNNZCTAROdyRVSjKbNrML0r1qcwuWjKwQL6c_wA5npa7nBo6FEnxY-UWAwfbYTifv5KdP1GyuXZ_PKaGnzX8wVO-vCRbexCOuiM5Dt6J-XgPIA-Y63fWxs4V3rz7Ah11EsGlErIy3xIlDvJ42DXXue_RgdEVDH6nmwZSvZCwB1LriIg1kdoOS0lGE8YxpMy0Zcjpmu7dK5fmcECQ04IjTPSc1J_N332ODpBSawz6vI7aggmp1s6rgwCi")' }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Purchase Options</h3>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-lg bg-slate-50 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
          <div className="flex flex-[2_2_0px] flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#0d141c] text-base font-bold leading-tight">Basic Package</p>
              <p className="text-[#49739c] text-sm font-normal leading-normal">Unlock the first level of the matrix and start earning.</p>
            </div>
            <Link to="/products/basic-package" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#e7edf4] text-[#0d141c] text-sm font-medium leading-normal w-fit">
              <span className="truncate">Purchase</span>
            </Link>
          </div>
          <div 
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCt9imCzE6edAI3kqMKEVh4EjwfcwC-xjkGLYwrY5JVGWPvYeq14tzqg85wyfxVbIDYADa7i0HEi1rSEnik0-g2a39rmEdq5jlahtgLw4kfqKdkgsWzzE1MS01mFa6Llo1EG4ZEK83eWmfF8GylJqfvSpy2CCuU_BOj2tuA6XixW-lq3hjS-hTfVgam3i-4_0cAB8bKBiIo02qDi1p8zGVsq_9KvfZuMmudRa-GI3DhnflUKKMUh9B-iWsgPsn37Tz105AQPAGvI25p")' }}
          ></div>
        </div>
      </div>
      
      <h3 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Wallet Balance</h3>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#e7edf4]">
          <p className="text-[#0d141c] text-base font-medium leading-normal">Available Balance</p>
          <p className="text-[#0d141c] tracking-light text-2xl font-bold leading-tight">$500.00</p>
        </div>
      </div>
      
      <h3 className="text-[#0d141c] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Downline Members</h3>
      <DownlineMembers />
    </>
  );
};

export default Dashboard;