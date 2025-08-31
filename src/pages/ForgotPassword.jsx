// // // // import React, { useState } from 'react';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import { NavLink } from 'react-router-dom';
// // // // import { authAPI } from '../services/api';
// // // // import { API_URL } from '../config';

// // // // const ForgotPassword = () => {
// // // //   const [step, setStep] = useState(1); // 1: mobile, 2: otp, 3: reset
// // // //   const [mobile, setMobile] = useState('');
// // // //   const [otp, setOtp] = useState('');
// // // //   const [otpError, setOtpError] = useState('');
// // // //   const [otpMessage, setOtpMessage] = useState('');
// // // //   const [isOtpLoading, setIsOtpLoading] = useState(false);
// // // //   const [newPassword, setNewPassword] = useState('');
// // // //   const [confirmPassword, setConfirmPassword] = useState('');
// // // //   const [resetError, setResetError] = useState('');
// // // //   const [resetMessage, setResetMessage] = useState('');
// // // //   const navigate = useNavigate();

// // // //   const sendOtp = async () => {
// // // //     setIsOtpLoading(true);
// // // //     setOtpError('');
// // // //     setOtpMessage('');
// // // //     try {
// // // //       // Using fetch with API_URL from config
// // // //       const response = await fetch(`${API_URL.replace('/api', '')}/auth/send-otp`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({ mobile }),
// // // //       });
// // // //       const data = await response.json();
// // // //       if (!response.ok) {
// // // //         throw new Error(data.error || 'Failed to send OTP');
// // // //       }
// // // //       setOtpMessage('OTP sent to your mobile number.');
// // // //       setStep(2);
// // // //     } catch (err) {
// // // //       setOtpError(err.message || 'Failed to send OTP');
// // // //     } finally {
// // // //       setIsOtpLoading(false);
// // // //     }
// // // //   };

// // // //   const verifyOtp = async () => {
// // // //     setIsOtpLoading(true);
// // // //     setOtpError('');
// // // //     setOtpMessage('');
// // // //     try {
// // // //       // Using fetch with API_URL from config
// // // //       const response = await fetch(`${API_URL.replace('/api', '')}/auth/verify-otp`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({ mobile, otp }),
// // // //       });
// // // //       const data = await response.json();
// // // //       if (!response.ok) {
// // // //         throw new Error(data.error || 'OTP verification failed');
// // // //       }
// // // //       setStep(3);
// // // //     } catch (err) {
// // // //       setOtpError(err.message || 'OTP verification failed');
// // // //     } finally {
// // // //       setIsOtpLoading(false);
// // // //     }
// // // //   };

// // // //   const handleResetPassword = async () => {
// // // //     setResetError('');
// // // //     setResetMessage('');
// // // //     if (!newPassword || newPassword.length < 6) {
// // // //       setResetError('Password must be at least 6 characters');
// // // //       return;
// // // //     }
// // // //     if (newPassword !== confirmPassword) {
// // // //       setResetError('Passwords do not match');
// // // //       return;
// // // //     }
// // // //     try {
// // // //       // Using fetch with API_URL from config
// // // //       const response = await fetch(`${API_URL}/auth/reset-password`, {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify({ mobile, newPassword }),
// // // //       });
// // // //       const data = await response.json();
// // // //       if (!response.ok) {
// // // //         throw new Error(data.error || 'Password reset failed');
// // // //       }
// // // //       setResetMessage('Password reset successful! Redirecting to login...');
// // // //       setTimeout(() => navigate('/login'), 2000);
// // // //     } catch (err) {
// // // //       setResetError(err.message || 'Password reset failed');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // // //       <div className="max-w-md w-full space-y-8">
// // // //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
// // // //         {step === 1 && (
// // // //           <div className="space-y-4">
// // // //             <input
// // // //               type="text"
// // // //               value={mobile}
// // // //               onChange={e => setMobile(e.target.value)}
// // // //               placeholder="Enter your mobile number"
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // // //             />
// // // //             <button
// // // //               onClick={sendOtp}
// // // //               disabled={isOtpLoading || !mobile}
// // // //               className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
// // // //             >
// // // //               {isOtpLoading ? 'Sending OTP...' : 'Send OTP'}
// // // //             </button>
// // // //             {otpMessage && <div className="text-green-600 text-sm">{otpMessage}</div>}
// // // //             {otpError && <div className="text-red-600 text-sm">{otpError}</div>}
// // // //           </div>
// // // //         )}
// // // //         {step === 2 && (
// // // //           <div className="space-y-4">
// // // //             <input
// // // //               type="text"
// // // //               value={otp}
// // // //               onChange={e => setOtp(e.target.value)}
// // // //               placeholder="Enter OTP"
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // // //             />
// // // //             <button
// // // //               onClick={verifyOtp}
// // // //               disabled={isOtpLoading || !otp}
// // // //               className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
// // // //             >
// // // //               {isOtpLoading ? 'Verifying...' : 'Verify OTP'}
// // // //             </button>
// // // //             <button
// // // //               onClick={sendOtp}
// // // //               disabled={isOtpLoading}
// // // //               className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md"
// // // //             >
// // // //               Resend OTP
// // // //             </button>
// // // //             {otpMessage && <div className="text-green-600 text-sm">{otpMessage}</div>}
// // // //             {otpError && <div className="text-red-600 text-sm">{otpError}</div>}
// // // //             <button onClick={() => setStep(1)} className="w-full py-2 px-4 text-indigo-600">Back</button>
// // // //           </div>
// // // //         )}
// // // //         {step === 3 && (
// // // //           <div className="space-y-4">
// // // //             <input
// // // //               type="password"
// // // //               value={newPassword}
// // // //               onChange={e => setNewPassword(e.target.value)}
// // // //               placeholder="Enter new password"
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // // //             />
// // // //             <input
// // // //               type="password"
// // // //               value={confirmPassword}
// // // //               onChange={e => setConfirmPassword(e.target.value)}
// // // //               placeholder="Confirm new password"
// // // //               className="w-full px-3 py-2 border border-gray-300 rounded-md"
// // // //             />
// // // //             <button
// // // //               onClick={handleResetPassword}
// // // //               className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md"
// // // //             >
// // // //               Reset Password
// // // //             </button>
// // // //             {resetMessage && <div className="text-green-600 text-sm">{resetMessage}</div>}
// // // //             {resetError && <div className="text-red-600 text-sm">{resetError}</div>}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ForgotPassword;


