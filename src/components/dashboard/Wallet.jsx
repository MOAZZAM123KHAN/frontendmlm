// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import { ArrowUp, Clock, CheckCircle, X, Loader, Banknote, Plus, Minus } from 'lucide-react';

// // // // // // const EnhancedWallet = ({ userId: propUserId, userToken: propUserToken }) => {
// // // // // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // // // // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // // // // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // // // // //   const [loading, setLoading] = useState({ wallet: false, withdrawals: false, submit: false });
// // // // // //   const [error, setError] = useState('');
// // // // // //   const [success, setSuccess] = useState('');
// // // // // //   const [activeTab, setActiveTab] = useState('transactions'); // 'transactions' or 'withdrawals'

// // // // // //   // Withdrawal form state
// // // // // //   const [withdrawalForm, setWithdrawalForm] = useState({
// // // // // //     bankName: '',
// // // // // //     accountNumber: '',
// // // // // //     ifscCode: '',
// // // // // //     mobileNumber: '',
// // // // // //     amount: ''
// // // // // //   });

// // // // // //   // Form validation state
// // // // // //   const [formErrors, setFormErrors] = useState({
// // // // // //     bankName: '',
// // // // // //     accountNumber: '',
// // // // // //     ifscCode: '',
// // // // // //     mobileNumber: '',
// // // // // //     amount: ''
// // // // // //   });

// // // // // //   // helper: parse JWT to extract userId if token contains it
// // // // // //   const parseJwt = (token) => {
// // // // // //     if (!token) return null;
// // // // // //     try {
// // // // // //       const payload = JSON.parse(atob(token.split('.')[1]));
// // // // // //       return payload.userId || payload.sub || null;
// // // // // //     } catch (e) {
// // // // // //       return null;
// // // // // //     }
// // // // // //   };

// // // // // //   // Resolve token and userId (prop -> localStorage.authData -> token)
// // // // // //   const resolvedToken = propUserToken
// // // // // //     || localStorage.getItem('token')
// // // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.token
// // // // // //     || '';

// // // // // //   const resolvedUserId = propUserId
// // // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.userId
// // // // // //     || parseJwt(resolvedToken)
// // // // // //     || null;

// // // // // //   const userAuthHeaders = () => {
// // // // // //     const token = resolvedToken;
// // // // // //     return {
// // // // // //       'Content-Type': 'application/json',
// // // // // //       Authorization: token ? `Bearer ${token}` : '',
// // // // // //     };
// // // // // //   };

// // // // // //   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// // // // // //   // fetch functions wrapped with useCallback so they can be safely used in useEffect deps
// // // // // //   const fetchWalletData = useCallback(async () => {
// // // // // //     if (!resolvedUserId) return;
// // // // // //     try {
// // // // // //       const res = await fetch(`${API_URL}/wallet/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // // //       const data = await res.json();
// // // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load wallet');
// // // // // //       setWallet({ balance: data.wallet?.balance || 0, transactions: data.wallet?.transactions || [] });
// // // // // //     } catch (err) {
// // // // // //       setError('Failed to fetch wallet data');
// // // // // //     }
// // // // // //   }, [resolvedUserId, resolvedToken]);

// // // // // //   const fetchWithdrawalHistory = useCallback(async () => {
// // // // // //     if (!resolvedUserId) return;
// // // // // //     try {
// // // // // //       const res = await fetch(`${API_URL}/wallet/withdrawal-requests/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // // //       const data = await res.json();
// // // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load withdrawal history');
// // // // // //       setWithdrawalRequests(data.withdrawalRequests || []);
// // // // // //     } catch (err) {
// // // // // //       setError('Failed to fetch withdrawal history');
// // // // // //     }
// // // // // //   }, [resolvedUserId, resolvedToken]);

// // // // // //   // Fetch data with error handling: skip requests if no userId/token
// // // // // //   useEffect(() => {
// // // // // //     const fetchData = async () => {
// // // // // //       if (!resolvedUserId) {
// // // // // //         setError('User not authenticated. Please login.');
// // // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // // //         return;
// // // // // //       }
// // // // // //       if (!resolvedToken) {
// // // // // //         setError('Missing auth token. Please login again.');
// // // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // // //         return;
// // // // // //       }

// // // // // //       try {
// // // // // //         setLoading(prev => ({ ...prev, wallet: true, withdrawals: true }));
// // // // // //         await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // // //       } catch (err) {
// // // // // //         setError('Failed to load wallet data. Please try again.');
// // // // // //       } finally {
// // // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // // //       }
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, [resolvedUserId, resolvedToken, fetchWalletData, fetchWithdrawalHistory]); // <-- use resolved values

// // // // // //   const validateForm = () => {
// // // // // //     const errors = {};
// // // // // //     let isValid = true;

// // // // // //     if (!withdrawalForm.bankName.trim()) {
// // // // // //       errors.bankName = 'Bank name is required';
// // // // // //       isValid = false;
// // // // // //     }

// // // // // //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// // // // // //       errors.accountNumber = 'Valid account number is required (9-18 digits)';
// // // // // //       isValid = false;
// // // // // //     }

// // // // // //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// // // // // //       errors.ifscCode = 'Valid IFSC code is required';
// // // // // //       isValid = false;
// // // // // //     }

// // // // // //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// // // // // //       errors.mobileNumber = 'Valid Indian mobile number is required';
// // // // // //       isValid = false;
// // // // // //     }

// // // // // //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// // // // // //       errors.amount = 'Minimum withdrawal amount is ₹1000';
// // // // // //       isValid = false;
// // // // // //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// // // // // //       errors.amount = 'Insufficient balance';
// // // // // //       isValid = false;
// // // // // //     }

// // // // // //     setFormErrors(errors);
// // // // // //     return isValid;
// // // // // //   };

// // // // // //   const handleWithdrawalSubmit = async () => {
// // // // // //     if (!validateForm()) return;

// // // // // //     setLoading(prev => ({ ...prev, submit: true }));
// // // // // //     setError('');
// // // // // //     setSuccess('');

// // // // // //     try {
// // // // // //       const body = {
// // // // // //         userId: userId,
// // // // // //         amount: parseFloat(withdrawalForm.amount),
// // // // // //         bankName: withdrawalForm.bankName,
// // // // // //         accountNumber: withdrawalForm.accountNumber,
// // // // // //         ifscCode: withdrawalForm.ifscCode,
// // // // // //         mobileNumber: withdrawalForm.mobileNumber,
// // // // // //       };

// // // // // //       const res = await fetch(`${API_URL}/wallet/withdraw`, {
// // // // // //         method: 'POST',
// // // // // //         headers: userAuthHeaders(),
// // // // // //         body: JSON.stringify(body),
// // // // // //       });
// // // // // //       const data = await res.json();
// // // // // //       if (!data.success) throw new Error(data.message || 'Withdrawal failed');

// // // // // //       // refresh UI
// // // // // //       await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // // //       setSuccess('Withdrawal request submitted successfully!');
// // // // // //       setShowWithdrawForm(false);
// // // // // //       setLoading(prev => ({ ...prev, submit: false }));
// // // // // //     } catch (err) {
// // // // // //       setError('Failed to submit withdrawal request. Please try again.');
// // // // // //     } finally {
// // // // // //       setLoading(prev => ({ ...prev, submit: false }));
// // // // // //     }
// // // // // //   };

// // // // // //   const handleInputChange = (e) => {
// // // // // //     const { name, value } = e.target;
// // // // // //     setWithdrawalForm(prev => ({
// // // // // //       ...prev,
// // // // // //       [name]: value
// // // // // //     }));
    
