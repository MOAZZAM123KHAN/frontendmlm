// // // import React, { useState } from 'react';
// // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // import * as Yup from 'yup';
// // // import { authAPI } from '../../services/api';
// // // import { Link } from 'react-router-dom';

// // // const LoginForm = ({ onLoginSuccess, onSwitchToSignup }) => {
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [userIds, setUserIds] = useState([]);
// // //   const [showDashboard, setShowDashboard] = useState(false);

// // //   const validationSchema = Yup.object({
// // //     userId: Yup.string().matches(/^user([1-9]|10)$/, 'User ID must be user1 to user10').required('User ID is required'),
// // //     password: Yup.string().required('Password is required'),
// // //     parentMobile: Yup.string().matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid mobile number').required('Mobile number is required'),
// // //   });

// // //   const handleSubmit = async (values, { setSubmitting }) => {
// // //     setIsLoading(true);
// // //     setError('');
// // //     setUserIds([]);
// // //     setShowDashboard(false);
// // //     try {
// // //       const response = await authAPI.login({
// // //         userId: values.userId,
// // //         password: values.password,
// // //         parentMobile: values.parentMobile,
// // //       });
// // //       if (response.success) {
// // //         setUserIds(response.data.allUserIds);
// // //         setShowDashboard(true);
// // //         if (response.data.isAdmin) {
// // //           localStorage.setItem('isAdmin', 'true');
// // //         } else {
// // //           localStorage.removeItem('isAdmin');
// // //         }
// // //         onLoginSuccess && onLoginSuccess(response.data);
// // //       } else {
// // //         setError(response.message || 'Login failed');
// // //       }
// // //     } catch (err) {
// // //       setError(err.message || 'Login failed. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //       setSubmitting(false);
// // //     }
// // //   };

// // //   if (showDashboard && userIds.length > 0) {
// // //     return (
// // //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //         <div className="max-w-md w-full space-y-8">
// // //           <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
// // //           <ul className="mt-4 mb-6">
// // //             {userIds.map((id) => (
// // //               <li key={id} className="text-lg text-center py-1">{id}</li>
// // //             ))}
// // //           </ul>
// // //           <button onClick={() => setShowDashboard(false)} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">Login as another user</button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div className="max-w-md w-full space-y-8">
// // //         <div>
// // //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
// // //           <p className="mt-2 text-center text-sm text-gray-600">Enter your user ID, password, and mobile number</p>
// // //         </div>
// // //         <Formik
// // //           initialValues={{ userId: '', password: '', parentMobile: '' }}
// // //           validationSchema={validationSchema}
// // //           onSubmit={handleSubmit}
// // //         >
// // //           {({ isSubmitting }) => (
// // //             <Form className="mt-8 space-y-6">
// // //               <div>
// // //                 <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
// // //                 <Field id="userId" name="userId" type="text" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="user1, user2, ... user10" />
// // //                 <ErrorMessage name="userId" component="div" className="mt-1 text-sm text-red-600" />
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
// // //                 <Field id="password" name="password" type="password" autoComplete="current-password" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your password" />
// // //                 <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
// // //                 <div className="mt-2 text-right">
// // //                   <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <label htmlFor="parentMobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
// // //                 <Field id="parentMobile" name="parentMobile" type="tel" autoComplete="tel" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your mobile number" />
// // //                 <ErrorMessage name="parentMobile" component="div" className="mt-1 text-sm text-red-600" />
// // //               </div>
// // //               {error && (
// // //                 <div className="rounded-md bg-red-50 p-4">
// // //                   <div className="flex">
// // //                     <div className="ml-3">
// // //                       <h3 className="text-sm font-medium text-red-800">{error}</h3>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //               <div>
// // //                 <button type="submit" disabled={isSubmitting || isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
// // //                   {isLoading ? 'Signing in...' : 'Sign in'}
// // //                 </button>
// // //               </div>
// // //               <div className="text-center">
// // //                 <button type="button" onClick={onSwitchToSignup} className="font-medium text-indigo-600 hover:text-indigo-500">Don't have an account? Sign up</button>
// // //               </div>
// // //             </Form>
// // //           )}
// // //         </Formik>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LoginForm; 