// // // import React, { useState } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // import { 
// // //   auth, 
// // //   RecaptchaVerifier, 
// // //   signInWithPhoneNumber,
// // //   updatePassword 
// // // } from '../firebase';

// // // const ForgotPasswordForm = () => {
// // //   const [mobile, setMobile] = useState('');
// // //   const [otp, setOtp] = useState('');
// // //   const [newPassword, setNewPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [step, setStep] = useState(1); // 1: enter mobile, 2: enter OTP, 3: enter new password
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const navigate = useNavigate();

// // //   const setUpRecaptcha = () => {
// // //     const recaptchaVerifier = new RecaptchaVerifier(
// // //       'recaptcha-container', 
// // //       { size: 'invisible' }, 
// // //       auth
// // //     );
// // //     return recaptchaVerifier;
// // //   };

// // //   const sendOtp = async () => {
// // //     setLoading(true);
// // //     setError('');
// // //     setMessage('');
// // //     try {
// // //       const appVerifier = setUpRecaptcha();
// // //       const phoneNumber = `+${mobile.replace(/\D/g, '')}`;
      
// // //       const confirmationResult = await auth().signInWithPhoneNumber(
// // //         phoneNumber, 
// // //         appVerifier
// // //       );
      
// // //       window.confirmationResult = confirmationResult;
// // //       setStep(2);
// // //       setMessage('OTP sent to your mobile number.');
// // //     } catch (err) {
// // //       setError(err.message || 'Failed to send OTP');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const verifyOtp = async () => {
// // //     setLoading(true);
// // //     setError('');
// // //     setMessage('');
// // //     try {
// // //       const result = await window.confirmationResult.confirm(otp);
// // //       // Store the user credential for password update
// // //       window.passwordResetUser = result.user;
// // //       setStep(3);
// // //       setMessage('OTP verified. Please set your new password.');
// // //     } catch (err) {
// // //       setError(err.message || 'Invalid OTP');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleResetPassword = async () => {
// // //     setLoading(true);
// // //     setError('');
// // //     setMessage('');
    
// // //     // Client-side validation
// // //     if (!newPassword || newPassword.length < 6) {
// // //       setError('Password must be at least 6 characters');
// // //       setLoading(false);
// // //       return;
// // //     }
// // //     if (newPassword !== confirmPassword) {
// // //       setError('Passwords do not match');
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       // Update password using Firebase
// // //       await updatePassword(window.passwordResetUser, newPassword);
// // //       setMessage('Password reset successfully! Redirecting to login...');
// // //       setTimeout(() => navigate('/login'), 2000);
// // //     } catch (err) {
// // //       setError(err.message || 'Password reset failed');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// // //       <div id="recaptcha-container" style={{ display: 'none' }}></div>
// // //       <div className="max-w-md w-full space-y-8">
// // //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// // //           {step === 1 && 'Reset Password'}
// // //           {step === 2 && 'Verify OTP'}
// // //           {step === 3 && 'Set New Password'}
// // //         </h2>

