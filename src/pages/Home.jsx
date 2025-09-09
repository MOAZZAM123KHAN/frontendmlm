// // import { Link, useParams } from 'react-router-dom';
// // import { 
// //   ArrowRightIcon,
// //   ChartBarIcon,
// //   UsersIcon,
// //   ShoppingBagIcon,
// //   CurrencyDollarIcon,
// //   StarIcon,
// //   ShieldCheckIcon,
// //   RocketLaunchIcon
// // } from '@heroicons/react/24/outline';

// // const Home = () => {
// //   const { userId } = useParams();
// //   const features = [
// //     {
// //       name: 'Earn Commissions',
// //       description: 'Get paid for every purchase made through your network with our competitive commission structure.',
// //       icon: CurrencyDollarIcon,
// //       color: 'text-green-600',
// //       bgColor: 'bg-green-100',
// //     },
// //     {
// //       name: 'Build Your Team',
// //       description: 'Grow your downline and increase your earning potential with our proven MLM system.',
// //       icon: UsersIcon,
// //       color: 'text-blue-600',
// //       bgColor: 'bg-blue-100',
// //     },
// //     {
// //       name: 'Quality Products',
// //       description: 'Offer premium products that people love to buy, ensuring customer satisfaction and repeat sales.',
// //       icon: ShoppingBagIcon,
// //       color: 'text-purple-600',
// //       bgColor: 'bg-purple-100',
// //     },
// //     {
// //       name: 'Track Performance',
// //       description: 'Real-time analytics and insights to monitor your network growth and optimize your strategy.',
// //       icon: ChartBarIcon,
// //       color: 'text-orange-600',
// //       bgColor: 'bg-orange-100',
// //     },
// //   ];

// //   const stats = [
// //     { label: 'Active Members', value: '50,000+', change: '+12%', positive: true },
// //     { label: 'Products Sold', value: '2.5M+', change: '+8%', positive: true },
// //     { label: 'Total Commissions', value: '$15M+', change: '+15%', positive: true },
// //     { label: 'Countries', value: '25+', change: '+3', positive: true },
// //   ];

// //   const testimonials = [
// //     {
// //       name: 'Sarah Johnson',
// //       role: 'Diamond Member',
// //       content: 'ShopSmart has transformed my life. I\'ve built a successful network and earned over $50,000 in commissions.',
// //       avatar: 'SJ',
// //       rating: 5,
// //     },
// //     {
// //       name: 'Michael Chen',
// //       role: 'Platinum Member',
// //       content: 'The quality of products and the support system here is unmatched. Highly recommended!',
// //       avatar: 'MC',
// //       rating: 5,
// //     },
// //     {
// //       name: 'Emily Rodriguez',
// //       role: 'Gold Member',
// //       content: 'Started 6 months ago and already seeing amazing results. The training resources are excellent.',
// //       avatar: 'ER',
// //       rating: 5,
// //     },
// //   ];

// //   const benefits = [
// //     {
// //       title: 'Flexible Work Schedule',
// //       description: 'Work from anywhere, anytime. Build your business around your lifestyle.',
// //       icon: ClockIcon,
// //     },
// //     {
// //       title: 'Comprehensive Training',
// //       description: 'Access to extensive training materials, webinars, and mentorship programs.',
// //       icon: AcademicCapIcon,
// //     },
// //     {
// //       title: 'Advanced Technology',
// //       description: 'State-of-the-art platform with mobile apps and real-time tracking.',
// //       icon: DevicePhoneMobileIcon,
// //     },
// //     {
// //       title: 'Global Network',
// //       description: 'Connect with members worldwide and expand your reach internationally.',
// //       icon: GlobeAltIcon,
// //     },
// //   ];

