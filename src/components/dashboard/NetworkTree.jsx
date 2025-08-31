import { useMemo } from 'react';
import { Tree } from 'react-d3-tree';

const NetworkTree = () => {
  // Sample MLM tree data (1-2-5 structure)
  const mlmTreeData = useMemo(() => ({
    name: 'You (Level 0)',
    attributes: {
      id: 'user123',
      status: 'Active',
      purchases: 5,
    },
    children: [
      {
        name: 'Level 1 - Left',
        attributes: {
          id: 'user456',
          status: 'Active',
          purchases: 3,
        },
        children: [
          {
            name: 'Level 2 - 1',
            attributes: { id: 'user789', status: 'Active' }
          },
          {
            name: 'Level 2 - 2',
            attributes: { id: 'user101', status: 'Inactive' }
          },
          {
            name: 'Level 2 - 3',
            attributes: { id: 'user102', status: 'Active' }
          }
        ]
      },
      {
        name: 'Level 1 - Right',
        attributes: {
          id: 'user457',
          status: 'Active',
          purchases: 2,
        },
        children: [
          {
            name: 'Level 2 - 4',
            attributes: { id: 'user103', status: 'Active' }
          },
          {
            name: 'Level 2 - 5',
            attributes: { id: 'user104', status: 'Active' }
          }
        ]
      }
    ]
  }), []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Network Tree</h2>
      <div className="w-full h-[500px] border border-gray-200 rounded-lg">
        <Tree
          data={mlmTreeData}
          orientation="vertical"
          translate={{ x: 250, y: 50 }}
          pathFunc="step"
          nodeSize={{ x: 200, y: 100 }}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
            <g>
              <circle
                r="15"
                fill={nodeDatum.attributes?.status === 'Active' ? '#10B981' : '#EF4444'}
                onClick={toggleNode}
              />
              <text
                fill="black"
                strokeWidth="1"
                x="20"
                y="5"
                fontSize="12"
              >
                {nodeDatum.name}
              </text>
              <text
                fill="gray"
                strokeWidth="1"
                x="20"
                y="20"
                fontSize="10"
              >
                ID: {nodeDatum.attributes?.id}
              </text>
            </g>
          )}
        />
      </div>
    </div>
  );
};

export default NetworkTree;