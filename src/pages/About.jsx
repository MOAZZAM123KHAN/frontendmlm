import { UsersIcon, LightBulbIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const About = () => {
  const stats = [
    { id: 1, name: 'Active Members', value: '10,000+' },
    { id: 2, name: 'Products Available', value: '500+' },
    { id: 3, name: 'Total Payouts', value: '$5M+' },
    { id: 4, name: 'Countries', value: '50+' },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative bg-blue-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="About us"
          />
          <div className="absolute inset-0 bg-blue-700 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Our Company
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            We're revolutionizing the way people shop and earn through our unique hybrid platform.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-blue-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by members worldwide
            </h2>
            <p className="mt-3 text-xl text-blue-200">
              Our numbers speak for themselves. Join a thriving community of entrepreneurs.
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="pt-6">
                  <div className="flow-root bg-blue-800 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white text-blue-700 mx-auto">
                        <UsersIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{stat.name}</h3>
                      <p className="mt-2 text-3xl font-extrabold text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="relative bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">Our Story</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How it all began
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <LightBulbIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">The Idea</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Founded in 2018, we saw an opportunity to combine e-commerce with network marketing to create a better shopping and earning experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <UsersIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">The Growth</h3>
                    <p className="mt-5 text-base text-gray-500">
                      What started with 10 members has grown to a global community of thousands, all benefiting from our unique platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">The Future</h3>
                    <p className="mt-5 text-base text-gray-500">
                      We're continuously innovating to provide better products, tools, and earning opportunities for our members.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Meet our leadership</h2>
              <p className="text-xl text-gray-500">
                The passionate team driving our vision forward.
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-3 lg:max-w-5xl">
              {[
                {
                  name: 'Jane Cooper',
                  role: 'CEO & Founder',
                  imageUrl:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                },
                {
                  name: 'John Smith',
                  role: 'CTO',
                  imageUrl:
                    'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                },
                {
                  name: 'Sarah Johnson',
                  role: 'Head of Marketing',
                  imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
                },
              ].map((person) => (
                <li key={person.name}>
                  <div className="space-y-4">
                    <img
                      className="mx-auto h-40 w-40 rounded-full object-cover lg:w-48 lg:h-48"
                      src={person.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
                        <p className="text-blue-600">{person.role}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;