// //   return (
// //     <div className="bg-white">
// //       {/* Hero Section */}
// //       <section className="hero-section">
// //         <div className="hero-content">
// //           <div className="max-w-4xl">
// //             <h1 className="hero-title">
// //               <span className="block">Shop Smart,</span>
// //               <span className="block text-primary-200">Earn Smarter</span>
// //             </h1>
// //             <p className="hero-subtitle">
// //               Join our revolutionary hybrid e-commerce and MLM platform. Shop premium products while building a profitable network and earning unlimited commissions.
// //             </p>
// //             <div className="hero-cta">
// //               <Link
// //                 to={userId ? `/user/${userId}/register` : "/register"}
// //                 className="btn btn-primary btn-lg"
// //               >
// //                 Start Earning Today
// //                 <ArrowRightIcon className="ml-2 h-5 w-5" />
// //               </Link>
// //               <Link
// //                 to={userId ? `/user/${userId}/shop` : "/shop"}
// //                 className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary-600"
// //               >
// //                 Explore Products
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
        
// //         {/* Background decoration */}
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle"></div>
// //           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="section-container bg-white">
// //         <div className="container-responsive">
// //           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
// //                   {stat.value}
// //                 </div>
// //                 <div className="text-sm text-secondary-600 mb-1">
// //                   {stat.label}
// //                 </div>
// //                 <div className={`text-xs font-medium ${stat.positive ? 'text-success-600' : 'text-danger-600'}`}>
// //                   {stat.change} from last month
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Features Section */}
// //       <section className="section-container bg-secondary-50">
// //         <div className="container-responsive">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
// //               Why Choose ShopSmart?
// //             </h2>
// //             <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
// //               Our unique platform combines the best of e-commerce with multi-level marketing opportunities, 
// //               creating a win-win ecosystem for shoppers and entrepreneurs.
// //             </p>
// //           </div>

// //           <div className="feature-grid">
// //             {features.map((feature, index) => (
// //               <div key={feature.name} className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
// //                 <div className={`feature-icon ${feature.bgColor}`}>
// //                   <feature.icon className={`h-8 w-8 ${feature.color}`} aria-hidden="true" />
// //                 </div>
// //                 <h3 className="text-xl font-semibold text-secondary-900 mb-3">
// //                   {feature.name}
// //                 </h3>
// //                 <p className="text-secondary-600 leading-relaxed">
// //                   {feature.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Benefits Section */}
// //       <section className="section-container bg-white">
// //         <div className="container-responsive">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-6">
// //                 Unlock Your Earning Potential
// //               </h2>
// //               <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
// //                 Join thousands of successful entrepreneurs who have transformed their lives through our platform. 
// //                 Start with zero investment and build your empire from the ground up.
// //               </p>
              
// //               <div className="space-y-6">
// //                 {benefits.map((benefit, index) => (
// //                   <div key={benefit.title} className="flex items-start space-x-4">
// //                     <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
// //                       <benefit.icon className="h-6 w-6 text-primary-600" />
// //                     </div>
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-secondary-900 mb-2">
// //                         {benefit.title}
// //                       </h3>
// //                       <p className="text-secondary-600">
// //                         {benefit.description}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
            
