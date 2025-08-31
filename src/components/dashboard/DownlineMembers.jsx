const DownlineMembers = () => {
  const members = [
    { id: 1, name: 'Ethan Harper', position: 'Level 1', status: 'Active' },
    { id: 2, name: 'Olivia Bennett', position: 'Level 1', status: 'Active' },
    { id: 3, name: 'Noah Carter', position: 'Level 2', status: 'Inactive' },
    { id: 4, name: 'Ava Mitchell', position: 'Level 2', status: 'Active' },
    { id: 5, name: 'Liam Foster', position: 'Level 3', status: 'Inactive' },
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex overflow-hidden rounded-lg border border-[#cedbe8] bg-slate-50">
        <table className="flex-1">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">Name</th>
              <th className="px-4 py-3 text-left text-[#0d141c] w-[400px] text-sm font-medium leading-normal">Position</th>
              <th className="px-4 py-3 text-left text-[#0d141c] w-60 text-sm font-medium leading-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t border-t-[#cedbe8]">
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d141c] text-sm font-normal leading-normal">
                  {member.name}
                </td>
                <td className="h-[72px] px-4 py-2 w-[400px] text-[#49739c] text-sm font-normal leading-normal">
                  {member.position}
                </td>
                <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                  <button
                    className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 ${
                      member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-[#e7edf4] text-[#0d141c]'
                    } text-sm font-medium leading-normal w-full`}
                  >
                    <span className="truncate">{member.status}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownlineMembers;