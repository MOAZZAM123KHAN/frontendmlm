// // // // // import React, { useState } from 'react';
// // // // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // // // import * as Yup from 'yup';

// // // // // import { authAPI } from '../../services/api';
// // // // // import { API_URL } from '../../config';

// // // // // const SignupForm = ({ onSignupSuccess, onSwitchToLogin }) => {
// // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // //   const [error, setError] = useState('');
// // // // //   const [userIds, setUserIds] = useState([]);
// // // // //   const [showDashboard, setShowDashboard] = useState(false);
// // // // //   const [step, setStep] = useState(1); // 1: form, 2: otp
// // // // //   const [mobileForOtp, setMobileForOtp] = useState('');
// // // // //   const [otp, setOtp] = useState('');
// // // // //   const [otpError, setOtpError] = useState('');
// // // // //   const [otpMessage, setOtpMessage] = useState('');
// // // // //   const [isOtpLoading, setIsOtpLoading] = useState(false);

// // // // //   const validationSchema = Yup.object({
// // // // //     name: Yup.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters').required('Name is required'),
// // // // //     email: Yup.string().email('Please enter a valid email address').nullable(),
// // // // //     mobileNumber: Yup.string().matches(/^[0-9]{10,15}$/, 'Please enter a valid mobile number').required('Mobile number is required'),
// // // // //     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// // // // //     confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
// // // // //   });

// // // // //   const sendOtp = async (mobile) => {
// // // // //     setIsOtpLoading(true);
// // // // //     setOtpError('');
// // // // //     setOtpMessage('');
// // // // //     try {
// // // // //       // Using fetch with API_URL from config
// // // // //       const response = await fetch(`${API_URL.replace('/api', '')}/auth/send-otp`, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({ mobile }),
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       if (!response.ok) {
// // // // //         throw new Error(data.error || 'Failed to send OTP');
// // // // //       }
// // // // //       setOtpMessage('OTP sent to your mobile number.');
// // // // //     } catch (err) {
// // // // //       setOtpError(err.message || 'Failed to send OTP');
// // // // //     } finally {
// // // // //       setIsOtpLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (values, { setSubmitting }) => {
// // // // //     setError('');
// // // // //     setUserIds([]);
// // // // //     setShowDashboard(false);
// // // // //     setMobileForOtp(values.mobileNumber);
// // // // //     setStep(2);
// // // // //     await sendOtp(values.mobileNumber);
// // // // //     setSubmitting(false);
// // // // //   };

// // // // //   const handleVerifyOtp = async () => {
// // // // //     setIsOtpLoading(true);
// // // // //     setOtpError('');
// // // // //     setOtpMessage('');
// // // // //     try {
// // // // //       // Using fetch with API_URL from config for OTP verification
// // // // //       const verifyResponse = await fetch(`${API_URL.replace('/api', '')}/auth/verify-otp`, {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify({ mobile: mobileForOtp, otp }),
// // // // //       });
      
// // // // //       const verifyData = await verifyResponse.json();
// // // // //       if (!verifyResponse.ok) {
// // // // //         throw new Error(verifyData.error || 'OTP verification failed');
// // // // //       }
      
// // // // //       // Now create the account using authAPI
// // // // //       setIsLoading(true);
// // // // //       try {
// // // // //         const signupData = {
// // // // //           mobileNumber: mobileForOtp,
// // // // //           // You may want to store the rest of the form data in a ref or state for this step
// // // // //           // For demo, just pass mobileNumber
// // // // //         };
        
// // // // //         const response = await authAPI.signup(signupData);
        
// // // // //         if (response.success) {
// // // // //           setUserIds(response.data?.allUserIds || []);
// // // // //           setShowDashboard(true);
// // // // //           onSignupSuccess && onSignupSuccess(response.data);
// // // // //         } else {
// // // // //           setError(response.message || 'Signup failed');
// // // // //           setStep(1);
// // // // //         }
// // // // //       } catch (signupErr) {
// // // // //         setError(signupErr.message || 'Signup failed');
// // // // //         setStep(1);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       setOtpError(err.message || 'OTP verification failed');
// // // // //     } finally {
// // // // //       setIsOtpLoading(false);
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   if (showDashboard && userIds.length > 0) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // // //         <div className="max-w-md w-full space-y-8">
// // // // //           <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
// // // // //           <ul className="mt-4 mb-6">
// // // // //             {userIds.map((id) => (
// // // // //               <li key={id} className="text-lg text-center py-1">{id}</li>
// // // // //             ))}
// // // // //           </ul>
// // // // //           <button onClick={() => setShowDashboard(false)} className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">Create another user</button>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (step === 2) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // // //         <div className="max-w-md w-full space-y-8">
// // // // //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>
// // // // //           <p className="text-center text-sm text-gray-600">Enter the OTP sent to your mobile number {mobileForOtp}</p>
// // // // //           <div className="space-y-4">
// // // // //             <input
// // // // //               type="text"
// // // // //               value={otp}
// // // // //               onChange={e => setOtp(e.target.value)}
// // // // //               placeholder="Enter OTP"
// // // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // // // //             />
// // // // //             <button
// // // // //               onClick={handleVerifyOtp}
// // // // //               disabled={isOtpLoading || !otp}
// // // // //               className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
// // // // //             >
// // // // //               {isOtpLoading ? 'Verifying...' : 'Verify OTP'}
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => sendOtp(mobileForOtp)}
// // // // //               disabled={isOtpLoading}
// // // // //               className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
// // // // //             >
// // // // //               Resend OTP
// // // // //             </button>
// // // // //             {otpMessage && <div className="text-green-600 text-sm">{otpMessage}</div>}
// // // // //             {otpError && <div className="text-red-600 text-sm">{otpError}</div>}
// // // // //             <button onClick={() => setStep(1)} className="w-full py-2 px-4 text-indigo-600">Back to Signup</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // // //       <div className="max-w-md w-full space-y-8">
// // // // //         <div>
// // // // //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
// // // // //           <p className="mt-2 text-center text-sm text-gray-600">Enter your details to create a user ID under your mobile</p>
// // // // //         </div>
// // // // //         <Formik
// // // // //           initialValues={{ name: '', email: '', mobileNumber: '', password: '', confirmPassword: '' }}
// // // // //           validationSchema={validationSchema}
// // // // //           onSubmit={handleSubmit}
// // // // //         >
// // // // //           {({ isSubmitting }) => (
// // // // //             <Form className="mt-8 space-y-6">
// // // // //               <div className="space-y-4">
// // // // //                 <div>
// // // // //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
// // // // //                   <Field id="name" name="name" type="text" autoComplete="name" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your name" />
// // // // //                   <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (optional)</label>
// // // // //                   <Field id="email" name="email" type="email" autoComplete="email" className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your email (optional)" />
// // // // //                   <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
// // // // //                   <Field id="mobileNumber" name="mobileNumber" type="tel" autoComplete="tel" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your mobile number" />
// // // // //                   <ErrorMessage name="mobileNumber" component="div" className="mt-1 text-sm text-red-600" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
// // // // //                   <Field id="password" name="password" type="password" autoComplete="new-password" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your password" />
// // // // //                   <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
// // // // //                 </div>
// // // // //                 <div>
// // // // //                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
// // // // //                   <Field id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm your password" />
// // // // //                   <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
// // // // //                 </div>
// // // // //               </div>
// // // // //               {error && (
// // // // //                 <div className="rounded-md bg-red-50 p-4">
// // // // //                   <div className="flex">
// // // // //                     <div className="ml-3">
// // // // //                       <h3 className="text-sm font-medium text-red-800">{error}</h3>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //               <div>
// // // // //                 <button type="submit" disabled={isSubmitting || isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
// // // // //                   {isLoading ? 'Creating account...' : 'Create account'}
// // // // //                 </button>
// // // // //               </div>
// // // // //               <div className="text-center">
// // // // //                 <button type="button" onClick={onSwitchToLogin} className="font-medium text-indigo-600 hover:text-indigo-500">Already have an account? Sign in</button>
// // // // //               </div>
// // // // //             </Form>
// // // // //           )}
// // // // //         </Formik>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SignupForm;