// //             <div className="relative">
// //               <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
// //                 <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
// //                 <p className="text-primary-100 mb-6">
// //                   Join our community today and start your journey to financial freedom.
// //                 </p>
// //                 <div className="space-y-4">
// //                   <div className="flex items-center space-x-3">
// //                     <ShieldCheckIcon className="h-5 w-5 text-primary-200" />
// //                     <span>No upfront investment required</span>
// //                   </div>
// //                   <div className="flex items-center space-x-3">
// //                     <RocketLaunchIcon className="h-5 w-5 text-primary-200" />
// //                     <span>Start earning immediately</span>
// //                   </div>
// //                   <div className="flex items-center space-x-3">
// //                     <UsersIcon className="h-5 w-5 text-primary-200" />
// //                     <span>Join our supportive community</span>
// //                   </div>
// //                 </div>
// //                 {/* <Link
// //                   to={userId ? `/user/${userId}/register` : "/register"}
// //                   className="btn btn-lg bg-white text-primary-600 hover:bg-primary-50 mt-6 w-full justify-center"
// //                 >
// //                   Get Started Now
// //                 </Link> */}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials Section */}
// //       <section className="section-container bg-secondary-50">
// //         <div className="container-responsive">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
// //               Success Stories
// //             </h2>
// //             <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
// //               Hear from our members who have achieved remarkable success with ShopSmart.
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {testimonials.map((testimonial, index) => (
// //               <div key={testimonial.name} className="card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
// //                 <div className="flex items-center mb-4">
// //                   <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold mr-4">
// //                     {testimonial.avatar}
// //                   </div>
// //                   <div>
// //                     <h4 className="font-semibold text-secondary-900">{testimonial.name}</h4>
// //                     <p className="text-sm text-secondary-600">{testimonial.role}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center mb-4">
// //                   {[...Array(testimonial.rating)].map((_, i) => (
// //                     <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
// //                   ))}
// //                 </div>
// //                 <p className="text-secondary-600 italic">"{testimonial.content}"</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* CTA Section */}
// //       <section className="section-container bg-primary-600">
// //         <div className="container-responsive text-center">
// //           <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
// //             Ready to Transform Your Life?
// //           </h2>
// //           <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
// //             Join thousands of successful entrepreneurs who have already started their journey with ShopSmart. 
// //             Your future starts today.
// //           </p>
// //           <div className="flex flex-col sm:flex-row gap-4 justify-center">
// //             <Link
// //               to={userId ? `/user/${userId}/register` : "/register"}
// //               className="btn btn-lg bg-white text-primary-600 hover:bg-primary-50"
// //             >
// //               Start Your Journey
// //               <ArrowRightIcon className="ml-2 h-5 w-5" />
// //             </Link>
// //             <Link
// //               to="/about"
// //               className="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600"
// //             >
// //               Learn More
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // // Placeholder icons for benefits section
// // const ClockIcon = ({ className }) => (
// //   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //   </svg>
// // );

// // const AcademicCapIcon = ({ className }) => (
// //   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
// //   </svg>
// // );

// // const DevicePhoneMobileIcon = ({ className }) => (
// //   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
// //   </svg>
// // );

// // const GlobeAltIcon = ({ className }) => (
// //   <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9c-5 0-9 4-9 9s4 9 9 9" />
// //   </svg>
// // );

// // export default Home;


// import { Link, useParams } from "react-router-dom";
// import {
//   ArrowRightIcon,
//   ChartBarIcon,
//   UsersIcon,
//   ShoppingBagIcon,
//   CurrencyDollarIcon,
//   StarIcon,
//   ShieldCheckIcon,
//   RocketLaunchIcon,
// } from "@heroicons/react/24/outline";

// const Home = () => {
//   const { userId } = useParams();

//   const features = [
//     {
//       name: "Earn Commissions",
//       description:
//         "Get paid for every purchase made through your network with our competitive commission structure.",
//       icon: CurrencyDollarIcon,
//       color: "text-emerald-500",
//       bgColor: "bg-emerald-100",
//     },
//     {
//       name: "Build Your Team",
//       description:
//         "Grow your downline and increase your earning potential with our proven MLM system.",
//       icon: UsersIcon,
//       color: "text-indigo-500",
//       bgColor: "bg-indigo-100",
//     },
//     {
//       name: "Quality Products",
//       description:
//         "Offer premium products that people love to buy, ensuring customer satisfaction and repeat sales.",
//       icon: ShoppingBagIcon,
//       color: "text-purple-500",
//       bgColor: "bg-purple-100",
//     },
//     {
//       name: "Track Performance",
//       description:
//         "Real-time analytics and insights to monitor your network growth and optimize your strategy.",
//       icon: ChartBarIcon,
//       color: "text-pink-500",
//       bgColor: "bg-pink-100",
//     },
//   ];

//   const stats = [
//     {
//       label: "Active Members",
//       value: "50,000+",
//       change: "+12%",
//       positive: true,
//     },
//     {
//       label: "Products Sold",
//       value: "2.5M+",
//       change: "+8%",
//       positive: true,
//     },
//     {
//       label: "Total Commissions",
//       value: "$15M+",
//       change: "+15%",
//       positive: true,
//     },
//     { label: "Countries", value: "25+", change: "+3", positive: true },
//   ];

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Diamond Member",
//       content:
//         "ShopSmart has transformed my life. I've built a successful network and earned over $50,000 in commissions.",
//       avatar: "SJ",
//       rating: 5,
//     },
//     {
//       name: "Michael Chen",
//       role: "Platinum Member",
//       content:
//         "The quality of products and the support system here is unmatched. Highly recommended!",
//       avatar: "MC",
//       rating: 5,
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Gold Member",
//       content:
//         "Started 6 months ago and already seeing amazing results. The training resources are excellent.",
//       avatar: "ER",
//       rating: 5,
//     },
//   ];

//   const benefits = [
//     {
//       title: "Flexible Work Schedule",
//       description:
//         "Work from anywhere, anytime. Build your business around your lifestyle.",
//       icon: ClockIcon,
//     },
//     {
//       title: "Comprehensive Training",
//       description:
//         "Access to extensive training materials, webinars, and mentorship programs.",
//       icon: AcademicCapIcon,
//     },
//     {
//       title: "Advanced Technology",
//       description:
//         "State-of-the-art platform with mobile apps and real-time tracking.",
//       icon: DevicePhoneMobileIcon,
//     },
//     {
//       title: "Global Network",
//       description:
//         "Connect with members worldwide and expand your reach internationally.",
//       icon: GlobeAltIcon,
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-b from-white via-gray-50 to-gray-100">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-24 px-6 text-center">
//         <div className="relative z-10 max-w-4xl mx-auto">
//           <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
//             Shop <span className="text-yellow-300">Smart</span>, Earn{" "}
//             <span className="text-emerald-300">Smarter</span>
//           </h1>
//           <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-10">
//             Join our revolutionary hybrid e-commerce and MLM platform. Shop
//             premium products while building a profitable network and earning
//             unlimited commissions.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to={userId ? `/user/${userId}/shop` : "/shop"}
//               className="px-6 py-3 border border-white font-semibold rounded-xl hover:bg-white hover:text-indigo-700 transition"
//             >
//               Explore Products
//             </Link>
//           </div>
//         </div>
//         {/* Decorative blur balls */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
//           <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//           {stats.map((stat, i) => (
//             <div
//               key={i}
//               className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
//             >
//               <div className="text-4xl font-bold text-indigo-600 mb-2">
//                 {stat.value}
//               </div>
//               <div className="text-gray-500 mb-1">{stat.label}</div>
//               <div
//                 className={`text-sm font-semibold ${
//                   stat.positive ? "text-emerald-500" : "text-red-500"
//                 }`}
//               >
//                 {stat.change} from last month
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Features */}
//       <section className="py-20 bg-gray-50">
//         <div className="max-w-6xl mx-auto text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//             Why Choose ShopSmart?
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Our unique platform combines the best of e-commerce with
//             multi-level marketing opportunities, creating a win-win ecosystem
//             for shoppers and entrepreneurs.
//           </p>
//         </div>
//         <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 px-6">
//           {features.map((f, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
//             >
//               <div
//                 className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${f.bgColor}`}
//               >
//                 <f.icon className={`h-6 w-6 ${f.color}`} />
//               </div>
//               <h3 className="text-lg font-bold mb-2">{f.name}</h3>
//               <p className="text-gray-600">{f.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
//         <div className="max-w-6xl mx-auto text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
//             Success Stories
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Hear from our members who have achieved remarkable success with
//             ShopSmart.
//           </p>
//         </div>
//         <div className="grid gap-8 md:grid-cols-3 px-6">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
//             >
//               <div className="flex items-center mb-4">
//                 <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
//                   {t.avatar}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-gray-900">{t.name}</h4>
//                   <p className="text-sm text-gray-500">{t.role}</p>
//                 </div>
//               </div>
//               <div className="flex mb-4">
//                 {[...Array(t.rating)].map((_, j) => (
//                   <StarIcon
//                     key={j}
//                     className="h-5 w-5 text-yellow-400 fill-current"
//                   />
//                 ))}
//               </div>
//               <p className="text-gray-600 italic">"{t.content}"</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-20 bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-center">
//         <h2 className="text-4xl font-extrabold mb-6">
//           Ready to Transform Your Life?
//         </h2>
//         <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
//           Join thousands of successful entrepreneurs who have already started
//           their journey with ShopSmart. Your future starts today.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//          <Link
//             to="/about"
//             className="px-6 py-3 border border-white font-semibold rounded-xl hover:bg-white hover:text-indigo-700 transition"
//           >
//             Learn More
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Icons
// const ClockIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// const AcademicCapIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 14l9-5-9-5-9 5 9 5z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
//     />
//   </svg>
// );

// const DevicePhoneMobileIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//     />
//   </svg>
// );

// const GlobeAltIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0-9c-5 0-9 4-9 9s4 9 9 9"
//     />
//   </svg>
// );

// export default Home;


import { Link, useParams } from "react-router-dom";
import {
  ArrowRightIcon,
  ChartBarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { userId } = useParams();

  const features = [
    {
      name: "Earn Commissions",
      description:
        "Get paid for every purchase made through your network with our competitive commission structure.",
      icon: CurrencyDollarIcon,
      color: "text-emerald-400",
      bgColor: "bg-emerald-900/30",
    },
    {
      name: "Build Your Team",
      description:
        "Grow your downline and increase your earning potential with our proven MLM system.",
      icon: UsersIcon,
      color: "text-indigo-400",
      bgColor: "bg-indigo-900/30",
    },
    {
      name: "Quality Products",
      description:
        "Offer premium products that people love to buy, ensuring customer satisfaction and repeat sales.",
      icon: ShoppingBagIcon,
      color: "text-purple-400",
      bgColor: "bg-purple-900/30",
    },
    {
      name: "Track Performance",
      description:
        "Real-time analytics and insights to monitor your network growth and optimize your strategy.",
      icon: ChartBarIcon,
      color: "text-pink-400",
      bgColor: "bg-pink-900/30",
    },
  ];

  const stats = [
    { label: "Active Members", value: "50,000+", change: "+12%", positive: true },
    { label: "Products Sold", value: "2.5M+", change: "+8%", positive: true },
    { label: "Total Commissions", value: "$15M+", change: "+15%", positive: true },
    { label: "Countries", value: "25+", change: "+3", positive: true },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Diamond Member",
      content:
        "ShopSmart has transformed my life. I've built a successful network and earned over $50,000 in commissions.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Platinum Member",
      content:
        "The quality of products and the support system here is unmatched. Highly recommended!",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Gold Member",
      content:
        "Started 6 months ago and already seeing amazing results. The training resources are excellent.",
      avatar: "ER",
      rating: 5,
    },
  ];

  return (
    <div className="bg-black text-gray-200 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-28 px-6 text-center">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            Shop <span className="text-yellow-400">Smart</span>, Earn{" "}
            <span className="text-emerald-400">Smarter</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Discover premium products and explore a next-generation hybrid
            e-commerce platform built for the future.
          </p>
          <div className="flex justify-center">
            <Link
              to={userId ? `/user/${userId}/shop` : "/shop"}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
        {/* Decorative glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-8 bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >
              <div className="text-4xl font-extrabold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 mb-1">{stat.label}</div>
              <div
                className={`text-sm font-medium ${
                  stat.positive ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.change} this month
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Why Choose ShopSmart?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We merge innovation, quality products, and smart networking to
            deliver unmatched opportunities for modern entrepreneurs.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 px-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${f.bgColor}`}
              >
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.name}</h3>
              <p className="text-gray-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Hear how ShopSmart has helped people grow financially and
            professionally.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 px-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-emerald-400 font-bold mr-4">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <StarIcon
                    key={j}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-300 italic">"{t.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
<section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white text-center">
  <h2 className="text-4xl font-extrabold mb-6">
    Power of Networking
  </h2>
  <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
    Our community is built on trust, collaboration, and growth. By joining our 
    network, you don’t just shop and earn—you unlock opportunities to 
    connect, share, and build together.
  </p>

  <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6">
    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition">
      <h3 className="text-xl font-bold mb-3 text-indigo-400">Stronger Together</h3>
      <p className="text-gray-400">
        Grow faster by leveraging the collective power of like-minded individuals 
        working toward shared success.
      </p>
    </div>

    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition">
      <h3 className="text-xl font-bold mb-3 text-emerald-400">Knowledge Sharing</h3>
      <p className="text-gray-400">
        Learn proven strategies from top performers in the network and accelerate 
        your journey to financial freedom.
      </p>
    </div>

    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition">
      <h3 className="text-xl font-bold mb-3 text-pink-400">Global Reach</h3>
      <p className="text-gray-400">
        Expand your influence worldwide and unlock earning opportunities across 
        multiple regions and cultures.
      </p>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;