// // // // // //     // Clear error when user starts typing
// // // // // //     if (formErrors[name]) {
// // // // // //       setFormErrors(prev => ({
// // // // // //         ...prev,
// // // // // //         [name]: ''
// // // // // //       }));
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusIcon = (status) => {
// // // // // //     switch (status) {
// // // // // //       case 'Pending':
// // // // // //         return <Clock className="h-5 w-5 text-yellow-500" />;
// // // // // //       case 'Completed':
// // // // // //         return <CheckCircle className="h-5 w-5 text-green-500" />;
// // // // // //       case 'Rejected':
// // // // // //         return <X className="h-5 w-5 text-red-500" />;
// // // // // //       default:
// // // // // //         return <Clock className="h-5 w-5 text-gray-500" />;
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusColor = (status) => {
// // // // // //     switch (status) {
// // // // // //       case 'Pending':
// // // // // //         return 'text-yellow-600 bg-yellow-50';
// // // // // //       case 'Completed':
// // // // // //         return 'text-green-600 bg-green-50';
// // // // // //       case 'Rejected':
// // // // // //         return 'text-red-600 bg-red-50';
// // // // // //       default:
// // // // // //         return 'text-gray-600 bg-gray-50';
// // // // // //     }
// // // // // //   };

// // // // // //   const formatDate = (dateString) => {
// // // // // //     const options = { day: 'numeric', month: 'short', year: 'numeric' };
// // // // // //     return new Date(dateString).toLocaleDateString('en-IN', options);
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="p-4 md:p-6 max-w-6xl mx-auto">
// // // // // //       <div className="mb-6">
// // // // // //         <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Wallet Dashboard</h2>
// // // // // //         <p className="text-gray-600">Manage your earnings and withdrawals</p>
// // // // // //       </div>

// // // // // //       {/* Notifications */}
// // // // // //       {error && (
// // // // // //         <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
// // // // // //           <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
// // // // // //           <p className="text-red-600">{error}</p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {success && (
// // // // // //         <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
// // // // // //           <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
// // // // // //           <p className="text-green-600">{success}</p>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Balance Card */}
// // // // // //       <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white">
// // // // // //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// // // // // //           <div>
// // // // // //             <p className="text-blue-100 text-sm">Available Balance</p>
// // // // // //             <p className="text-3xl md:text-4xl font-bold">₹{wallet.balance.toLocaleString('en-IN')}</p>
// // // // // //             <p className="text-blue-100 text-sm mt-2">
// // // // // //               {wallet.balance >= 1000 ? (
// // // // // //                 'Eligible for withdrawal'
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   <span className="font-medium">₹{(1000 - wallet.balance).toLocaleString('en-IN')}</span> more needed for withdrawal
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //           <div className="flex gap-3 w-full md:w-auto">
// // // // // //             <button
// // // // // //               onClick={() => setShowWithdrawForm(true)}
// // // // // //               disabled={wallet.balance < 1000}
// // // // // //               className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full md:w-auto justify-center ${
// // // // // //                 wallet.balance >= 1000
// // // // // //                   ? 'bg-white text-blue-600 hover:bg-blue-50'
// // // // // //                   : 'bg-gray-400 text-gray-200 cursor-not-allowed'
// // // // // //               }`}
// // // // // //             >
// // // // // //               <ArrowUp className="h-5 w-5" />
// // // // // //               <span>Withdraw</span>
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Tabs */}
// // // // // //       <div className="flex border-b border-gray-200 mb-6">
// // // // // //         <button
// // // // // //           className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
// // // // // //             activeTab === 'transactions'
// // // // // //               ? 'border-blue-500 text-blue-600'
// // // // // //               : 'border-transparent text-gray-500 hover:text-gray-700'
// // // // // //           }`}
// // // // // //           onClick={() => setActiveTab('transactions')}
// // // // // //         >
// // // // // //           Transactions
// // // // // //         </button>
// // // // // //         <button
// // // // // //           className={`py-3 px-6 font-medium text-sm border-b-2 transition-colors ${
// // // // // //             activeTab === 'withdrawals'
// // // // // //               ? 'border-blue-500 text-blue-600'
// // // // // //               : 'border-transparent text-gray-500 hover:text-gray-700'
// // // // // //           }`}
// // // // // //           onClick={() => setActiveTab('withdrawals')}
// // // // // //         >
// // // // // //           Withdrawals
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* Content based on active tab */}
// // // // // //       {activeTab === 'transactions' ? (
// // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // //           <div className="p-4 border-b border-gray-200 flex justify-between items-center">
// // // // // //             <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
// // // // // //             <div className="text-sm text-gray-500">
// // // // // //               {wallet.transactions.length} records
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <div className="max-h-[500px] overflow-y-auto">
// // // // // //             {loading.wallet ? (
// // // // // //               <div className="p-8 text-center">
// // // // // //                 <Loader className="h-8 w-8 mx-auto animate-spin text-blue-500" />
// // // // // //                 <p className="mt-2 text-gray-500">Loading transactions...</p>
// // // // // //               </div>
// // // // // //             ) : wallet.transactions.length === 0 ? (
// // // // // //               <div className="p-8 text-center text-gray-500">
// // // // // //                 <Banknote className="h-12 w-12 mx-auto mb-4 text-gray-300" />
// // // // // //                 <p>No transactions yet</p>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="divide-y divide-gray-200">
// // // // // //                 {wallet.transactions.map((txn) => (
// // // // // //                   <div key={txn.id} className="p-4 hover:bg-gray-50 transition-colors">
// // // // // //                     <div className="flex justify-between items-center">
// // // // // //                       <div className="flex items-center gap-4">
// // // // // //                         <div className={`p-3 rounded-full ${txn.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
// // // // // //                           {txn.amount > 0 ? (
// // // // // //                             <Plus className="h-5 w-5 text-green-600" />
// // // // // //                           ) : (
// // // // // //                             <Minus className="h-5 w-5 text-red-600" />
// // // // // //                           )}
// // // // // //                         </div>
// // // // // //                         <div>
// // // // // //                           <p className="font-medium text-gray-900">{txn.type}</p>
// // // // // //                           <p className="text-sm text-gray-500">{txn.description}</p>
// // // // // //                           <p className="text-xs text-gray-400">{formatDate(txn.date)}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <div className="text-right">
// // // // // //                         <p className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
// // // // // //                           {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString('en-IN')}
// // // // // //                         </p>
// // // // // //                         <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(txn.status)}`}>
// // // // // //                           {txn.status}
// // // // // //                         </span>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       ) : (
// // // // // //         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // //           <div className="p-4 border-b border-gray-200 flex justify-between items-center">
// // // // // //             <h3 className="text-lg font-semibold text-gray-900">Withdrawal History</h3>
// // // // // //             <div className="text-sm text-gray-500">
// // // // // //               {withdrawalRequests.length} requests
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <div className="max-h-[500px] overflow-y-auto">
// // // // // //             {loading.withdrawals ? (
// // // // // //               <div className="p-8 text-center">
// // // // // //                 <Loader className="h-8 w-8 mx-auto animate-spin text-blue-500" />
// // // // // //                 <p className="mt-2 text-gray-500">Loading withdrawals...</p>
// // // // // //               </div>
// // // // // //             ) : withdrawalRequests.length === 0 ? (
// // // // // //               <div className="p-8 text-center text-gray-500">
// // // // // //                 <ArrowUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
// // // // // //                 <p>No withdrawal requests yet</p>
// // // // // //                 <button
// // // // // //                   onClick={() => setShowWithdrawForm(true)}
// // // // // //                   className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// // // // // //                 >
// // // // // //                   Make your first withdrawal
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             ) : (
// // // // // //               <div className="divide-y divide-gray-200">
// // // // // //                 {withdrawalRequests.map((request) => (
// // // // // //                   <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
// // // // // //                     <div className="flex justify-between items-start">
// // // // // //                       <div className="flex items-start gap-3">
// // // // // //                         {getStatusIcon(request.status)}
// // // // // //                         <div>
// // // // // //                           <p className="font-medium text-gray-900">₹{request.amount.toLocaleString('en-IN')}</p>
// // // // // //                           <p className="text-sm text-gray-600">{request.bankName}</p>
// // // // // //                           <p className="text-xs text-gray-500">Account: {request.accountNumber}</p>
// // // // // //                           <p className="text-xs text-gray-500">IFSC: {request.ifscCode}</p>
// // // // // //                           <p className="text-xs text-gray-400">{formatDate(request.date)}</p>
// // // // // //                         </div>
// // // // // //                       </div>
// // // // // //                       <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
// // // // // //                         {request.status}
// // // // // //                       </span>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Withdrawal Form Modal */}
// // // // // //       {showWithdrawForm && (
// // // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// // // // // //           <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
// // // // // //             <div className="p-6">
// // // // // //               <div className="flex justify-between items-center mb-4">
// // // // // //                 <h3 className="text-lg font-semibold text-gray-900">Withdraw Money</h3>
// // // // // //                 <button
// // // // // //                   onClick={() => setShowWithdrawForm(false)}
// // // // // //                   className="text-gray-400 hover:text-gray-600"
// // // // // //                   disabled={loading.submit}
// // // // // //                 >
// // // // // //                   <X className="h-6 w-6" />
// // // // // //                 </button>
// // // // // //               </div>

// // // // // //               <div className="space-y-4">
// // // // // //                 <div>
// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                     Bank Name <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     name="bankName"
// // // // // //                     value={withdrawalForm.bankName}
// // // // // //                     onChange={handleInputChange}
// // // // // //                     required
// // // // // //                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // // // // //                       formErrors.bankName ? 'border-red-500' : 'border-gray-300'
// // // // // //                     }`}
// // // // // //                     placeholder="Enter bank name"
// // // // // //                     disabled={loading.submit}
// // // // // //                   />
// // // // // //                   {formErrors.bankName && (
// // // // // //                     <p className="mt-1 text-sm text-red-600">{formErrors.bankName}</p>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                     Account Number <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     name="accountNumber"
// // // // // //                     value={withdrawalForm.accountNumber}
// // // // // //                     onChange={handleInputChange}
// // // // // //                     required
// // // // // //                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // // // // //                       formErrors.accountNumber ? 'border-red-500' : 'border-gray-300'
// // // // // //                     }`}
// // // // // //                     placeholder="Enter account number"
// // // // // //                     disabled={loading.submit}
// // // // // //                   />
// // // // // //                   {formErrors.accountNumber && (
// // // // // //                     <p className="mt-1 text-sm text-red-600">{formErrors.accountNumber}</p>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                     IFSC Code <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     type="text"
// // // // // //                     name="ifscCode"
// // // // // //                     value={withdrawalForm.ifscCode}
// // // // // //                     onChange={handleInputChange}
// // // // // //                     required
// // // // // //                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // // // // //                       formErrors.ifscCode ? 'border-red-500' : 'border-gray-300'
// // // // // //                     }`}
// // // // // //                     placeholder="Enter IFSC code"
// // // // // //                     disabled={loading.submit}
// // // // // //                   />
// // // // // //                   {formErrors.ifscCode && (
// // // // // //                     <p className="mt-1 text-sm text-red-600">{formErrors.ifscCode}</p>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                     Mobile Number <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     type="tel"
// // // // // //                     name="mobileNumber"
// // // // // //                     value={withdrawalForm.mobileNumber}
// // // // // //                     onChange={handleInputChange}
// // // // // //                     required
// // // // // //                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // // // // //                       formErrors.mobileNumber ? 'border-red-500' : 'border-gray-300'
// // // // // //                     }`}
// // // // // //                     placeholder="Enter mobile number"
// // // // // //                     disabled={loading.submit}
// // // // // //                   />
// // // // // //                   {formErrors.mobileNumber && (
// // // // // //                     <p className="mt-1 text-sm text-red-600">{formErrors.mobileNumber}</p>
// // // // // //                   )}
// // // // // //                 </div>

// // // // // //                 <div>
// // // // // //                   <label className="block text-sm font-medium text-gray-700 mb-1">
// // // // // //                     Amount (₹) <span className="text-red-500">*</span>
// // // // // //                   </label>
// // // // // //                   <input
// // // // // //                     type="number"
// // // // // //                     name="amount"
// // // // // //                     value={withdrawalForm.amount}
// // // // // //                     onChange={handleInputChange}
// // // // // //                     required
// // // // // //                     min="1000"
// // // // // //                     max={wallet.balance}
// // // // // //                     className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
// // // // // //                       formErrors.amount ? 'border-red-500' : 'border-gray-300'
// // // // // //                     }`}
// // // // // //                     placeholder="Minimum ₹1000"
// // // // // //                     disabled={loading.submit}
// // // // // //                   />
// // // // // //                   {formErrors.amount && (
// // // // // //                     <p className="mt-1 text-sm text-red-600">{formErrors.amount}</p>
// // // // // //                   )}
// // // // // //                   <p className="text-xs text-gray-500 mt-1">
// // // // // //                     Available: ₹{wallet.balance.toLocaleString('en-IN')} | Minimum: ₹1,000
// // // // // //                   </p>
// // // // // //                 </div>

// // // // // //                 <div className="flex gap-3 pt-4">
// // // // // //                   <button
// // // // // //                     type="button"
// // // // // //                     onClick={() => setShowWithdrawForm(false)}
// // // // // //                     disabled={loading.submit}
// // // // // //                     className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
// // // // // //                   >
// // // // // //                     Cancel
// // // // // //                   </button>
// // // // // //                   <button
// // // // // //                     type="button"
// // // // // //                     onClick={handleWithdrawalSubmit}
// // // // // //                     disabled={loading.submit}
// // // // // //                     className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// // // // // //                   >
// // // // // //                     {loading.submit ? (
// // // // // //                       <>
// // // // // //                         <Loader className="h-4 w-4 animate-spin" />
// // // // // //                         Processing...
// // // // // //                       </>
// // // // // //                     ) : (
// // // // // //                       'Submit Request'
// // // // // //                     )}
// // // // // //                   </button>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default EnhancedWallet;


// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { ArrowUp, Clock, CheckCircle, X, Loader, Banknote, Plus, Minus } from 'lucide-react';

// // // // // const EnhancedWallet = ({ userId: propUserId, userToken: propUserToken }) => {
// // // // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // // // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // // // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // // // //   const [loading, setLoading] = useState({ wallet: false, withdrawals: false, submit: false });
// // // // //   const [error, setError] = useState('');
// // // // //   const [success, setSuccess] = useState('');
// // // // //   const [activeTab, setActiveTab] = useState('transactions');

// // // // //   const [withdrawalForm, setWithdrawalForm] = useState({
// // // // //     bankName: '',
// // // // //     accountNumber: '',
// // // // //     ifscCode: '',
// // // // //     mobileNumber: '',
// // // // //     amount: ''
// // // // //   });

// // // // //   const [formErrors, setFormErrors] = useState({
// // // // //     bankName: '',
// // // // //     accountNumber: '',
// // // // //     ifscCode: '',
// // // // //     mobileNumber: '',
// // // // //     amount: ''
// // // // //   });

// // // // //   const parseJwt = (token) => {
// // // // //     if (!token) return null;
// // // // //     try {
// // // // //       const payload = JSON.parse(atob(token.split('.')[1]));
// // // // //       return payload.userId || payload.sub || null;
// // // // //     } catch {
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   const resolvedToken = propUserToken
// // // // //     || localStorage.getItem('token')
// // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.token
// // // // //     || '';

// // // // //   const resolvedUserId = propUserId
// // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.userId
// // // // //     || parseJwt(resolvedToken)
// // // // //     || null;

// // // // //   const userAuthHeaders = () => {
// // // // //     const token = resolvedToken;
// // // // //     return {
// // // // //       'Content-Type': 'application/json',
// // // // //       Authorization: token ? `Bearer ${token}` : '',
// // // // //     };
// // // // //   };

// // // // //   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// // // // //   const fetchWalletData = useCallback(async () => {
// // // // //     if (!resolvedUserId) return;
// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/wallet/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // //       const data = await res.json();
// // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load wallet');
// // // // //       setWallet({ balance: data.wallet?.balance || 0, transactions: data.wallet?.transactions || [] });
// // // // //     } catch {
// // // // //       setError('Failed to fetch wallet data');
// // // // //     }
// // // // //   }, [resolvedUserId, resolvedToken]);

// // // // //   const fetchWithdrawalHistory = useCallback(async () => {
// // // // //     if (!resolvedUserId) return;
// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/wallet/withdrawal-requests/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // //       const data = await res.json();
// // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load withdrawal history');
// // // // //       setWithdrawalRequests(data.withdrawalRequests || []);
// // // // //     } catch {
// // // // //       setError('Failed to fetch withdrawal history');
// // // // //     }
// // // // //   }, [resolvedUserId, resolvedToken]);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       if (!resolvedUserId) {
// // // // //         setError('User not authenticated. Please login.');
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //         return;
// // // // //       }
// // // // //       if (!resolvedToken) {
// // // // //         setError('Missing auth token. Please login again.');
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         setLoading(prev => ({ ...prev, wallet: true, withdrawals: true }));
// // // // //         await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // //       } catch {
// // // // //         setError('Failed to load wallet data. Please try again.');
// // // // //       } finally {
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [resolvedUserId, resolvedToken, fetchWalletData, fetchWithdrawalHistory]);