// // // // import React, { useState, useEffect } from 'react';
// // // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { authAPI } from '../../services/api';


// // // // import { 
// // // //   auth, 
// // // //   RecaptchaVerifier, 
// // // //   signInWithPhoneNumber 
// // // // } from '../../firebase';

// // // // const SignupForm = ({ onSignupSuccess, onSwitchToLogin }) => {
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [error, setError] = useState('');
// // // //   const [userIds, setUserIds] = useState([]);
// // // //   const [showDashboard, setShowDashboard] = useState(false);
// // // //   const [step, setStep] = useState(1); // 1: form, 2: otp
// // // //   const [mobileForOtp, setMobileForOtp] = useState('');
// // // //   const [otp, setOtp] = useState('');
// // // //   const [otpError, setOtpError] = useState('');
// // // //   const [otpMessage, setOtpMessage] = useState('');
// // // //   const [isOtpLoading, setIsOtpLoading] = useState(false);
// // // //   const [formData, setFormData] = useState(null);

// // // //   const validationSchema = Yup.object({
// // // //     name: Yup.string()
// // // //       .min(2, 'Name must be at least 2 characters')
// // // //       .max(50, 'Name cannot exceed 50 characters')
// // // //       .required('Name is required'),
// // // //     email: Yup.string()
// // // //       .email('Please enter a valid email address')
// // // //       .nullable(),
// // // //     mobileNumber: Yup.string()
// // // //       .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
// // // //       .required('Mobile number is required'),
// // // //     password: Yup.string()
// // // //       .min(6, 'Password must be at least 6 characters')
// // // //       .required('Password is required'),
// // // //     confirmPassword: Yup.string()
// // // //       .oneOf([Yup.ref('password'), null], 'Passwords must match')
// // // //       .required('Confirm password is required'),
// // // //   });

// // // //   // Initialize reCAPTCHA
// // // //   useEffect(() => {
// // // //     window.recaptchaVerifier = new RecaptchaVerifier(
// // // //       'recaptcha-container',
// // // //       {
// // // //         size: 'invisible',
// // // //         callback: () => {
// // // //           // This will be called when reCAPTCHA is solved
// // // //         },
// // // //       },
// // // //       auth
// // // //     );