// // //         {message && (
// // //           <div className="rounded-md bg-green-50 p-4">
// // //             <div className="flex">
// // //               <div className="ml-3">
// // //                 <p className="text-sm font-medium text-green-800">{message}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {error && (
// // //           <div className="rounded-md bg-red-50 p-4">
// // //             <div className="flex">
// // //               <div className="ml-3">
// // //                 <p className="text-sm font-medium text-red-800">{error}</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {step === 1 && (
// // //           <div className="space-y-4">
// // //             <div>
// // //               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
// // //                 Mobile Number
// // //               </label>
// // //               <input
// // //                 id="mobile"
// // //                 name="mobile"
// // //                 type="tel"
// // //                 value={mobile}
// // //                 onChange={(e) => setMobile(e.target.value)}
// // //                 className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Enter your mobile number"
// // //               />
// // //             </div>
// // //             <button
// // //               onClick={sendOtp}
// // //               disabled={loading || !mobile}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// // //             >
// // //               {loading ? 'Sending...' : 'Send OTP'}
// // //             </button>
// // //           </div>
// // //         )}

// // //         {step === 2 && (
// // //           <div className="space-y-4">
// // //             <div>
// // //               <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
// // //                 OTP
// // //               </label>
// // //               <input
// // //                 id="otp"
// // //                 name="otp"
// // //                 type="text"
// // //                 value={otp}
// // //                 onChange={(e) => setOtp(e.target.value)}
// // //                 className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Enter OTP"
// // //               />
// // //             </div>
// // //             <button
// // //               onClick={verifyOtp}
// // //               disabled={loading || !otp}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// // //             >
// // //               {loading ? 'Verifying...' : 'Verify OTP'}
// // //             </button>
// // //             <button
// // //               onClick={sendOtp}
// // //               disabled={loading}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:text-indigo-500"
// // //             >
// // //               Resend OTP
// // //             </button>
// // //             <button 
// // //               onClick={() => setStep(1)}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-600 hover:text-gray-500"
// // //             >
// // //               Back
// // //             </button>
// // //           </div>
// // //         )}

// // //         {step === 3 && (
// // //           <div className="space-y-4">
// // //             <div>
// // //               <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
// // //                 New Password
// // //               </label>
// // //               <input
// // //                 id="newPassword"
// // //                 name="newPassword"
// // //                 type="password"
// // //                 value={newPassword}
// // //                 onChange={(e) => setNewPassword(e.target.value)}
// // //                 className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Enter new password"
// // //               />
// // //             </div>
// // //             <div>
// // //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// // //                 Confirm Password
// // //               </label>
// // //               <input
// // //                 id="confirmPassword"
// // //                 name="confirmPassword"
// // //                 type="password"
// // //                 value={confirmPassword}
// // //                 onChange={(e) => setConfirmPassword(e.target.value)}
// // //                 className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// // //                 placeholder="Confirm new password"
// // //               />
// // //             </div>
// // //             <button
// // //               onClick={handleResetPassword}
// // //               disabled={loading || !newPassword || !confirmPassword}
// // //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// // //             >
// // //               {loading ? 'Resetting...' : 'Reset Password'}
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ForgotPasswordForm;



// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { auth, RecaptchaVerifier, signInWithPhoneNumber, updatePassword } from '../firebase';

// // const ForgotPassword = () => {
// //   const [mobile, setMobile] = useState('');
// //   const [otp, setOtp] = useState('');
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [step, setStep] = useState(1); // 1: mobile, 2: otp, 3: reset
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [message, setMessage] = useState('');
// //   const navigate = useNavigate();

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

// //   const sendOtp = async () => {
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
// //       setStep(2);
// //     } catch (err) {
// //       setError(err.message || 'Failed to send OTP');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const verifyOtp = async () => {
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       await window.confirmationResult.confirm(otp);
// //       setMessage('OTP verified. Please set your new password.');
// //       setStep(3);
// //     } catch (err) {
// //       setError(err.message || 'Invalid OTP');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleResetPassword = async () => {
// //     if (newPassword !== confirmPassword) {
// //       setError('Passwords do not match');
// //       return;
// //     }

// //     if (newPassword.length < 6) {
// //       setError('Password must be at least 6 characters');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const user = auth.currentUser;
// //       await updatePassword(user, newPassword);
// //       setMessage('Password reset successfully! Redirecting to login...');
// //       setTimeout(() => navigate('/login'), 2000);
// //     } catch (err) {
// //       setError(err.message || 'Failed to reset password');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div id="recaptcha-container" style={{ display: 'none' }}></div>
// //       <div className="max-w-md w-full space-y-8">
// //         <div>
// //           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
// //             {step === 1 && 'Reset Password'}
// //             {step === 2 && 'Verify OTP'}
// //             {step === 3 && 'Set New Password'}
// //           </h2>
// //         </div>

// //         {message && (
// //           <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
// //             {message}
// //           </div>
// //         )}

// //         {error && (
// //           <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
// //             {error}
// //           </div>
// //         )}

// //         {step === 1 && (
// //           <div className="space-y-4">
// //             <div>
// //               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
// //                 Mobile Number
// //               </label>
// //               <div className="mt-1 flex rounded-md shadow-sm">
// //                 <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
// //                   +91
// //                 </span>
// //                 <input
// //                   id="mobile"
// //                   name="mobile"
// //                   type="tel"
// //                   value={mobile}
// //                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
// //                   className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                   placeholder="9876543210"
// //                 />
// //               </div>
// //             </div>
// //             <button
// //               onClick={sendOtp}
// //               disabled={loading || mobile.length !== 10}
// //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //             >
// //               {loading ? 'Sending OTP...' : 'Send OTP'}
// //             </button>
// //             <div className="text-center text-sm">
// //               <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
// //                 Back to Login
// //               </Link>
// //             </div>
// //           </div>
// //         )}

// //         {step === 2 && (
// //           <div className="space-y-4">
// //             <div>
// //               <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
// //                 OTP
// //               </label>
// //               <input
// //                 id="otp"
// //                 name="otp"
// //                 type="text"
// //                 value={otp}
// //                 onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center text-lg tracking-widest"
// //                 placeholder="Enter 6-digit OTP"
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
// //               onClick={sendOtp}
// //               disabled={loading}
// //               className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 text-sm"
// //             >
// //               Resend OTP
// //             </button>
// //           </div>
// //         )}

// //         {step === 3 && (
// //           <div className="space-y-4">
// //             <div>
// //               <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
// //                 New Password
// //               </label>
// //               <input
// //                 id="newPassword"
// //                 name="newPassword"
// //                 type="password"
// //                 value={newPassword}
// //                 onChange={(e) => setNewPassword(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 placeholder="Enter new password"
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
// //                 Confirm Password
// //               </label>
// //               <input
// //                 id="confirmPassword"
// //                 name="confirmPassword"
// //                 type="password"
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                 placeholder="Confirm new password"
// //               />
// //             </div>
// //             <button
// //               onClick={handleResetPassword}
// //               disabled={loading || !newPassword || !confirmPassword}
// //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
// //             >
// //               {loading ? 'Resetting...' : 'Reset Password'}
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;



// const sendOtp = async () => {
//   setLoading(true);
//   setError('');
//   setMessage('');

//   try {
//     const phoneNumber = `+91${mobile}`;
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible'
//       });
//     }

//     const appVerifier = window.recaptchaVerifier;
//     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

//     window.confirmationResult = confirmationResult;
//     setMessage('OTP sent to your mobile number.');
//     setStep(2);
//   } catch (err) {
//     setError(err.code || err.message || 'Failed to send OTP');
//   } finally {
//     setLoading(false);
//   }
// };

// const verifyOtp = async () => {
//   setLoading(true);
//   setError('');

//   try {
//     const result = await window.confirmationResult.confirm(otp);
//     const user = result.user;
//     setMessage('OTP verified. Please set your new password.');
//     setStep(3);
//   } catch (err) {
//     setError(err.code || err.message || 'Invalid OTP');
//   } finally {
//     setLoading(false);
//   }
// };

// const handleResetPassword = async () => {
//   if (newPassword !== confirmPassword) {
//     setError('Passwords do not match');
//     return;
//   }

//   if (newPassword.length < 6) {
//     setError('Password must be at least 6 characters');
//     return;
//   }

//   setLoading(true);
//   setError('');

//   try {
//     // 👉 Instead of Firebase updatePassword, call your backend API
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/reset-password`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ mobile, newPassword })
//     });

//     if (!response.ok) throw new Error('Failed to reset password');

//     setMessage('Password reset successfully! Redirecting to login...');
//     setTimeout(() => navigate('/login'), 2000);
//   } catch (err) {
//     setError(err.message || 'Failed to reset password');
//   } finally {
//     setLoading(false);
//   }
// };


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"; // 👈 make sure firebase.js exports "auth"

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // 🔹 Step 1: Send OTP
  const sendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const phoneNumber = `+91${mobile}`;
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setMessage("✅ OTP sent to your mobile number.");
      setStep(2);
    } catch (err) {
      setError(err.code || err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 2: Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await window.confirmationResult.confirm(otp);
      if (result.user) {
        setMessage("✅ OTP verified. Please set your new password.");
        setStep(3);
      }
    } catch (err) {
      setError(err.code || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Step 3: Reset Password via Backend
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile, newPassword }),
        }
      );

      if (!response.ok) throw new Error("Failed to reset password");

      setMessage("✅ Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <h2>Forgot Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={sendOtp} disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <div id="recaptcha-container"></div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp} disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleResetPassword} disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;