// // // // //   const validateForm = () => {
// // // // //     const errors = {};
// // // // //     let isValid = true;

// // // // //     if (!withdrawalForm.bankName.trim()) {
// // // // //       errors.bankName = 'Bank name is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// // // // //       errors.accountNumber = 'Valid account number is required (9-18 digits)';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// // // // //       errors.ifscCode = 'Valid IFSC code is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// // // // //       errors.mobileNumber = 'Valid Indian mobile number is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// // // // //       errors.amount = 'Minimum withdrawal amount is ₹1000';
// // // // //       isValid = false;
// // // // //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// // // // //       errors.amount = 'Insufficient balance';
// // // // //       isValid = false;
// // // // //     }

// // // // //     setFormErrors(errors);
// // // // //     return isValid;
// // // // //   };

// // // // //   const handleWithdrawalSubmit = async () => {
// // // // //     if (!validateForm()) return;

// // // // //     setLoading(prev => ({ ...prev, submit: true }));
// // // // //     setError('');
// // // // //     setSuccess('');

// // // // //     try {
// // // // //       const body = {
// // // // //         userId: resolvedUserId, // ✅ fixed here
// // // // //         amount: parseFloat(withdrawalForm.amount),
// // // // //         bankName: withdrawalForm.bankName,
// // // // //         accountNumber: withdrawalForm.accountNumber,
// // // // //         ifscCode: withdrawalForm.ifscCode,
// // // // //         mobileNumber: withdrawalForm.mobileNumber,
// // // // //       };

// // // // //       const res = await fetch(`${API_URL}/wallet/withdraw`, {
// // // // //         method: 'POST',
// // // // //         headers: userAuthHeaders(),
// // // // //         body: JSON.stringify(body),
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (!data.success) throw new Error(data.message || 'Withdrawal failed');

// // // // //       await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // //       setSuccess('Withdrawal request submitted successfully!');
// // // // //       setShowWithdrawForm(false);
// // // // //     } catch {
// // // // //       setError('Failed to submit withdrawal request. Please try again.');
// // // // //     } finally {
// // // // //       setLoading(prev => ({ ...prev, submit: false }));
// // // // //     }
// // // // //   };

// // // // //   const handleInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setWithdrawalForm(prev => ({
// // // // //       ...prev,
// // // // //       [name]: value
// // // // //     }));

// // // // //     if (formErrors[name]) {
// // // // //       setFormErrors(prev => ({
// // // // //         ...prev,
// // // // //         [name]: ''
// // // // //       }));
// // // // //     }
// // // // //   };

// // // // //   const getStatusIcon = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Pending': return <Clock className="h-5 w-5 text-yellow-500" />;
// // // // //       case 'Completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
// // // // //       case 'Rejected': return <X className="h-5 w-5 text-red-500" />;
// // // // //       default: return <Clock className="h-5 w-5 text-gray-500" />;
// // // // //     }
// // // // //   };

// // // // //   const getStatusColor = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Pending': return 'text-yellow-600 bg-yellow-50';
// // // // //       case 'Completed': return 'text-green-600 bg-green-50';
// // // // //       case 'Rejected': return 'text-red-600 bg-red-50';
// // // // //       default: return 'text-gray-600 bg-gray-50';
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     const options = { day: 'numeric', month: 'short', year: 'numeric' };
// // // // //     return new Date(dateString).toLocaleDateString('en-IN', options);
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-4 md:p-6 max-w-6xl mx-auto">
// // // // //       {/* UI code remains same — I kept all your JSX untouched */}
// // // // //       {/* ... */}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default EnhancedWallet;


// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { ArrowUp, Clock, CheckCircle, X, Loader, Banknote, Plus, Minus } from 'lucide-react';

// // // // // const EnhancedWallet = ({ userId: propUserId, userToken: propUserToken }) => {
// // // // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // // // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // // // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // // // //   const [loading, setLoading] = useState({ wallet: false, withdrawals: false, submit: false });
// // // // //   const [error, setError] = useState('');
// // // // //   const [success, setSuccess] = useState('');
// // // // //   const [activeTab, setActiveTab] = useState('transactions');

// // // // //   const [withdrawalForm, setWithdrawalForm] = useState({
// // // // //     bankName: '',
// // // // //     accountNumber: '',
// // // // //     ifscCode: '',
// // // // //     mobileNumber: '',
// // // // //     amount: ''
// // // // //   });

// // // // //   const [formErrors, setFormErrors] = useState({
// // // // //     bankName: '',
// // // // //     accountNumber: '',
// // // // //     ifscCode: '',
// // // // //     mobileNumber: '',
// // // // //     amount: ''
// // // // //   });

// // // // //   const parseJwt = (token) => {
// // // // //     if (!token) return null;
// // // // //     try {
// // // // //       const payload = JSON.parse(atob(token.split('.')[1]));
// // // // //       return payload.userId || payload.sub || null;
// // // // //     } catch {
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   const resolvedToken = propUserToken
// // // // //     || localStorage.getItem('token')
// // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.token
// // // // //     || '';

// // // // //   const resolvedUserId = propUserId
// // // // //     || JSON.parse(localStorage.getItem('authData') || '{}')?.userId
// // // // //     || parseJwt(resolvedToken)
// // // // //     || null;

// // // // //   const userAuthHeaders = () => {
// // // // //     const token = resolvedToken;
// // // // //     return {
// // // // //       'Content-Type': 'application/json',
// // // // //       Authorization: token ? `Bearer ${token}` : '',
// // // // //     };
// // // // //   };

// // // // //   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// // // // //   const fetchWalletData = useCallback(async () => {
// // // // //     if (!resolvedUserId) return;
// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/wallet/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // //       const data = await res.json();
// // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load wallet');
// // // // //       setWallet({ balance: data.wallet?.balance || 0, transactions: data.wallet?.transactions || [] });
// // // // //     } catch {
// // // // //       setError('Failed to fetch wallet data');
// // // // //     }
// // // // //   }, [resolvedUserId, resolvedToken]);

// // // // //   const fetchWithdrawalHistory = useCallback(async () => {
// // // // //     if (!resolvedUserId) return;
// // // // //     try {
// // // // //       const res = await fetch(`${API_URL}/wallet/withdrawal-requests/user/${resolvedUserId}`, { headers: userAuthHeaders() });
// // // // //       const data = await res.json();
// // // // //       if (!res.ok) throw new Error(data?.message || 'Failed to load withdrawal history');
// // // // //       setWithdrawalRequests(data.withdrawalRequests || []);
// // // // //     } catch {
// // // // //       setError('Failed to fetch withdrawal history');
// // // // //     }
// // // // //   }, [resolvedUserId, resolvedToken]);

// // // // //   useEffect(() => {
// // // // //     const fetchData = async () => {
// // // // //       if (!resolvedUserId) {
// // // // //         setError('User not authenticated. Please login.');
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //         return;
// // // // //       }
// // // // //       if (!resolvedToken) {
// // // // //         setError('Missing auth token. Please login again.');
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         setLoading(prev => ({ ...prev, wallet: true, withdrawals: true }));
// // // // //         await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // //       } catch {
// // // // //         setError('Failed to load wallet data. Please try again.');
// // // // //       } finally {
// // // // //         setLoading(prev => ({ ...prev, wallet: false, withdrawals: false }));
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [resolvedUserId, resolvedToken, fetchWalletData, fetchWithdrawalHistory]);

// // // // //   const validateForm = () => {
// // // // //     const errors = {};
// // // // //     let isValid = true;

// // // // //     if (!withdrawalForm.bankName.trim()) {
// // // // //       errors.bankName = 'Bank name is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// // // // //       errors.accountNumber = 'Valid account number is required (9-18 digits)';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// // // // //       errors.ifscCode = 'Valid IFSC code is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// // // // //       errors.mobileNumber = 'Valid Indian mobile number is required';
// // // // //       isValid = false;
// // // // //     }

// // // // //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// // // // //       errors.amount = 'Minimum withdrawal amount is ₹1000';
// // // // //       isValid = false;
// // // // //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// // // // //       errors.amount = 'Insufficient balance';
// // // // //       isValid = false;
// // // // //     }

// // // // //     setFormErrors(errors);
// // // // //     return isValid;
// // // // //   };

// // // // //   const handleWithdrawalSubmit = async () => {
// // // // //     if (!validateForm()) return;

// // // // //     setLoading(prev => ({ ...prev, submit: true }));
// // // // //     setError('');
// // // // //     setSuccess('');

// // // // //     try {
// // // // //       const body = {
// // // // //         userId: resolvedUserId, // ✅ fixed here
// // // // //         amount: parseFloat(withdrawalForm.amount),
// // // // //         bankName: withdrawalForm.bankName,
// // // // //         accountNumber: withdrawalForm.accountNumber,
// // // // //         ifscCode: withdrawalForm.ifscCode,
// // // // //         mobileNumber: withdrawalForm.mobileNumber,
// // // // //       };

// // // // //       const res = await fetch(`${API_URL}/wallet/withdraw`, {
// // // // //         method: 'POST',
// // // // //         headers: userAuthHeaders(),
// // // // //         body: JSON.stringify(body),
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (!data.success) throw new Error(data.message || 'Withdrawal failed');

// // // // //       await Promise.all([fetchWalletData(), fetchWithdrawalHistory()]);
// // // // //       setSuccess('Withdrawal request submitted successfully!');
// // // // //       setShowWithdrawForm(false);
// // // // //     } catch {
// // // // //       setError('Failed to submit withdrawal request. Please try again.');
// // // // //     } finally {
// // // // //       setLoading(prev => ({ ...prev, submit: false }));
// // // // //     }
// // // // //   };

// // // // //   const handleInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setWithdrawalForm(prev => ({
// // // // //       ...prev,
// // // // //       [name]: value
// // // // //     }));

// // // // //     if (formErrors[name]) {
// // // // //       setFormErrors(prev => ({
// // // // //         ...prev,
// // // // //         [name]: ''
// // // // //       }));
// // // // //     }
// // // // //   };

// // // // //   const getStatusIcon = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Pending': return <Clock className="h-5 w-5 text-yellow-500" />;
// // // // //       case 'Completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
// // // // //       case 'Rejected': return <X className="h-5 w-5 text-red-500" />;
// // // // //       default: return <Clock className="h-5 w-5 text-gray-500" />;
// // // // //     }
// // // // //   };

// // // // //   const getStatusColor = (status) => {
// // // // //     switch (status) {
// // // // //       case 'Pending': return 'text-yellow-600 bg-yellow-50';
// // // // //       case 'Completed': return 'text-green-600 bg-green-50';
// // // // //       case 'Rejected': return 'text-red-600 bg-red-50';
// // // // //       default: return 'text-gray-600 bg-gray-50';
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     const options = { day: 'numeric', month: 'short', year: 'numeric' };
// // // // //     return new Date(dateString).toLocaleDateString('en-IN', options);
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-4 md:p-6 max-w-6xl mx-auto">
// // // // //       {/* Balance Card */}
// // // // //       <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center justify-between">
// // // // //         <div>
// // // // //           <h2 className="text-lg font-semibold text-gray-700">Wallet Balance</h2>
// // // // //           <p className="text-3xl font-bold text-gray-900">₹{wallet.balance}</p>
// // // // //         </div>
// // // // //         <button
// // // // //           onClick={() => setShowWithdrawForm(true)}
// // // // //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
// // // // //         >
// // // // //           <ArrowUp className="h-5 w-5 mr-2" /> Withdraw
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Tabs */}
// // // // //       <div className="flex space-x-4 border-b mb-4">
// // // // //         <button
// // // // //           onClick={() => setActiveTab('transactions')}
// // // // //           className={`pb-2 ${activeTab === 'transactions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
// // // // //         >
// // // // //           Transactions
// // // // //         </button>
// // // // //         <button
// // // // //           onClick={() => setActiveTab('withdrawals')}
// // // // //           className={`pb-2 ${activeTab === 'withdrawals' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
// // // // //         >
// // // // //           Withdrawals
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Error / Success Messages */}
// // // // //       {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
// // // // //       {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

// // // // //       {/* Transactions Tab */}
// // // // //       {activeTab === 'transactions' && (
// // // // //         <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // //           {wallet.transactions.length > 0 ? (
// // // // //             <ul>
// // // // //               {wallet.transactions.map((txn, index) => (
// // // // //                 <li key={index} className="flex justify-between p-4 border-b">
// // // // //                   <div className="flex items-center">
// // // // //                     {txn.type === 'credit' ? (
// // // // //                       <Plus className="h-5 w-5 text-green-500 mr-2" />
// // // // //                     ) : (
// // // // //                       <Minus className="h-5 w-5 text-red-500 mr-2" />
// // // // //                     )}
// // // // //                     <span>{txn.description || txn.type}</span>
// // // // //                   </div>
// // // // //                   <div className="text-right">
// // // // //                     <p className={txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
// // // // //                       ₹{txn.amount}
// // // // //                     </p>
// // // // //                     <small className="text-gray-500">{formatDate(txn.date)}</small>
// // // // //                   </div>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           ) : (
// // // // //             <p className="p-4 text-gray-500">No transactions found.</p>
// // // // //           )}
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Withdrawals Tab */}
// // // // //       {activeTab === 'withdrawals' && (
// // // // //         <div className="bg-white rounded-lg shadow overflow-hidden">
// // // // //           {withdrawalRequests.length > 0 ? (
// // // // //             <ul>
// // // // //               {withdrawalRequests.map((req, index) => (
// // // // //                 <li key={index} className="flex justify-between p-4 border-b">
// // // // //                   <div className="flex items-center">
// // // // //                     {getStatusIcon(req.status)}
// // // // //                     <span className="ml-2">{req.bankName} - ₹{req.amount}</span>
// // // // //                   </div>
// // // // //                   <div className={`px-2 py-1 rounded text-sm ${getStatusColor(req.status)}`}>
// // // // //                     {req.status}
// // // // //                   </div>
// // // // //                 </li>
// // // // //               ))}
// // // // //             </ul>
// // // // //           ) : (
// // // // //             <p className="p-4 text-gray-500">No withdrawal requests found.</p>
// // // // //           )}
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Withdraw Form Modal */}
// // // // //       {showWithdrawForm && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
// // // // //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// // // // //             <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
// // // // //             {Object.keys(withdrawalForm).map((field) => (
// // // // //               <div key={field} className="mb-3">
// // // // //                 <input
// // // // //                   type={field === 'amount' ? 'number' : 'text'}
// // // // //                   name={field}
// // // // //                   value={withdrawalForm[field]}
// // // // //                   onChange={handleInputChange}
// // // // //                   placeholder={field.replace(/([A-Z])/g, ' $1')}
// // // // //                   className="w-full border rounded p-2"
// // // // //                 />
// // // // //                 {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
// // // // //               </div>
// // // // //             ))}
// // // // //             <div className="flex justify-end space-x-2">
// // // // //               <button onClick={() => setShowWithdrawForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
// // // // //               <button
// // // // //                 onClick={handleWithdrawalSubmit}
// // // // //                 disabled={loading.submit}
// // // // //                 className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // //               >
// // // // //                 {loading.submit ? 'Submitting...' : 'Submit'}
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default EnhancedWallet;




// // // // // import React, { useState, useEffect } from "react";


// // // // // import { walletAPI } from "../../services/api";

// // // // // const { getUserWallet, getUserWithdrawalRequests, requestWithdrawal } = walletAPI;

// // // // // import {
// // // // //   ArrowUp,
// // // // //   Clock,
// // // // //   CheckCircle,
// // // // //   X,
// // // // //   Plus,
// // // // //   Minus,
// // // // // } from "lucide-react";


// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   ArrowUp,
// // // //   Clock,
// // // //   CheckCircle,
// // // //   X,
// // // //   Plus,
// // // //   Minus,
// // // // } from "lucide-react";
// // // // // import { walletAPI } from "../../services/api";
// // // // import userWalletAPI from "../../services/userWalletApi";

// // // // const { getUserWallet, getUserWithdrawalRequests, requestWithdrawal } = walletAPI;


// // // // const EnhancedWallet = () => {
// // // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // // //   const [loading, setLoading] = useState({ wallet: false, withdrawals: false, submit: false });
// // // //   const [error, setError] = useState("");
// // // //   const [success, setSuccess] = useState("");
// // // //   const [activeTab, setActiveTab] = useState("transactions");

// // // //   const [withdrawalForm, setWithdrawalForm] = useState({
// // // //     bankName: "",
// // // //     accountNumber: "",
// // // //     ifscCode: "",
// // // //     mobileNumber: "",
// // // //     amount: "",
// // // //   });

// // // //   const [formErrors, setFormErrors] = useState({});

// // // //   const userId = localStorage.getItem("userId");

// // // //   const loadWallet = async () => {
// // // //     if (!userId) return;
// // // //     try {
// // // //       setLoading((prev) => ({ ...prev, wallet: true }));
// // // //       const res = await getUserWallet(userId);
// // // //       setWallet({
// // // //         balance: res.data.balance || 0,
// // // //         transactions: res.data.transactions || [],
// // // //       });
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to fetch wallet");
// // // //     } finally {
// // // //       setLoading((prev) => ({ ...prev, wallet: false }));
// // // //     }
// // // //   };