// // // //     return () => {
// // // //       if (window.recaptchaVerifier) {
// // // //         window.recaptchaVerifier.clear();
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   const sendOtp = async (mobile) => {
// // // //     setIsOtpLoading(true);
// // // //     setOtpError('');
// // // //     setOtpMessage('');
    
// // // //     try {
// // // //       const phoneNumber = `+91${mobile}`; // Adjust country code as needed
// // // //       const confirmationResult = await auth().signInWithPhoneNumber(
// // // //         phoneNumber,
// // // //         window.recaptchaVerifier
// // // //       );
      
// // // //       window.confirmationResult = confirmationResult;
// // // //       setOtpMessage('OTP sent to your mobile number.');
// // // //     } catch (err) {
// // // //       console.error('OTP Error:', err);
// // // //       setOtpError(err.message || 'Failed to send OTP. Please try again.');
// // // //     } finally {
// // // //       setIsOtpLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSubmit = async (values, { setSubmitting }) => {
// // // //     setError('');
// // // //     setFormData(values);
// // // //     setMobileForOtp(values.mobileNumber);
// // // //     await sendOtp(values.mobileNumber);
// // // //     setStep(2);
// // // //     setSubmitting(false);
// // // //   };

// // // //   const handleVerifyOtp = async () => {
// // // //     setIsOtpLoading(true);
// // // //     setOtpError('');
// // // //     setOtpMessage('');
    
// // // //     try {
// // // //       // Verify OTP with Firebase
// // // //       await window.confirmationResult.confirm(otp);
      
// // // //       // OTP verified - proceed with account creation
// // // //       setIsLoading(true);
// // // //       try {
// // // //         const response = await authAPI.signup({
// // // //           name: formData.name,
// // // //           email: formData.email,
// // // //           mobileNumber: formData.mobileNumber,
// // // //           password: formData.password,
// // // //         });
        
// // // //         if (response.success) {
// // // //           setUserIds(response.data?.allUserIds || []);
// // // //           setShowDashboard(true);
// // // //           onSignupSuccess && onSignupSuccess(response.data);
// // // //         } else {
// // // //           setError(response.message || 'Signup failed');
// // // //           setStep(1);
// // // //         }
// // // //       } catch (signupErr) {
// // // //         setError(signupErr.message || 'Signup failed. Please try again.');
// // // //         setStep(1);
// // // //       }
// // // //     } catch (err) {
// // // //       setOtpError(err.message || 'Invalid OTP. Please try again.');
// // // //     } finally {
// // // //       setIsOtpLoading(false);
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   if (showDashboard && userIds.length > 0) {
// // // //     return (
// // // //       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // //         <div className="max-w-md w-full space-y-8">
// // // //           <h2 className="text-2xl font-bold text-center">User IDs for this mobile</h2>
// // // //           <ul className="mt-4 mb-6">
// // // //             {userIds.map((id) => (
// // // //               <li key={id} className="text-lg text-center py-1">{id}</li>
// // // //             ))}
// // // //           </ul>
// // // //           <button 
// // // //             onClick={() => setShowDashboard(false)} 
// // // //             className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
// // // //           >
// // // //             Create another user
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (step === 2) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // //         <div id="recaptcha-container" style={{ display: 'none' }}></div>
// // // //         <div className="max-w-md w-full space-y-8">
// // // //           <div>
// // // //             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>
// // // //             <p className="text-center text-sm text-gray-600">
// // // //               Enter the 6-digit OTP sent to +91 {mobileForOtp}
// // // //             </p>
// // // //           </div>
          
// // // //           <div className="space-y-4">
// // // //             <div>
// // // //               <input
// // // //                 type="text"
// // // //                 value={otp}
// // // //                 onChange={(e) => setOtp(e.target.value)}
// // // //                 placeholder="Enter OTP"
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// // // //                 maxLength="6"
// // // //               />
// // // //             </div>
            
// // // //             <button
// // // //               onClick={handleVerifyOtp}
// // // //               disabled={isOtpLoading || otp.length !== 6}
// // // //               className={`w-full py-2 px-4 rounded-md text-white ${isOtpLoading || otp.length !== 6 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
// // // //             >
// // // //               {isOtpLoading ? (
// // // //                 <span className="flex items-center justify-center">
// // // //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                   </svg>
// // // //                   Verifying...
// // // //                 </span>
// // // //               ) : 'Verify OTP'}
// // // //             </button>
            
// // // //             <button
// // // //               onClick={() => sendOtp(mobileForOtp)}
// // // //               disabled={isOtpLoading}
// // // //               className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
// // // //             >
// // // //               Resend OTP
// // // //             </button>
            
// // // //             {otpMessage && (
// // // //               <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
// // // //                 {otpMessage}
// // // //               </div>
// // // //             )}
            
// // // //             {otpError && (
// // // //               <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
// // // //                 {otpError}
// // // //               </div>
// // // //             )}
            
// // // //             <button 
// // // //               onClick={() => setStep(1)}
// // // //               className="w-full py-2 px-4 text-indigo-600 hover:text-indigo-800 transition-colors"
// // // //             >
// // // //               Back to Signup
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // //       <div id="recaptcha-container" style={{ display: 'none' }}></div>
// // // //       <div className="max-w-md w-full space-y-8">
// // // //         <div>
// // // //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// // // //             Create your account
// // // //           </h2>
// // // //           <p className="mt-2 text-center text-sm text-gray-600">
// // // //             Enter your details to create a user ID under your mobile
// // // //           </p>
// // // //         </div>
        
// // // //         <Formik
// // // //           initialValues={{
// // // //             name: '',
// // // //             email: '',
// // // //             mobileNumber: '',
// // // //             password: '',
// // // //             confirmPassword: ''
// // // //           }}
// // // //           validationSchema={validationSchema}
// // // //           onSubmit={handleSubmit}
// // // //         >
// // // //           {({ isSubmitting, isValid, dirty }) => (
// // // //             <Form className="mt-8 space-y-6">
// // // //               <div className="space-y-4">
// // // //                 <div>
// // // //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// // // //                     Full Name
// // // //                   </label>
// // // //                   <Field 
// // // //                     id="name" 
// // // //                     name="name" 
// // // //                     type="text" 
// // // //                     autoComplete="name" 
// // // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // // //                     placeholder="Enter your full name"
// // // //                   />
// // // //                   <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// // // //                     Email (optional)
// // // //                   </label>
// // // //                   <Field 
// // // //                     id="email" 
// // // //                     name="email" 
// // // //                     type="email" 
// // // //                     autoComplete="email" 
// // // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // // //                     placeholder="Enter your email"
// // // //                   />
// // // //                   <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
// // // //                     Mobile Number
// // // //                   </label>
// // // //                   <div className="mt-1 flex rounded-md shadow-sm">
// // // //                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
// // // //                       +91
// // // //                     </span>
// // // //                     <Field 
// // // //                       id="mobileNumber" 
// // // //                       name="mobileNumber" 
// // // //                       type="tel" 
// // // //                       autoComplete="tel" 
// // // //                       className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // // //                       placeholder="Enter your 10-digit mobile number"
// // // //                       maxLength="10"
// // // //                     />
// // // //                   </div>
// // // //                   <ErrorMessage name="mobileNumber" component="div" className="mt-1 text-sm text-red-600" />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// // // //                     Password
// // // //                   </label>
// // // //                   <Field 
// // // //                     id="password" 
// // // //                     name="password" 
// // // //                     type="password" 
// // // //                     autoComplete="new-password" 
// // // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // // //                     placeholder="Enter your password"
// // // //                   />
// // // //                   <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
// // // //                 </div>
                
// // // //                 <div>
// // // //                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// // // //                     Confirm Password
// // // //                   </label>
// // // //                   <Field 
// // // //                     id="confirmPassword" 
// // // //                     name="confirmPassword" 
// // // //                     type="password" 
// // // //                     autoComplete="new-password" 
// // // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // // //                     placeholder="Confirm your password"
// // // //                   />
// // // //                   <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
// // // //                 </div>
// // // //               </div>
              
// // // //               {error && (
// // // //                 <div className="rounded-md bg-red-50 p-4">
// // // //                   <div className="flex">
// // // //                     <div className="ml-3">
// // // //                       <h3 className="text-sm font-medium text-red-800">{error}</h3>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
              
// // // //               <div>
// // // //                 <button
// // // //                   type="submit"
// // // //                   disabled={isSubmitting || isLoading || !isValid || !dirty}
// // // //                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting || isLoading || !isValid || !dirty ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
// // // //                 >
// // // //                   {isLoading ? (
// // // //                     <span className="flex items-center justify-center">
// // // //                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                       </svg>
// // // //                       Processing...
// // // //                     </span>
// // // //                   ) : 'Send OTP'}
// // // //                 </button>
// // // //               </div>
              
// // // //               <div className="text-center">
// // // //                 <button
// // // //                   type="button"
// // // //                   onClick={onSwitchToLogin}
// // // //                   className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
// // // //                 >
// // // //                   Already have an account? Sign in
// // // //                 </button>
// // // //               </div>
// // // //             </Form>
// // // //           )}
// // // //         </Formik>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SignupForm;


// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // // import * as Yup from 'yup';
// // // import { authAPI } from '../../services/api';
// // // import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';

// // // const SignupForm = ({ onSignupSuccess, onSwitchToLogin }) => {
// // //   // State management
// // //   const [step, setStep] = useState(1); // 1: form, 2: otp
// // //   const [loading, setLoading] = useState({
// // //     form: false,
// // //     otp: false,
// // //     resend: false
// // //   });
// // //   const [error, setError] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [formData, setFormData] = useState(null);
// // //   const [mobileForOtp, setMobileForOtp] = useState('');
// // //   const [otp, setOtp] = useState('');
// // //   const recaptchaVerifier = useRef(null);

// // //   // Form validation schema
// // //   const validationSchema = Yup.object({
// // //     name: Yup.string()
// // //       .min(2, 'Name must be at least 2 characters')
// // //       .max(50, 'Name cannot exceed 50 characters')
// // //       .required('Name is required'),
// // //     email: Yup.string()
// // //       .email('Please enter a valid email address')
// // //       .nullable(),
// // //     mobileNumber: Yup.string()
// // //       .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
// // //       .required('Mobile number is required'),
// // //     password: Yup.string()
// // //       .min(8, 'Password must be at least 8 characters')
// // //       .matches(
// // //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
// // //         'Password must contain at least one uppercase, one lowercase, one number and one special character'
// // //       )
// // //       .required('Password is required'),
// // //     confirmPassword: Yup.string()
// // //       .oneOf([Yup.ref('password'), null], 'Passwords must match')
// // //       .required('Confirm password is required'),
// // //   });

// // //   // Initialize reCAPTCHA
// // //   useEffect(() => {
// // //     recaptchaVerifier.current = new RecaptchaVerifier(
// // //       'recaptcha-container',
// // //       {
// // //         size: 'invisible',
// // //         callback: () => {
// // //           // This will be called when reCAPTCHA is solved
// // //         },
// // //       },
// // //       auth
// // //     );

// // //     return () => {
// // //       if (recaptchaVerifier.current) {
// // //         recaptchaVerifier.current.clear();
// // //       }
// // //     };
// // //   }, []);

// // //   const sendOtp = async (mobile) => {
// // //     setLoading(prev => ({ ...prev, form: true }));
// // //     setError('');
// // //     setMessage('');
    
// // //     try {
// // //       const phoneNumber = `+91${mobile}`;
// // //       const confirmationResult = await signInWithPhoneNumber(
// // //         auth,
// // //         phoneNumber,
// // //         recaptchaVerifier.current
// // //       );
      
// // //       window.confirmationResult = confirmationResult;
// // //       setMessage('OTP sent to your mobile number.');
// // //       setMobileForOtp(mobile);
// // //       setStep(2);
// // //     } catch (err) {
// // //       console.error('OTP Error:', err);
// // //       setError(err.message || 'Failed to send OTP. Please try again.');
// // //       // Reset recaptcha on error
// // //       recaptchaVerifier.current.clear();
// // //       recaptchaVerifier.current = new RecaptchaVerifier(
// // //         'recaptcha-container',
// // //         {
// // //           size: 'invisible',
// // //           callback: () => {},
// // //         },
// // //         auth
// // //       );
// // //     } finally {
// // //       setLoading(prev => ({ ...prev, form: false }));
// // //     }
// // //   };

// // //   const resendOtp = async () => {
// // //     setLoading(prev => ({ ...prev, resend: true }));
// // //     setError('');
    
// // //     try {
// // //       await sendOtp(mobileForOtp);
// // //       setMessage('New OTP sent to your mobile number.');
// // //     } catch (err) {
// // //       setError(err.message || 'Failed to resend OTP. Please try again.');
// // //     } finally {
// // //       setLoading(prev => ({ ...prev, resend: false }));
// // //     }
// // //   };

// // //   const verifyOtp = async () => {
// // //     setLoading(prev => ({ ...prev, otp: true }));
// // //     setError('');
    
// // //     try {
// // //       // Verify OTP with Firebase
// // //       await window.confirmationResult.confirm(otp);
      
// // //       // OTP verified - proceed with account creation
// // //       try {
// // //         const response = await authAPI.signup({
// // //           name: formData.name,
// // //           email: formData.email,
// // //           mobileNumber: formData.mobileNumber,
// // //           password: formData.password,
// // //         });
        
// // //         if (response.success) {
// // //           onSignupSuccess?.(response.data);
// // //         } else {
// // //           throw new Error(response.message || 'Signup failed');
// // //         }
// // //       } catch (signupErr) {
// // //         throw new Error(signupErr.message || 'Signup failed. Please try again.');
// // //       }
// // //     } catch (err) {
// // //       setError(err.message || 'Invalid OTP. Please try again.');
// // //     } finally {
// // //       setLoading(prev => ({ ...prev, otp: false }));
// // //     }
// // //   };

// // //   const handleFormSubmit = async (values, { setSubmitting }) => {
// // //     setFormData(values);
// // //     await sendOtp(values.mobileNumber);
// // //     setSubmitting(false);
// // //   };

// // //   // OTP Verification Step
// // //   if (step === 2) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //         <div id="recaptcha-container" style={{ display: 'none' }}></div>
// // //         <div className="max-w-md w-full space-y-8">
// // //           <div className="text-center">
// // //             <h2 className="text-3xl font-extrabold text-gray-900">Verify OTP</h2>
// // //             <p className="mt-2 text-sm text-gray-600">
// // //               Enter the 6-digit OTP sent to +91 {mobileForOtp}
// // //             </p>
// // //           </div>
          
// // //           <div className="space-y-4">
// // //             <div>
// // //               <input
// // //                 type="text"
// // //                 value={otp}
// // //                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// // //                 placeholder="Enter 6-digit OTP"
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest"
// // //                 inputMode="numeric"
// // //                 autoFocus
// // //               />
// // //             </div>
            
// // //             <button
// // //               onClick={verifyOtp}
// // //               disabled={loading.otp || otp.length !== 6}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
// // //             >
// // //               {loading.otp ? (
// // //                 <>
// // //                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                   </svg>
// // //                   Verifying...
// // //                 </>
// // //               ) : 'Verify OTP'}
// // //             </button>
            
// // //             <button
// // //               onClick={resendOtp}
// // //               disabled={loading.resend}
// // //               className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
// // //             >
// // //               {loading.resend ? 'Resending OTP...' : 'Resend OTP'}
// // //             </button>
            
// // //             {message && (
// // //               <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
// // //                 {message}
// // //               </div>
// // //             )}
            
// // //             {error && (
// // //               <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
// // //                 {error}
// // //               </div>
// // //             )}
            
// // //             <button 
// // //               onClick={() => {
// // //                 setStep(1);
// // //                 setError('');
// // //                 setMessage('');
// // //               }}
// // //               className="w-full py-2 text-indigo-600 hover:text-indigo-800 text-sm"
// // //             >
// // //               ← Back to Signup
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   // Initial Signup Form
// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div id="recaptcha-container" style={{ display: 'none' }}></div>
// // //       <div className="max-w-md w-full space-y-8">
// // //         <div className="text-center">
// // //           <h2 className="text-3xl font-extrabold text-gray-900">
// // //             Create your account
// // //           </h2>
// // //           <p className="mt-2 text-sm text-gray-600">
// // //             Enter your details to get started
// // //           </p>
// // //         </div>
        
// // //         <Formik
// // //           initialValues={{
// // //             name: '',
// // //             email: '',
// // //             mobileNumber: '',
// // //             password: '',
// // //             confirmPassword: ''
// // //           }}
// // //           validationSchema={validationSchema}
// // //           onSubmit={handleFormSubmit}
// // //         >
// // //           {({ isSubmitting, isValid, dirty }) => (
// // //             <Form className="mt-8 space-y-6">
// // //               <div className="space-y-4">
// // //                 <div>
// // //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// // //                     Full Name
// // //                   </label>
// // //                   <Field 
// // //                     id="name" 
// // //                     name="name" 
// // //                     type="text" 
// // //                     autoComplete="name" 
// // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                     placeholder="Your full name"
// // //                   />
// // //                   <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
// // //                 </div>
                
// // //                 <div>
// // //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// // //                     Email (optional)
// // //                   </label>
// // //                   <Field 
// // //                     id="email" 
// // //                     name="email" 
// // //                     type="email" 
// // //                     autoComplete="email" 
// // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                     placeholder="your.email@example.com"
// // //                   />
// // //                   <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
// // //                 </div>
                
// // //                 <div>
// // //                   <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
// // //                     Mobile Number
// // //                   </label>
// // //                   <div className="mt-1 flex rounded-md shadow-sm">
// // //                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
// // //                       +91
// // //                     </span>
// // //                     <Field 
// // //                       id="mobileNumber" 
// // //                       name="mobileNumber" 
// // //                       type="tel" 
// // //                       autoComplete="tel" 
// // //                       className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                       placeholder="9876543210"
// // //                       maxLength="10"
// // //                     />
// // //                   </div>
// // //                   <ErrorMessage name="mobileNumber" component="div" className="mt-1 text-sm text-red-600" />
// // //                 </div>
                
// // //                 <div>
// // //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// // //                     Password
// // //                   </label>
// // //                   <Field 
// // //                     id="password" 
// // //                     name="password" 
// // //                     type="password" 
// // //                     autoComplete="new-password" 
// // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                     placeholder="At least 8 characters"
// // //                   />
// // //                   <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
// // //                 </div>
                
// // //                 <div>
// // //                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// // //                     Confirm Password
// // //                   </label>
// // //                   <Field 
// // //                     id="confirmPassword" 
// // //                     name="confirmPassword" 
// // //                     type="password" 
// // //                     autoComplete="new-password" 
// // //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// // //                     placeholder="Confirm your password"
// // //                   />
// // //                   <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
// // //                 </div>
// // //               </div>
              
// // //               {error && (
// // //                 <div className="rounded-md bg-red-50 p-3">
// // //                   <p className="text-sm text-red-700">{error}</p>
// // //                 </div>
// // //               )}
              
// // //               <div>
// // //                 <button
// // //                   type="submit"
// // //                   disabled={loading.form || !isValid || !dirty}
// // //                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
// // //                 >
// // //                   {loading.form ? (
// // //                     <>
// // //                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // //                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                       </svg>
// // //                       Sending OTP...
// // //                     </>
// // //                   ) : 'Send OTP'}
// // //                 </button>
// // //               </div>
              
// // //               <div className="text-center text-sm">
// // //                 <p className="text-gray-600">
// // //                   Already have an account?{' '}
// // //                   <button
// // //                     type="button"
// // //                     onClick={onSwitchToLogin}
// // //                     className="font-medium text-indigo-600 hover:text-indigo-500"
// // //                   >
// // //                     Sign in
// // //                   </button>
// // //                 </p>
// // //               </div>
// // //             </Form>
// // //           )}
// // //         </Formik>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default SignupForm;



// // import React, { useState, useEffect } from 'react';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';

// // const SignupForm = () => {
// //   const [step, setStep] = useState(1); // 1: form, 2: otp
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [mobileForOtp, setMobileForOtp] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const navigate = useNavigate();

// //   const validationSchema = Yup.object({
// //     name: Yup.string()
// //       .min(2, 'Name must be at least 2 characters')
// //       .max(50, 'Name cannot exceed 50 characters')
// //       .required('Name is required'),
// //     email: Yup.string()
// //       .email('Please enter a valid email address')
// //       .nullable(),
// //     mobileNumber: Yup.string()
// //       .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
// //       .required('Mobile number is required'),
// //     password: Yup.string()
// //       .min(8, 'Password must be at least 8 characters')
// //       .matches(
// //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
// //         'Password must contain at least one uppercase, one lowercase, one number and one special character'
// //       )
// //       .required('Password is required'),
// //     confirmPassword: Yup.string()
// //       .oneOf([Yup.ref('password'), null], 'Passwords must match')
// //       .required('Confirm password is required'),
// //   });

// //   useEffect(() => {
// //     window.recaptchaVerifier = new RecaptchaVerifier(
// //       'recaptcha-container',
// //       { size: 'invisible' },
// //       auth
// //     );

// //     return () => {
// //       if (window.recaptchaVerifier) {
// //         window.recaptchaVerifier.clear();
// //       }
// //     };
// //   }, []);

// //   const sendOtp = async (mobile) => {
// //     setLoading(true);
// //     setError('');
// //     setMessage('');
    
// //     try {
// //       const phoneNumber = `+91${mobile}`;
// //       const confirmationResult = await signInWithPhoneNumber(
// //         auth,
// //         phoneNumber,
// //         window.recaptchaVerifier
// //       );
      
// //       window.confirmationResult = confirmationResult;
// //       setMessage('OTP sent to your mobile number.');
// //       setMobileForOtp(mobile);
// //       setStep(2);
// //     } catch (err) {
// //       setError(err.message || 'Failed to send OTP. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       await window.confirmationResult.confirm(otp);
// //       setMessage('Account created successfully! Redirecting to login...');
// //       setTimeout(() => navigate('/login'), 2000);
// //     } catch (err) {
// //       setError(err.message || 'Invalid OTP. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFormSubmit = async (values) => {
// //     await sendOtp(values.mobileNumber);
// //     // You would typically save formData to use after OTP verification
// //   };

// //   if (step === 2) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //         <div id="recaptcha-container" style={{ display: 'none' }}></div>
// //         <div className="max-w-md w-full space-y-8">
// //           <div className="text-center">
// //             <h2 className="text-3xl font-extrabold text-gray-900">Verify OTP</h2>
// //             <p className="mt-2 text-sm text-gray-600">
// //               Enter the 6-digit OTP sent to +91 {mobileForOtp}
// //             </p>
// //           </div>
          
// //           {message && (
// //             <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
// //               {message}
// //             </div>
// //           )}

// //           {error && (
// //             <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
// //               {error}
// //             </div>
// //           )}

// //           <div className="space-y-4">
// //             <div>
// //               <input
// //                 type="text"
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                 placeholder="Enter 6-digit OTP"
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest"
// //                 inputMode="numeric"
// //                 autoFocus
// //               />
// //             </div>
            
// //             <button
// //               onClick={verifyOtp}
// //               disabled={loading || otp.length !== 6}
// //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //             >
// //               {loading ? 'Verifying...' : 'Verify OTP'}
// //             </button>
            
// //             <button
// //               onClick={() => sendOtp(mobileForOtp)}
// //               disabled={loading}
// //               className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
// //             >
// //               Resend OTP
// //             </button>
            
// //             <button 
// //               onClick={() => {
// //                 setStep(1);
// //                 setError('');
// //                 setMessage('');
// //               }}
// //               className="w-full py-2 text-indigo-600 hover:text-indigo-800 text-sm"
// //             >
// //               ← Back to Signup
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div id="recaptcha-container" style={{ display: 'none' }}></div>
// //       <div className="max-w-md w-full space-y-8">
// //         <div className="text-center">
// //           <h2 className="text-3xl font-extrabold text-gray-900">
// //             Create your account
// //           </h2>
// //           <p className="mt-2 text-sm text-gray-600">
// //             Or{' '}
// //             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
// //               sign in to your account
// //             </Link>
// //           </p>
// //         </div>
        
// //         <Formik
// //           initialValues={{
// //             name: '',
// //             email: '',
// //             mobileNumber: '',
// //             password: '',
// //             confirmPassword: ''
// //           }}
// //           validationSchema={validationSchema}
// //           onSubmit={handleFormSubmit}
// //         >
// //           {({ isSubmitting, isValid, dirty }) => (
// //             <Form className="mt-8 space-y-6">
// //               <div className="space-y-4">
// //                 <div>
// //                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
// //                     Full Name
// //                   </label>
// //                   <Field 
// //                     id="name" 
// //                     name="name" 
// //                     type="text" 
// //                     autoComplete="name" 
// //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                     placeholder="Your full name"
// //                   />
// //                   <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //                     Email (optional)
// //                   </label>
// //                   <Field 
// //                     id="email" 
// //                     name="email" 
// //                     type="email" 
// //                     autoComplete="email" 
// //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                     placeholder="your.email@example.com"
// //                   />
// //                   <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
// //                     Mobile Number
// //                   </label>
// //                   <div className="mt-1 flex rounded-md shadow-sm">
// //                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
// //                       +91
// //                     </span>
// //                     <Field 
// //                       id="mobileNumber" 
// //                       name="mobileNumber" 
// //                       type="tel" 
// //                       autoComplete="tel" 
// //                       className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                       placeholder="9876543210"
// //                       maxLength="10"
// //                     />
// //                   </div>
// //                   <ErrorMessage name="mobileNumber" component="div" className="mt-1 text-sm text-red-600" />
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                     Password
// //                   </label>
// //                   <Field 
// //                     id="password" 
// //                     name="password" 
// //                     type="password" 
// //                     autoComplete="new-password" 
// //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                     placeholder="At least 6 characters"
// //                   />
// //                   <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
// //                 </div>
                
// //                 <div>
// //                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// //                     Confirm Password
// //                   </label>
// //                   <Field 
// //                     id="confirmPassword" 
// //                     name="confirmPassword" 
// //                     type="password" 
// //                     autoComplete="new-password" 
// //                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                     placeholder="Confirm your password"
// //                   />
// //                   <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
// //                 </div>
// //               </div>
              
// //               {error && (
// //                 <div className="rounded-md bg-red-50 p-3">
// //                   <p className="text-sm text-red-700">{error}</p>
// //                 </div>
// //               )}
              
// //               <div>
// //                 <button
// //                   type="submit"
// //                   disabled={loading || !isValid || !dirty}
// //                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //                 >
// //                   {loading ? 'Sending OTP...' : 'Sign Up'}
// //                 </button>
// //               </div>
// //             </Form>
// //           )}
// //         </Formik>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignupForm;


// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
// import { authAPI } from '../../services/api';

// const SignupForm = () => {
//   const [step, setStep] = useState(1); // 1: form, 2: otp, 3: success
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [mobileForOtp, setMobileForOtp] = useState('');
//   const [otp, setOtp] = useState('');
//   const [generatedUserId, setGeneratedUserId] = useState('');
//   const [formData, setFormData] = useState(null);
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(2, 'Name must be at least 2 characters')
//       .max(50, 'Name cannot exceed 50 characters')
//       .required('Name is required'),
//     email: Yup.string()
//       .email('Please enter a valid email address')
//       .nullable(),
//     mobileNumber: Yup.string()
//       .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
//       .required('Mobile number is required'),
//     password: Yup.string()
//       .min(6, 'Password must be at least 6 characters')
//       .matches(
//         /^(?=.*[a-zA-Z])(?=.*\d).+$/,
//         'Password must contain at least one letter and one number'
//       )
//       .required('Password is required'),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm password is required'),
//   });

//   // useEffect(() => {
//   //   window.recaptchaVerifier = new RecaptchaVerifier(
//   //     'recaptcha-container',
//   //     { size: 'invisible' },
//   //     auth
//   //   );

//   //   return () => {
//   //     if (window.recaptchaVerifier) {
//   //       window.recaptchaVerifier.clear();
//   //     }
//   //   };
//   // }, []);

//   // const sendOtp = async (mobile) => {
//   //   setLoading(true);
//   //   setError('');
//   //   setMessage('');
    
//   //   try {
//   //     const phoneNumber = `+91${mobile}`;
//   //     const confirmationResult = await signInWithPhoneNumber(
//   //       auth,
//   //       phoneNumber,
//   //       window.recaptchaVerifier
//   //     );
      
//   //     window.confirmationResult = confirmationResult;
//   //     setMessage('OTP sent to your mobile number.');
//   //     setMobileForOtp(mobile);
//   //     setStep(2);
//   //   } catch (err) {
//   //     setError(err.message || 'Failed to send OTP. Please try again.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       'recaptcha-container',
//       { size: 'invisible' },
//       auth
//     );
//     window.recaptchaVerifier.render();
//   }
// }, []);

// const sendOtp = async (mobile) => {
//   setLoading(true);
//   setError('');
//   setMessage('');
  
//   try {
//     const phoneNumber = `+91${mobile}`;
//     const confirmationResult = await signInWithPhoneNumber(
//       auth,
//       phoneNumber,
//       window.recaptchaVerifier
//     );
    
//     window.confirmationResult = confirmationResult;
//     setMessage('OTP sent to your mobile number.');
//     setMobileForOtp(mobile);
//     setStep(2);
//   } catch (err) {
//     console.error("OTP Error:", err);
//     if (err.code === "auth/invalid-app-credential") {
//       setError("Firebase config invalid है। कृपया .env values check करो।");
//     } else if (err.code === "auth/missing-phone-number") {
//       setError("Phone number सही format में दो (+91XXXXXXXXXX).");
//     } else {
//       setError(err.message || 'Failed to send OTP. Please try again.');
//     }
//   } finally {
//     setLoading(false);
//   }
// };


//   const generateUserId = async (mobileNumber) => {
//     try {
//       const response = await authAPI.generateUserId({ mobileNumber });
//       if (response.success) {
//         return response.userId; // Format: user1, user2, ..., user100
//       }
//       throw new Error(response.message || 'Failed to generate user ID');
//     } catch (err) {
//       throw err;
//     }
//   };

//   const verifyOtp = async () => {
//     setLoading(true);
//     setError('');
    
//     try {
//       await window.confirmationResult.confirm(otp);
      
//       // Generate user ID after OTP verification
//       const userId = await generateUserId(mobileForOtp);
//       setGeneratedUserId(userId);
      
//       // Complete signup with all form data
//       const response = await authAPI.completeSignup({
//         ...formData,
//         userId
//       });
      
//       if (response.success) {
//         setMessage('Account created successfully!');
//         setStep(3);
//       } else {
//         throw new Error(response.message || 'Signup failed');
//       }
//     } catch (err) {
//       setError(err.message || 'Invalid OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFormSubmit = async (values) => {
//     setFormData(values); // Store form data for later use
//     await sendOtp(values.mobileNumber);
//   };

//   // Step 3: Success screen with generated user ID
//   if (step === 3) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Registration Complete</h2>
//             <p className="mt-4 text-lg">
//               Your User ID: <span className="font-bold">{generatedUserId}</span>
//             </p>
//             <p className="mt-2 text-sm text-gray-600">
//               Please note this ID carefully as you'll need it to login.
//             </p>
//           </div>
          
//           <div className="mt-6">
//             <button
//               onClick={() => navigate('/login')}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Proceed to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Step 2: OTP Verification
//   if (step === 2) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div id="recaptcha-container" style={{ display: 'none' }}></div>
//         <div className="max-w-md w-full space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold text-gray-900">Verify OTP</h2>
//             <p className="mt-2 text-sm text-gray-600">
//               Enter the 6-digit OTP sent to +91 {mobileForOtp}
//             </p>
//           </div>
          
//           {message && (
//             <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
//               {message}
//             </div>
//           )}

//           {error && (
//             <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                 placeholder="Enter 6-digit OTP"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest"
//                 inputMode="numeric"
//                 autoFocus
//               />
//             </div>
            
//             <button
//               onClick={verifyOtp}
//               disabled={loading || otp.length !== 6}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               {loading ? 'Verifying...' : 'Verify OTP'}
//             </button>
            
//             <button
//               onClick={() => sendOtp(mobileForOtp)}
//               disabled={loading}
//               className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
//             >
//               Resend OTP
//             </button>
            
//             <button 
//               onClick={() => {
//                 setStep(1);
//                 setError('');
//                 setMessage('');
//               }}
//               className="w-full py-2 text-indigo-600 hover:text-indigo-800 text-sm"
//             >
//               ← Back to Signup
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Step 1: Registration Form
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div id="recaptcha-container" style={{ display: 'none' }}></div>
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Or{' '}
//             <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//               sign in to your account
//             </Link>
//           </p>
//         </div>
        
//         <Formik
//           initialValues={{
//             name: '',
//             email: '',
//             mobileNumber: '',
//             password: '',
//             confirmPassword: ''
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleFormSubmit}
//         >
//           {({ isSubmitting, isValid, dirty }) => (
//             <Form className="mt-8 space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Full Name
//                   </label>
//                   <Field 
//                     id="name" 
//                     name="name" 
//                     type="text" 
//                     autoComplete="name" 
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Your full name"
//                   />
//                   <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
//                 </div>
                
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email (optional)
//                   </label>
//                   <Field 
//                     id="email" 
//                     name="email" 
//                     type="email" 
//                     autoComplete="email" 
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="your.email@example.com"
//                   />
//                   <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
//                 </div>
                
//                 <div>
//                   <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
//                     Mobile Number
//                   </label>
//                   <div className="mt-1 flex rounded-md shadow-sm">
//                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
//                       +91
//                     </span>
//                     <Field 
//                       id="mobileNumber" 
//                       name="mobileNumber" 
//                       type="tel" 
//                       autoComplete="tel" 
//                       className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       placeholder="9876543210"
//                       maxLength="10"
//                     />
//                   </div>
//                   <ErrorMessage name="mobileNumber" component="div" className="mt-1 text-sm text-red-600" />
//                 </div>
                
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <Field 
//                     id="password" 
//                     name="password" 
//                     type="password" 
//                     autoComplete="new-password" 
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="At least 6 characters with letters and numbers"
//                   />
//                   <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
//                 </div>
                
//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                     Confirm Password
//                   </label>
//                   <Field 
//                     id="confirmPassword" 
//                     name="confirmPassword" 
//                     type="password" 
//                     autoComplete="new-password" 
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                     placeholder="Confirm your password"
//                   />
//                   <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
//                 </div>
//               </div>
              
//               {error && (
//                 <div className="rounded-md bg-red-50 p-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               )}
              
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading || !isValid || !dirty}
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//                 >
//                   {loading ? 'Sending OTP...' : 'Sign Up'}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
import { authAPI } from '../../services/api';

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1: form, 2: otp, 3: success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mobileForOtp, setMobileForOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedUserId, setGeneratedUserId] = useState('');
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  // ✅ Validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('Name is required'),
    email: Yup.string().email('Please enter a valid email address').nullable(),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Password must contain at least one letter and one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // ✅ Setup Recaptcha once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
    }
  }, []);

  // ✅ Send OTP
  const sendOtp = async (mobile) => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const phoneNumber = `+91${mobile}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setMessage('OTP sent to your mobile number.');
      setMobileForOtp(mobile);
      setStep(2);
    } catch (err) {
      console.error("OTP Error:", err);
      if (err.code === "auth/invalid-app-credential") {
        setError("Firebase config invalid है। .env values और storageBucket check करो।");
      } else if (err.code === "auth/missing-phone-number") {
        setError("Phone number सही format में दो (+91XXXXXXXXXX).");
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      await window.confirmationResult.confirm(otp);

      // Generate user ID
      const userId = await generateUserId(mobileForOtp);
      setGeneratedUserId(userId);

      // Complete signup
      const response = await authAPI.completeSignup({
        ...formData,
        userId
      });

      if (response.success) {
        setMessage('Account created successfully!');
        setStep(3);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate User ID
  const generateUserId = async (mobileNumber) => {
    try {
      const response = await authAPI.generateUserId({ mobileNumber });
      if (response.success) return response.userId;
      throw new Error(response.message || 'Failed to generate user ID');
    } catch (err) {
      throw err;
    }
  };

  // ✅ Handle Signup Submit
  const handleFormSubmit = async (values) => {
    setFormData(values);
    await sendOtp(values.mobileNumber);
  };

  // ==================== SCREENS ====================

  // Step 3: Success
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Registration Complete</h2>
            <p className="mt-4 text-lg">
              Your User ID: <span className="font-bold">{generatedUserId}</span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please note this ID carefully as you'll need it to login.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: OTP Verification
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div id="recaptcha-container"></div>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Verify OTP</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit OTP sent to +91 {mobileForOtp}
            </p>
          </div>

          {message && <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">{message}</div>}
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border rounded-md text-center text-lg tracking-widest"
              inputMode="numeric"
              autoFocus
            />
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={() => sendOtp(mobileForOtp)}
              disabled={loading}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Resend OTP
            </button>
            <button
              onClick={() => { setStep(1); setError(''); setMessage(''); }}
              className="w-full py-2 text-indigo-600 hover:text-indigo-800 text-sm"
            >
              ← Back to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div id="recaptcha-container"></div>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{ name: '', email: '', mobileNumber: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <Field name="name" type="text" placeholder="Your full name"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email (optional)</label>
                  <Field name="email" type="email" placeholder="your.email@example.com"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium">Mobile Number</label>
                  <div className="flex mt-1">
                    <span className="px-3 py-2 border bg-gray-50 text-gray-500">+91</span>
                    <Field name="mobileNumber" type="tel" maxLength="10" placeholder="9876543210"
                      className="flex-1 px-3 py-2 border rounded-r-md" />
                  </div>
                  <ErrorMessage name="mobileNumber" component="div" className="text-sm text-red-600" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <Field name="password" type="password" placeholder="At least 6 characters"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <Field name="confirmPassword" type="password" placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600" />
                </div>
              </div>

              {error && <div className="bg-red-50 p-3 text-sm text-red-700 rounded-md">{error}</div>}

              <button
                type="submit"
                disabled={loading || !isValid || !dirty}
                className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