// // import React, { useState } from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import { authAPI } from '../../services/api';
// // import { Link } from 'react-router-dom';

// // const LoginForm = ({ onLoginSuccess, onSwitchToSignup }) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [userIds, setUserIds] = useState([]);
// //   const [showDashboard, setShowDashboard] = useState(false);

// //   // ✅ Validation schema
// //   const validationSchema = Yup.object({
// //     userId: Yup.string()
// //       .matches(/^user([1-9]|10)$/, 'User ID must be user1 to user10')
// //       .required('User ID is required'),
// //     password: Yup.string().required('Password is required'),
// //     parentMobile: Yup.string()
// //       .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid mobile number')
// //       .required('Mobile number is required'),
// //   });

// //   // ✅ Submit handler
// //   const handleSubmit = async (values, { setSubmitting }) => {
// //     setIsLoading(true);
// //     setError('');
// //     setUserIds([]);
// //     setShowDashboard(false);

// //     try {
// //       const response = await authAPI.login({
// //         userId: values.userId,
// //         password: values.password,
// //         parentMobile: values.parentMobile,
// //       });

// //       if (response.success) {
// //         // 🟢 Save token and user details in localStorage
// //         if (response.data.token) {
// //           localStorage.setItem("userToken", response.data.token);
// //         }
// //         if (response.data.user?._id) {
// //           localStorage.setItem("userId", response.data.user._id);
// //         } else {
// //           localStorage.setItem("userId", values.userId); // fallback if _id missing
// //         }

// //         setUserIds(response.data.allUserIds);
// //         setShowDashboard(true);

// //         // Admin check
// //         if (response.data.isAdmin) {
// //           localStorage.setItem("isAdmin", "true");
// //         } else {
// //           localStorage.removeItem("isAdmin");
// //         }

// //         onLoginSuccess && onLoginSuccess(response.data);
// //       } else {
// //         setError(response.message || 'Login failed');
// //       }
// //     } catch (err) {
// //       setError(err.message || 'Login failed. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //       setSubmitting(false);
// //     }
// //   };

// //   // ✅ Show all user IDs (if multiple accounts linked to same mobile)
// //   if (showDashboard && userIds.length > 0) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-md w-full space-y-8">
// //           <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
// //           <ul className="mt-4 mb-6">
// //             {userIds.map((id) => (
// //               <li key={id} className="text-lg text-center py-1">{id}</li>
// //             ))}
// //           </ul>
// //           <button 
// //             onClick={() => setShowDashboard(false)} 
// //             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
// //           >
// //             Login as another user
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ✅ Login form
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full space-y-8">
// //         <div>
// //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //             Sign in to your account
// //           </h2>
// //           <p className="mt-2 text-center text-sm text-gray-600">
// //             Enter your user ID, password, and mobile number
// //           </p>
// //         </div>

// //         <Formik
// //           initialValues={{ userId: '', password: '', parentMobile: '' }}
// //           validationSchema={validationSchema}
// //           onSubmit={handleSubmit}
// //         >
// //           {({ isSubmitting }) => (
// //             <Form className="mt-8 space-y-6">
// //               {/* User ID */}
// //               <div>
// //                 <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
// //                   User ID
// //                 </label>
// //                 <Field
// //                   id="userId"
// //                   name="userId"
// //                   type="text"
// //                   required
// //                   placeholder="user1, user2, ... user10"
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
// //                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
// //                 />
// //                 <ErrorMessage name="userId" component="div" className="mt-1 text-sm text-red-600" />
// //               </div>

// //               {/* Password */}
// //               <div>
// //                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                   Password
// //                 </label>
// //                 <Field
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   required
// //                   placeholder="Enter your password"
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
// //                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
// //                 />
// //                 <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />

// //                 <div className="mt-2 text-right">
// //                   <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
// //                     Forgot your password?
// //                   </Link>
// //                 </div>
// //               </div>

// //               {/* Mobile */}
// //               <div>
// //                 <label htmlFor="parentMobile" className="block text-sm font-medium text-gray-700">
// //                   Mobile Number
// //                 </label>
// //                 <Field
// //                   id="parentMobile"
// //                   name="parentMobile"
// //                   type="tel"
// //                   required
// //                   placeholder="Enter your mobile number"
// //                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
// //                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
// //                 />
// //                 <ErrorMessage name="parentMobile" component="div" className="mt-1 text-sm text-red-600" />
// //               </div>