// // // //   const loadRequests = async () => {
// // // //     if (!userId) return;
// // // //     try {
// // // //       setLoading((prev) => ({ ...prev, withdrawals: true }));
// // // //       const res = await getUserWithdrawalRequests(userId);
// // // //       setWithdrawalRequests(res.data || []);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to fetch withdrawals");
// // // //     } finally {
// // // //       setLoading((prev) => ({ ...prev, withdrawals: false }));
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (userId) {
// // // //       loadWallet();
// // // //       loadRequests();
// // // //     }
// // // //   }, [userId]);

// // // //   const validateForm = () => {
// // // //     const errors = {};
// // // //     let isValid = true;

// // // //     if (!withdrawalForm.bankName.trim()) {
// // // //       errors.bankName = "Bank name is required";
// // // //       isValid = false;
// // // //     }
// // // //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// // // //       errors.accountNumber = "Valid account number is required (9-18 digits)";
// // // //       isValid = false;
// // // //     }
// // // //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// // // //       errors.ifscCode = "Valid IFSC code is required";
// // // //       isValid = false;
// // // //     }
// // // //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// // // //       errors.mobileNumber = "Valid Indian mobile number is required";
// // // //       isValid = false;
// // // //     }
// // // //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// // // //       errors.amount = "Minimum withdrawal amount is ₹1000";
// // // //       isValid = false;
// // // //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// // // //       errors.amount = "Insufficient balance";
// // // //       isValid = false;
// // // //     }

// // // //     setFormErrors(errors);
// // // //     return isValid;
// // // //   };

// // // //   const handleWithdrawalSubmit = async () => {
// // // //     if (!validateForm()) return;

// // // //     setLoading((prev) => ({ ...prev, submit: true }));
// // // //     setError("");
// // // //     setSuccess("");

// // // //     try {
// // // //       await requestWithdrawal(userId, withdrawalForm.amount, withdrawalForm);
// // // //       setSuccess("Withdrawal request submitted successfully!");
// // // //       setShowWithdrawForm(false);
// // // //       await Promise.all([loadWallet(), loadRequests()]);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Withdrawal failed");
// // // //     } finally {
// // // //       setLoading((prev) => ({ ...prev, submit: false }));
// // // //     }
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
// // // //     if (formErrors[name]) {
// // // //       setFormErrors((prev) => ({ ...prev, [name]: "" }));
// // // //     }
// // // //   };

// // // //   const getStatusIcon = (status) => {
// // // //     switch (status) {
// // // //       case "Pending": return <Clock className="h-5 w-5 text-yellow-500" />;
// // // //       case "Completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
// // // //       case "Rejected": return <X className="h-5 w-5 text-red-500" />;
// // // //       default: return <Clock className="h-5 w-5 text-gray-500" />;
// // // //     }
// // // //   };

// // // //   const getStatusColor = (status) => {
// // // //     switch (status) {
// // // //       case "Pending": return "text-yellow-600 bg-yellow-50";
// // // //       case "Completed": return "text-green-600 bg-green-50";
// // // //       case "Rejected": return "text-red-600 bg-red-50";
// // // //       default: return "text-gray-600 bg-gray-50";
// // // //     }
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     const options = { day: "numeric", month: "short", year: "numeric" };
// // // //     return new Date(dateString).toLocaleDateString("en-IN", options);
// // // //   };

// // // //   return (
// // // //     <div className="p-4 md:p-6 max-w-6xl mx-auto">
// // // //       {/* Balance Card */}
// // // //       <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center justify-between">
// // // //         <div>
// // // //           <h2 className="text-lg font-semibold text-gray-700">Wallet Balance</h2>
// // // //           <p className="text-3xl font-bold text-gray-900">₹{wallet.balance}</p>
// // // //         </div>
// // // //         <button
// // // //           onClick={() => setShowWithdrawForm(true)}
// // // //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
// // // //         >
// // // //           <ArrowUp className="h-5 w-5 mr-2" /> Withdraw
// // // //         </button>
// // // //       </div>

// // // //       {/* Tabs */}
// // // //       <div className="flex space-x-4 border-b mb-4">
// // // //         <button
// // // //           onClick={() => setActiveTab("transactions")}
// // // //           className={`pb-2 ${activeTab === "transactions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
// // // //         >
// // // //           Transactions
// // // //         </button>
// // // //         <button
// // // //           onClick={() => setActiveTab("withdrawals")}
// // // //           className={`pb-2 ${activeTab === "withdrawals" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
// // // //         >
// // // //           Withdrawals
// // // //         </button>
// // // //       </div>

// // // //       {/* Error / Success Messages */}
// // // //       {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
// // // //       {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

// // // //       {/* Transactions Tab */}
// // // //       {activeTab === "transactions" && (
// // // //         <div className="bg-white rounded-lg shadow overflow-hidden">
// // // //           {wallet.transactions.length > 0 ? (
// // // //             <ul>
// // // //               {wallet.transactions.map((txn, index) => (
// // // //                 <li key={index} className="flex justify-between p-4 border-b">
// // // //                   <div className="flex items-center">
// // // //                     {txn.type === "credit" ? (
// // // //                       <Plus className="h-5 w-5 text-green-500 mr-2" />
// // // //                     ) : (
// // // //                       <Minus className="h-5 w-5 text-red-500 mr-2" />
// // // //                     )}
// // // //                     <span>{txn.description || txn.type}</span>
// // // //                   </div>
// // // //                   <div className="text-right">
// // // //                     <p className={txn.type === "credit" ? "text-green-600" : "text-red-600"}>
// // // //                       ₹{txn.amount}
// // // //                     </p>
// // // //                     <small className="text-gray-500">{formatDate(txn.date)}</small>
// // // //                   </div>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           ) : (
// // // //             <p className="p-4 text-gray-500">No transactions found.</p>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {/* Withdrawals Tab */}
// // // //       {activeTab === "withdrawals" && (
// // // //         <div className="bg-white rounded-lg shadow overflow-hidden">
// // // //           {withdrawalRequests.length > 0 ? (
// // // //             <ul>
// // // //               {withdrawalRequests.map((req, index) => (
// // // //                 <li key={index} className="flex justify-between p-4 border-b">
// // // //                   <div className="flex items-center">
// // // //                     {getStatusIcon(req.status)}
// // // //                     <span className="ml-2">{req.bankName} - ₹{req.amount}</span>
// // // //                   </div>
// // // //                   <div className={`px-2 py-1 rounded text-sm ${getStatusColor(req.status)}`}>
// // // //                     {req.status}
// // // //                   </div>
// // // //                 </li>
// // // //               ))}
// // // //             </ul>
// // // //           ) : (
// // // //             <p className="p-4 text-gray-500">No withdrawal requests found.</p>
// // // //           )}
// // // //         </div>
// // // //       )}

// // // //       {/* Withdraw Form Modal */}
// // // //       {showWithdrawForm && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
// // // //           <div className="bg-white rounded-lg p-6 w-full max-w-md">
// // // //             <h3 className="text-lg font-semibold mb-4">Withdraw Funds</h3>
// // // //             {Object.keys(withdrawalForm).map((field) => (
// // // //               <div key={field} className="mb-3">
// // // //                 <input
// // // //                   type={field === "amount" ? "number" : "text"}
// // // //                   name={field}
// // // //                   value={withdrawalForm[field]}
// // // //                   onChange={handleInputChange}
// // // //                   placeholder={field.replace(/([A-Z])/g, " $1")}
// // // //                   className="w-full border rounded p-2"
// // // //                 />
// // // //                 {formErrors[field] && <p className="text-red-500 text-sm">{formErrors[field]}</p>}
// // // //               </div>
// // // //             ))}
// // // //             <div className="flex justify-end space-x-2">
// // // //               <button onClick={() => setShowWithdrawForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
// // // //               <button
// // // //                 onClick={handleWithdrawalSubmit}
// // // //                 disabled={loading.submit}
// // // //                 className="px-4 py-2 bg-blue-600 text-white rounded"
// // // //               >
// // // //                 {loading.submit ? "Submitting..." : "Submit"}
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default EnhancedWallet;   


// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   ArrowUp,
// // //   Clock,
// // //   CheckCircle,
// // //   X,
// // //   Plus,
// // //   Minus,
// // // } from "lucide-react";
// // // import userWalletAPI from "../../services/userWalletApi"; // ✅ updated import

// // // const EnhancedWallet = () => {
// // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // //   const [loading, setLoading] = useState({ wallet: false, withdrawals: false, submit: false });
// // //   const [error, setError] = useState("");
// // //   const [success, setSuccess] = useState("");
// // //   const [activeTab, setActiveTab] = useState("transactions");

// // //   const [withdrawalForm, setWithdrawalForm] = useState({
// // //     bankName: "",
// // //     accountNumber: "",
// // //     ifscCode: "",
// // //     mobileNumber: "",
// // //     amount: "",
// // //   });

// // //   const [formErrors, setFormErrors] = useState({});

// // //   const userId = localStorage.getItem("userId");

// // //   const loadWallet = async () => {
// // //     if (!userId) return;
// // //     try {
// // //       setLoading((prev) => ({ ...prev, wallet: true }));
// // //       const res = await userWalletAPI.getWallet(userId); // ✅ updated
// // //       setWallet({
// // //         balance: res.data.balance || 0,
// // //         transactions: res.data.transactions || [],
// // //       });
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to fetch wallet");
// // //     } finally {
// // //       setLoading((prev) => ({ ...prev, wallet: false }));
// // //     }
// // //   };

// // //   const loadRequests = async () => {
// // //     if (!userId) return;
// // //     try {
// // //       setLoading((prev) => ({ ...prev, withdrawals: true }));
// // //       const res = await userWalletAPI.getWithdrawals(userId); // ✅ updated
// // //       setWithdrawalRequests(res.data || []);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to fetch withdrawals");
// // //     } finally {
// // //       setLoading((prev) => ({ ...prev, withdrawals: false }));
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (userId) {
// // //       loadWallet();
// // //       loadRequests();
// // //     }
// // //   }, [userId]);

// // //   const validateForm = () => {
// // //     const errors = {};
// // //     let isValid = true;

// // //     if (!withdrawalForm.bankName.trim()) {
// // //       errors.bankName = "Bank name is required";
// // //       isValid = false;
// // //     }
// // //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// // //       errors.accountNumber = "Valid account number is required (9-18 digits)";
// // //       isValid = false;
// // //     }
// // //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// // //       errors.ifscCode = "Valid IFSC code is required";
// // //       isValid = false;
// // //     }
// // //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// // //       errors.mobileNumber = "Valid Indian mobile number is required";
// // //       isValid = false;
// // //     }
// // //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// // //       errors.amount = "Minimum withdrawal amount is ₹1000";
// // //       isValid = false;
// // //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// // //       errors.amount = "Insufficient balance";
// // //       isValid = false;
// // //     }

// // //     setFormErrors(errors);
// // //     return isValid;
// // //   };

// // //   const handleWithdrawalSubmit = async () => {
// // //     if (!validateForm()) return;

// // //     setLoading((prev) => ({ ...prev, submit: true }));
// // //     setError("");
// // //     setSuccess("");

// // //     try {
// // //       await userWalletAPI.requestWithdrawal( // ✅ updated
// // //         userId,
// // //         withdrawalForm.amount,
// // //         withdrawalForm
// // //       );
// // //       setSuccess("Withdrawal request submitted successfully!");
// // //       setShowWithdrawForm(false);
// // //       await Promise.all([loadWallet(), loadRequests()]);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Withdrawal failed");
// // //     } finally {
// // //       setLoading((prev) => ({ ...prev, submit: false }));
// // //     }
// // //   };

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
// // //     if (formErrors[name]) {
// // //       setFormErrors((prev) => ({ ...prev, [name]: "" }));
// // //     }
// // //   };

// // //   const getStatusIcon = (status) => {
// // //     switch (status) {
// // //       case "Pending": return <Clock className="h-5 w-5 text-yellow-500" />;
// // //       case "Completed": return <CheckCircle className="h-5 w-5 text-green-500" />;
// // //       case "Rejected": return <X className="h-5 w-5 text-red-500" />;
// // //       default: return <Clock className="h-5 w-5 text-gray-500" />;
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "Pending": return "text-yellow-600 bg-yellow-50";
// // //       case "Completed": return "text-green-600 bg-green-50";
// // //       case "Rejected": return "text-red-600 bg-red-50";
// // //       default: return "text-gray-600 bg-gray-50";
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     const options = { day: "numeric", month: "short", year: "numeric" };
// // //     return new Date(dateString).toLocaleDateString("en-IN", options);
// // //   };

// // //   return (
// // //     <div className="p-4 md:p-6 max-w-6xl mx-auto">
// // //       {/* Wallet balance, tabs, forms, transactions, etc... */}
// // //       {/* ——— Your existing JSX continues here ——— */}
// // //     </div>
// // //   );
// // // };

// // // export default EnhancedWallet;


// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   ArrowUp,
// //   Clock,
// //   CheckCircle,
// //   X,
// //   Plus,
// //   Wallet as WalletIcon,
// //   IndianRupee,
// // } from "lucide-react";
// // import userWalletAPI from "../../services/userWalletApi"; // ✅ API service

// // const EnhancedWallet = () => {
// //   const { userId } = useParams();
// //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// //   const [loading, setLoading] = useState({
// //     wallet: false,
// //     withdrawals: false,
// //     submit: false,
// //   });
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [activeTab, setActiveTab] = useState("transactions");

// //   const [withdrawalForm, setWithdrawalForm] = useState({
// //     bankName: "",
// //     accountNumber: "",
// //     ifscCode: "",
// //     mobileNumber: "",
// //     amount: "",
// //   });

// //   const [formErrors, setFormErrors] = useState({});

// //   // 🔹 Fetch Wallet Balance
// //   const loadWallet = async () => {
// //     if (!userId) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, wallet: true }));
// //       const res = await userWalletAPI.getWallet(userId);
// //       setWallet({
// //         balance: res.data.balance || 0,
// //         transactions: res.data.transactions || [],
// //       });
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to fetch wallet");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, wallet: false }));
// //     }
// //   };

// //   // 🔹 Fetch Withdrawals
// //   const loadRequests = async () => {
// //     if (!userId) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, withdrawals: true }));
// //       const res = await userWalletAPI.getWithdrawals(userId);
// //       setWithdrawalRequests(res.data || []);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to fetch withdrawals");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, withdrawals: false }));
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       loadWallet();
// //       loadRequests();
// //     }
// //   }, [userId]);

// //   // 🔹 Form Validation
// //   const validateForm = () => {
// //     const errors = {};
// //     let isValid = true;

// //     if (!withdrawalForm.bankName.trim()) {
// //       errors.bankName = "Bank name is required";
// //       isValid = false;
// //     }
// //     if (
// //       !withdrawalForm.accountNumber.trim() ||
// //       !/^\d{9,18}$/.test(withdrawalForm.accountNumber)
// //     ) {
// //       errors.accountNumber = "Valid account number is required (9-18 digits)";
// //       isValid = false;
// //     }
// //     if (
// //       !withdrawalForm.ifscCode.trim() ||
// //       !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)
// //     ) {
// //       errors.ifscCode = "Valid IFSC code is required";
// //       isValid = false;
// //     }
// //     if (
// //       !withdrawalForm.mobileNumber.trim() ||
// //       !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)
// //     ) {
// //       errors.mobileNumber = "Valid Indian mobile number is required";
// //       isValid = false;
// //     }
// //     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
// //       errors.amount = "Minimum withdrawal amount is ₹1000";
// //       isValid = false;
// //     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
// //       errors.amount = "Insufficient balance";
// //       isValid = false;
// //     }

// //     setFormErrors(errors);
// //     return isValid;
// //   };

// //   // 🔹 Withdrawal Submit
// //   const handleWithdrawalSubmit = async () => {
// //     if (!validateForm()) return;

// //     setLoading((prev) => ({ ...prev, submit: true }));
// //     setError("");
// //     setSuccess("");

// //     try {
// //       await userWalletAPI.requestWithdrawal(userId, withdrawalForm.amount, withdrawalForm);
// //       setSuccess("Withdrawal request submitted successfully!");
// //       setShowWithdrawForm(false);
// //       setWithdrawalForm({
// //         bankName: "",
// //         accountNumber: "",
// //         ifscCode: "",
// //         mobileNumber: "",
// //         amount: "",
// //       });
// //       await Promise.all([loadWallet(), loadRequests()]);
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Withdrawal failed");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, submit: false }));
// //     }
// //   };

// //   // 🔹 Input Change
// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
// //     if (formErrors[name]) {
// //       setFormErrors((prev) => ({ ...prev, [name]: "" }));
// //     }
// //   };

// //   // 🔹 Status UI
// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return <Clock className="h-4 w-4 text-yellow-500" />;
// //       case "Completed":
// //         return <CheckCircle className="h-4 w-4 text-green-500" />;
// //       case "Rejected":
// //         return <X className="h-4 w-4 text-red-500" />;
// //       default:
// //         return <Clock className="h-4 w-4 text-gray-500" />;
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return "bg-yellow-100 text-yellow-700";
// //       case "Completed":
// //         return "bg-green-100 text-green-700";
// //       case "Rejected":
// //         return "bg-red-100 text-red-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const options = { day: "numeric", month: "short", year: "numeric" };
// //     return new Date(dateString).toLocaleDateString("en-IN", options);
// //   };

// //   return (
// //     <div className="p-4 md:p-6 max-w-5xl mx-auto">
// //       {/* Wallet Balance */}
// //       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
// //         <div>
// //           <h2 className="text-lg font-semibold">Wallet Balance</h2>
// //           <p className="text-3xl font-bold flex items-center gap-2 mt-2">
// //             <IndianRupee size={24} /> {wallet.balance.toFixed(2)}
// //           </p>
// //         </div>
// //         <WalletIcon size={50} className="opacity-70" />
// //       </div>

// //       {/* Tabs */}
// //       <div className="mt-6 flex gap-4 border-b">
// //         <button
// //           onClick={() => setActiveTab("transactions")}
// //           className={`pb-2 px-4 ${
// //             activeTab === "transactions"
// //               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
// //               : "text-gray-600"
// //           }`}
// //         >
// //           Transactions
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("withdrawals")}
// //           className={`pb-2 px-4 ${
// //             activeTab === "withdrawals"
// //               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
// //               : "text-gray-600"
// //           }`}
// //         >
// //           Withdrawals
// //         </button>
// //       </div>

// //       {/* Success / Error */}
// //       {error && <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>}
// //       {success && <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>}

// //       {/* Transactions */}
// //       {activeTab === "transactions" && (
// //         <div className="mt-6 space-y-3">
// //           {wallet.transactions.length === 0 ? (
// //             <p className="text-gray-500 text-center">No transactions yet.</p>
// //           ) : (
// //             wallet.transactions.map((t, i) => (
// //               <div
// //                 key={i}
// //                 className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
// //               >
// //                 <div>
// //                   <p className="font-medium">{t.type}</p>
// //                   <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
// //                 </div>
// //                 <p
// //                   className={`font-semibold ${
// //                     t.type === "Credit" ? "text-green-600" : "text-red-600"
// //                   }`}
// //                 >
// //                   {t.type === "Credit" ? "+" : "-"} ₹{t.amount}
// //                 </p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       )}

// //       {/* Withdrawals */}
// //       {activeTab === "withdrawals" && (
// //         <div className="mt-6 space-y-3">
// //           <button
// //             onClick={() => setShowWithdrawForm(!showWithdrawForm)}
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
// //           >
// //             + New Withdrawal
// //           </button>

// //           {showWithdrawForm && (
// //             <div className="mt-4 bg-white shadow rounded-xl p-4 space-y-4">
// //               {["bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map((field) => (
// //                 <div key={field}>
// //                   <input
// //                     type={field === "amount" ? "number" : "text"}
// //                     name={field}
// //                     placeholder={
// //                       field === "bankName"
// //                         ? "Bank Name"
// //                         : field === "accountNumber"
// //                         ? "Account Number"
// //                         : field === "ifscCode"
// //                         ? "IFSC Code"
// //                         : field === "mobileNumber"
// //                         ? "Mobile Number"
// //                         : "Amount"
// //                     }
// //                     value={withdrawalForm[field]}
// //                     onChange={handleInputChange}
// //                     className={`w-full border rounded-lg px-3 py-2 ${
// //                       formErrors[field] ? "border-red-500" : "border-gray-300"
// //                     }`}
// //                   />
// //                   {formErrors[field] && (
// //                     <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
// //                   )}
// //                 </div>
// //               ))}
// //               <button
// //                 onClick={handleWithdrawalSubmit}
// //                 disabled={loading.submit}
// //                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
// //               >
// //                 {loading.submit ? "Submitting..." : "Submit Withdrawal"}
// //               </button>
// //             </div>
// //           )}

// //           <div className="space-y-3">
// //             {withdrawalRequests.length === 0 ? (
// //               <p className="text-gray-500 text-center">No withdrawal requests yet.</p>
// //             ) : (
// //               withdrawalRequests.map((req, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
// //                 >
// //                   <div>
// //                     <p className="font-medium">₹{req.amount}</p>
// //                     <p className="text-sm text-gray-500">{formatDate(req.date)}</p>
// //                   </div>
// //                   <span
// //                     className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(
// //                       req.status
// //                     )}`}
// //                   >
// //                     {getStatusIcon(req.status)}
// //                     {req.status}
// //                   </span>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EnhancedWallet;


// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   ArrowUp,
//   Clock,
//   CheckCircle,
//   X,
//   Plus,
//   Wallet as WalletIcon,
//   IndianRupee,
// } from "lucide-react";
// import userWalletAPI from "../../services/userWalletApi";

// const EnhancedWallet = () => {
//   const { userId } = useParams();
//   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
//   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
//   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
//   const [loading, setLoading] = useState({
//     wallet: false,
//     withdrawals: false,
//     submit: false,
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [activeTab, setActiveTab] = useState("transactions");

//   const [withdrawalForm, setWithdrawalForm] = useState({
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     mobileNumber: "",
//     amount: "",
//   });

//   const [formErrors, setFormErrors] = useState({});





//   const loadWallet = async () => {
//     if (!userId) return;
//     try {
//       setLoading((prev) => ({ ...prev, wallet: true }));
//       const res = await userWalletAPI.getWallet(userId);
//       setWallet({
//         balance: res.data.balance || 0,
//         transactions: res.data.transactions || [],
//       });
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch wallet");
//     } finally {
//       setLoading((prev) => ({ ...prev, wallet: false }));
//     }
//   };

//   const loadRequests = async () => {
//     if (!userId) return;
//     try {
//       setLoading((prev) => ({ ...prev, withdrawals: true }));
//       const res = await userWalletAPI.getWithdrawals(userId);
//       setWithdrawalRequests(res.data || []);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch withdrawals");
//     } finally {
//       setLoading((prev) => ({ ...prev, withdrawals: false }));
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadWallet();
//       loadRequests();
//     }
//   }, [userId]);

//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     if (!withdrawalForm.bankName.trim()) {
//       errors.bankName = "Bank name is required";
//       isValid = false;
//     }
//     if (
//       !withdrawalForm.accountNumber.trim() ||
//       !/^\d{9,18}$/.test(withdrawalForm.accountNumber)
//     ) {
//       errors.accountNumber = "Valid account number is required (9-18 digits)";
//       isValid = false;
//     }
//     if (
//       !withdrawalForm.ifscCode.trim() ||
//       !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)
//     ) {
//       errors.ifscCode = "Valid IFSC code is required";
//       isValid = false;
//     }
//     if (
//       !withdrawalForm.mobileNumber.trim() ||
//       !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)
//     ) {
//       errors.mobileNumber = "Valid Indian mobile number is required";
//       isValid = false;
//     }
//     if (!withdrawalForm.amount || parseFloat(withdrawalForm.amount) < 1000) {
//       errors.amount = "Minimum withdrawal amount is ₹1000";
//       isValid = false;
//     } else if (parseFloat(withdrawalForm.amount) > wallet.balance) {
//       errors.amount = "Insufficient balance";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleWithdrawalSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading((prev) => ({ ...prev, submit: true }));
//     setError("");
//     setSuccess("");

//     try {
//       // ✅ Correct API call
//       await userWalletAPI.requestWithdrawal(userId, withdrawalForm);
//       setSuccess("Withdrawal request submitted successfully!");
//       setShowWithdrawForm(false);
//       setWithdrawalForm({
//         bankName: "",
//         accountNumber: "",
//         ifscCode: "",
//         mobileNumber: "",
//         amount: "",
//       });
//       await Promise.all([loadWallet(), loadRequests()]);
//     } catch (err) {
//       setError(err.response?.data?.message || "Withdrawal failed");
//     } finally {
//       setLoading((prev) => ({ ...prev, submit: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending":
//         return <Clock className="h-4 w-4 text-yellow-500" />;
//       case "Completed":
//         return <CheckCircle className="h-4 w-4 text-green-500" />;
//       case "Rejected":
//         return <X className="h-4 w-4 text-red-500" />;
//       default:
//         return <Clock className="h-4 w-4 text-gray-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "Completed":
//         return "bg-green-100 text-green-700";
//       case "Rejected":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-IN", options);
//   };

//   return (
//     <div className="p-4 md:p-6 max-w-5xl mx-auto">
//       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
//         <div>
//           <h2 className="text-lg font-semibold">Wallet Balance</h2>
//           <p className="text-3xl font-bold flex items-center gap-2 mt-2">
//             <IndianRupee size={24} /> {wallet.balance.toFixed(2)}
//           </p>
//         </div>
//         <WalletIcon size={50} className="opacity-70" />
//       </div>

//       <div className="mt-6 flex gap-4 border-b">
//         <button
//           onClick={() => setActiveTab("transactions")}
//           className={`pb-2 px-4 ${
//             activeTab === "transactions"
//               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Transactions
//         </button>
//         <button
//           onClick={() => setActiveTab("withdrawals")}
//           className={`pb-2 px-4 ${
//             activeTab === "withdrawals"
//               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           Withdrawals
//         </button>
//       </div>

//       {error && <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>}
//       {success && <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>}

//       {activeTab === "transactions" && (
//         <div className="mt-6 space-y-3">
//           {wallet.transactions.length === 0 ? (
//             <p className="text-gray-500 text-center">No transactions yet.</p>
//           ) : (
//             wallet.transactions.map((t, i) => (
//               <div
//                 key={i}
//                 className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
//               >
//                 <div>
//                   <p className="font-medium">{t.type}</p>
//                   <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
//                 </div>
//                 <p
//                   className={`font-semibold ${
//                     t.type === "Credit" ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {t.type === "Credit" ? "+" : "-"} ₹{t.amount}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {activeTab === "withdrawals" && (
//         <div className="mt-6 space-y-3">
//           <button
//             onClick={() => setShowWithdrawForm(!showWithdrawForm)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
//           >
//             + New Withdrawal
//           </button>

//           {showWithdrawForm && (
//             <div className="mt-4 bg-white shadow rounded-xl p-4 space-y-4">
//               {["bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map((field) => (
//                 <div key={field}>
//                   <input
//                     type={field === "amount" ? "number" : "text"}
//                     name={field}
//                     placeholder={
//                       field === "bankName"
//                         ? "Bank Name"
//                         : field === "accountNumber"
//                         ? "Account Number"
//                         : field === "ifscCode"
//                         ? "IFSC Code"
//                         : field === "mobileNumber"
//                         ? "Mobile Number"
//                         : "Amount"
//                     }
//                     value={withdrawalForm[field]}
//                     onChange={handleInputChange}
//                     className={`w-full border rounded-lg px-3 py-2 ${
//                       formErrors[field] ? "border-red-500" : "border-gray-300"
//                     }`}
//                   />
//                   {formErrors[field] && (
//                     <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>
//                   )}
//                 </div>
//               ))}
//               <button
//                 onClick={handleWithdrawalSubmit}
//                 disabled={loading.submit}
//                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
//               >
//                 {loading.submit ? "Submitting..." : "Submit Withdrawal"}
//               </button>
//             </div>
//           )}

//           <div className="space-y-3">
//             {withdrawalRequests.length === 0 ? (
//               <p className="text-gray-500 text-center">No withdrawal requests yet.</p>
//             ) : (
//               withdrawalRequests.map((req, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-medium">₹{req.amount}</p>
//                     <p className="text-sm text-gray-500">{formatDate(req.date)}</p>
//                   </div>
//                   <span
//                     className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(
//                       req.status
//                     )}`}
//                   >
//                     {getStatusIcon(req.status)}
//                     {req.status}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnhancedWallet;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  X,
  Wallet as WalletIcon,
  IndianRupee,
} from "lucide-react";
import userWalletAPI from "../../services/userWalletApi";

const EnhancedWallet = () => {
  const { userId } = useParams();

  const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [loading, setLoading] = useState({
    wallet: false,
    withdrawals: false,
    submit: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("transactions");

  const [withdrawalForm, setWithdrawalForm] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    mobileNumber: "",
    amount: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // ---------- helpers ----------
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Approved":
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Rejected":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const prettyType = (t) => {
    // backend types: 'bonus', 'deduct', 'withdrawal', 'refund'
    const map = { bonus: "Bonus", deduct: "Deduction", withdrawal: "Withdrawal", refund: "Refund" };
    return map[t] || t || "Transaction";
  };

  const amountClass = (amt) =>
    Number(amt) >= 0 ? "text-green-600" : "text-red-600";

  const sign = (amt) => (Number(amt) >= 0 ? "+" : "-");

  // ---------- API calls ----------
  const loadWallet = async () => {
    if (!userId) return;
    try {
      setLoading((p) => ({ ...p, wallet: true }));
      setError("");
      const res = await userWalletAPI.getWallet(userId);
      // expect: { success, wallet: { balance, transactions } }
      const w = res?.data?.wallet || res?.data || {}; // tolerate shapes
      setWallet({
        balance: Number(w.balance) || 0,
        transactions: Array.isArray(w.transactions) ? w.transactions : [],
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch wallet"
      );
    } finally {
      setLoading((p) => ({ ...p, wallet: false }));
    }
  };

  const loadRequests = async () => {
    if (!userId) return;
    try {
      setLoading((p) => ({ ...p, withdrawals: true }));
      setError("");
      const res = await userWalletAPI.getWithdrawals(userId);
      // expect: { success, withdrawalRequests: [...] }
      const list =
        res?.data?.withdrawalRequests ||
        res?.data ||
        [];
      setWithdrawalRequests(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch withdrawals"
      );
    } finally {
      setLoading((p) => ({ ...p, withdrawals: false }));
    }
  };

  useEffect(() => {
    if (userId) {
      loadWallet();
      loadRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // ---------- validations ----------
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!withdrawalForm.bankName.trim()) {
      errors.bankName = "Bank name is required";
      isValid = false;
    }
    if (
      !withdrawalForm.accountNumber.trim() ||
      !/^\d{9,18}$/.test(withdrawalForm.accountNumber)
    ) {
      errors.accountNumber = "Valid account number is required (9-18 digits)";
      isValid = false;
    }
    if (
      !withdrawalForm.ifscCode.trim() ||
      !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)
    ) {
      errors.ifscCode = "Valid IFSC code is required";
      isValid = false;
    }
    if (
      !withdrawalForm.mobileNumber.trim() ||
      !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)
    ) {
      errors.mobileNumber = "Valid Indian mobile number is required";
      isValid = false;
    }
    const amt = parseFloat(withdrawalForm.amount);
    if (!amt || amt < 1000) {
      errors.amount = "Minimum withdrawal amount is ₹1000";
      isValid = false;
    } else if (amt > (Number(wallet.balance) || 0)) {
      errors.amount = "Insufficient balance";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // ---------- submit ----------
  const handleWithdrawalSubmit = async () => {
    if (!validateForm()) return;

    setLoading((p) => ({ ...p, submit: true }));
    setError("");
    setSuccess("");

    try {
      // backend expects POST /api/wallet/withdraw  with body { userId, amount, ... }
      await userWalletAPI.requestWithdrawal({
        userId,
        ...withdrawalForm,
        amount: Number(withdrawalForm.amount),
      });

      setSuccess("Withdrawal request submitted successfully!");
      setShowWithdrawForm(false);
      setWithdrawalForm({
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        mobileNumber: "",
        amount: "",
      });

      await Promise.all([loadWallet(), loadRequests()]);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Withdrawal failed"
      );
    } finally {
      setLoading((p) => ({ ...p, submit: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------- UI ----------
  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-lg font-semibold">Wallet Balance</h2>
          <p className="text-3xl font-bold flex items-center gap-2 mt-2">
            <IndianRupee size={24} /> {(Number(wallet.balance) || 0).toFixed(2)}
          </p>
        </div>
        <WalletIcon size={50} className="opacity-70" />
      </div>

      <div className="mt-6 flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`pb-2 px-4 ${
            activeTab === "transactions"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-600"
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("withdrawals")}
          className={`pb-2 px-4 ${
            activeTab === "withdrawals"
              ? "border-b-2 border-blue-600 font-semibold text-blue-600"
              : "text-gray-600"
          }`}
        >
          Withdrawals
        </button>
      </div>

      {error && (
        <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>
      )}
      {success && (
        <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>
      )}

      {activeTab === "transactions" && (
        <div className="mt-6 space-y-3">
          {loading.wallet ? (
            <p className="text-gray-500 text-center">Loading wallet…</p>
          ) : wallet.transactions.length === 0 ? (
            <p className="text-gray-500 text-center">No transactions yet.</p>
          ) : (
            wallet.transactions.map((t, i) => (
              <div
                key={t._id || i}
                className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{prettyType(t.type)}</p>
                  <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
                </div>
                <p className={`font-semibold ${amountClass(t.amount)}`}>
                  {sign(t.amount)} ₹{Math.abs(Number(t.amount) || 0)}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "withdrawals" && (
        <div className="mt-6 space-y-3">
          <button
            onClick={() => setShowWithdrawForm((s) => !s)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            {showWithdrawForm ? "Close" : "+ New Withdrawal"}
          </button>

          {showWithdrawForm && (
            <div className="mt-4 bg-white shadow rounded-xl p-4 space-y-4">
              {["bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map(
                (field) => (
                  <div key={field}>
                    <input
                      type={field === "amount" ? "number" : "text"}
                      name={field}
                      placeholder={
                        field === "bankName"
                          ? "Bank Name"
                          : field === "accountNumber"
                          ? "Account Number"
                          : field === "ifscCode"
                          ? "IFSC Code"
                          : field === "mobileNumber"
                          ? "Mobile Number"
                          : "Amount"
                      }
                      value={withdrawalForm[field]}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-3 py-2 ${
                        formErrors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {formErrors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors[field]}
                      </p>
                    )}
                  </div>
                )
              )}
              <button
                onClick={handleWithdrawalSubmit}
                disabled={loading.submit}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading.submit ? "Submitting..." : "Submit Withdrawal"}
              </button>
            </div>
          )}

          <div className="space-y-3">
            {loading.withdrawals ? (
              <p className="text-gray-500 text-center">Loading withdrawals…</p>
            ) : withdrawalRequests.length === 0 ? (
              <p className="text-gray-500 text-center">
                No withdrawal requests yet.
              </p>
            ) : (
              withdrawalRequests.map((req, i) => (
                <div
                  key={req.id || i}
                  className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">₹{req.amount}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(req.requestDate)}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(
                      req.status
                    )}`}
                  >
                    {getStatusIcon(req.status)}
                    {req.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedWallet;