// //               {/* Error message */}
// //               {error && (
// //                 <div className="rounded-md bg-red-50 p-4">
// //                   <div className="text-sm font-medium text-red-800">{error}</div>
// //                 </div>
// //               )}

// //               {/* Submit button */}
// //               <div>
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting || isLoading}
// //                   className="group relative w-full flex justify-center py-2 px-4 
// //                              border border-transparent text-sm font-medium rounded-md 
// //                              text-white bg-indigo-600 hover:bg-indigo-700 
// //                              focus:outline-none focus:ring-2 focus:ring-offset-2 
// //                              focus:ring-indigo-500 disabled:opacity-50"
// //                 >
// //                   {isLoading ? 'Signing in...' : 'Sign in'}
// //                 </button>
// //               </div>

// //               {/* Switch to signup */}
// //               <div className="text-center">
// //                 <button
// //                   type="button"
// //                   onClick={onSwitchToSignup}
// //                   className="font-medium text-indigo-600 hover:text-indigo-500"
// //                 >
// //                   Don't have an account? Sign up
// //                 </button>
// //               </div>
// //             </Form>
// //           )}
// //         </Formik>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;




// import React, { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { authAPI } from '../../services/api';
// import { Link } from 'react-router-dom';

// const LoginForm = ({ onLoginSuccess, onSwitchToSignup }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [userIds, setUserIds] = useState([]);
//   const [showDashboard, setShowDashboard] = useState(false);

//   // ✅ Validation schema
//   const validationSchema = Yup.object({
//     userId: Yup.string()
//       .matches(/^user([1-9]|10)$/, 'User ID must be user1 to user10')
//       .required('User ID is required'),
//     password: Yup.string().required('Password is required'),
//     parentMobile: Yup.string()
//       .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid mobile number')
//       .required('Mobile number is required'),
//   });

//   // ✅ Submit handler
//   const handleSubmit = async (values, { setSubmitting }) => {
//     setIsLoading(true);
//     setError('');
//     setUserIds([]);
//     setShowDashboard(false);

//     try {
//       const response = await authAPI.login({
//         userId: values.userId,
//         password: values.password,
//         parentMobile: values.parentMobile,
//       });

//       if (response.success) {
//         // 🟢 Save token and user details in localStorage
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token); // ✅ fixed key name
//           console.log("Saved token:", response.data.token);
//         }

//         if (response.data.user?._id) {
//           localStorage.setItem("userId", response.data.user._id);
//           console.log("Saved userId:", response.data.user._id);
//         } else {
//           localStorage.setItem("userId", values.userId); 
//           console.log("Saved userId (fallback):", values.userId);
//         }

//         setUserIds(response.data.allUserIds);
//         setShowDashboard(true);

//         // Admin check
//         if (response.data.isAdmin) {
//           localStorage.setItem("isAdmin", "true");
//         } else {
//           localStorage.removeItem("isAdmin");
//         }

//         onLoginSuccess && onLoginSuccess(response.data);
//       } else {
//         setError(response.message || 'Login failed');
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };

//   // ✅ Show all user IDs (if multiple accounts linked to same mobile)
//   if (showDashboard && userIds.length > 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
//           <ul className="mt-4 mb-6">
//             {userIds.map((id) => (
//               <li key={id} className="text-lg text-center py-1">{id}</li>
//             ))}
//           </ul>
//           <button 
//             onClick={() => setShowDashboard(false)} 
//             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
//           >
//             Login as another user
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Login form
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Sign in to your account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter your user ID, password, and mobile number
//           </p>
//         </div>

//         <Formik
//           initialValues={{ userId: '', password: '', parentMobile: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="mt-8 space-y-6">
//               {/* User ID */}
//               <div>
//                 <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
//                   User ID
//                 </label>
//                 <Field
//                   id="userId"
//                   name="userId"
//                   type="text"
//                   required
//                   placeholder="user1, user2, ... user10"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
//                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//                 <ErrorMessage name="userId" component="div" className="mt-1 text-sm text-red-600" />
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <Field
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   placeholder="Enter your password"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
//                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//                 <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />

//                 <div className="mt-2 text-right">
//                   <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
//                     Forgot your password?
//                   </Link>
//                 </div>
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label htmlFor="parentMobile" className="block text-sm font-medium text-gray-700">
//                   Mobile Number
//                 </label>
//                 <Field
//                   id="parentMobile"
//                   name="parentMobile"
//                   type="tel"
//                   required
//                   placeholder="Enter your mobile number"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
//                              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 />
//                 <ErrorMessage name="parentMobile" component="div" className="mt-1 text-sm text-red-600" />
//               </div>

//               {/* Error message */}
//               {error && (
//                 <div className="rounded-md bg-red-50 p-4">
//                   <div className="text-sm font-medium text-red-800">{error}</div>
//                 </div>
//               )}

//               {/* Submit button */}
//               <div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || isLoading}
//                   className="group relative w-full flex justify-center py-2 px-4 
//                              border border-transparent text-sm font-medium rounded-md 
//                              text-white bg-indigo-600 hover:bg-indigo-700 
//                              focus:outline-none focus:ring-2 focus:ring-offset-2 
//                              focus:ring-indigo-500 disabled:opacity-50"
//                 >
//                   {isLoading ? 'Signing in...' : 'Sign in'}
//                 </button>
//               </div>

//               {/* Switch to signup */}
//               <div className="text-center">
//                 <button
//                   type="button"
//                   onClick={onSwitchToSignup}
//                   className="font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Don't have an account? Sign up
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authAPI } from '../../services/api';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  // ✅ Validation schema
  const validationSchema = Yup.object({
    userId: Yup.string()
      .matches(/^user([1-9]|10)$/, 'User ID must be user1 to user10')
      .required('User ID is required'),
    password: Yup.string().required('Password is required'),
    parentMobile: Yup.string()
      .matches(/^\+?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid mobile number')
      .required('Mobile number is required'),
  });

  // ✅ Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setError('');
    setUserIds([]);
    setShowDashboard(false);

    try {
      const response = await authAPI.login({
        userId: values.userId,
        password: values.password,
        parentMobile: values.parentMobile,
      });

      if (response.success) {
        // 🟢 Save token
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("Saved token:", response.token);
        }

        // 🟢 Save userId
        if (response.data?.userId) {
          localStorage.setItem("userId", response.data.userId);
          console.log("Saved userId:", response.data.userId);
        } else {
          localStorage.setItem("userId", values.userId);
          console.log("Saved userId (fallback):", values.userId);
        }

        // 🟢 Save all linked userIds
        if (response.data?.allUserIds) {
          setUserIds(response.data.allUserIds);
        }

        setShowDashboard(true);

        // 🟢 Save admin flag
        if (response.data?.isAdmin) {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.removeItem("isAdmin");
        }

        onLoginSuccess && onLoginSuccess(response.data);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // ✅ Show all user IDs (if multiple accounts linked to same mobile)
  if (showDashboard && userIds.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
          <ul className="mt-4 mb-6">
            {userIds.map((id) => (
              <li key={id} className="text-lg text-center py-1">{id}</li>
            ))}
          </ul>
          <button 
            onClick={() => setShowDashboard(false)} 
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
          >
            Login as another user
          </button>
        </div>
      </div>
    );
  }

  // ✅ Login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your user ID, password, and mobile number
          </p>
        </div>

        <Formik
          initialValues={{ userId: '', password: '', parentMobile: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {/* User ID */}
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <Field
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  placeholder="user1, user2, ... user10"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="userId" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />

                <div className="mt-2 text-right">
                  <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="parentMobile" className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <Field
                  id="parentMobile"
                  name="parentMobile"
                  type="tel"
                  required
                  placeholder="Enter your mobile number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="parentMobile" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Error message */}
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm font-medium text-red-800">{error}</div>
                </div>
              )}

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 
                             border border-transparent text-sm font-medium rounded-md 
                             text-white bg-indigo-600 hover:bg-indigo-700 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 
                             focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              {/* Switch to signup */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;

