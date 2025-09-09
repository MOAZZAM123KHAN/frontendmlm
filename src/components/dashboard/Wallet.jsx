// // // import React, { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";
// // // import {
// // //   Clock,
// // //   CheckCircle,
// // //   X,
// // //   Wallet as WalletIcon,
// // //   IndianRupee,
// // // } from "lucide-react";
// // // import userWalletAPI from "../../services/userWalletApi";

// // // const EnhancedWallet = () => {
// // //   const { userId } = useParams();

// // //   const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
// // //   const [withdrawalRequests, setWithdrawalRequests] = useState([]);
// // //   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
// // //   const [loading, setLoading] = useState({
// // //     wallet: false,
// // //     withdrawals: false,
// // //     submit: false,
// // //   });
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

// // //   // ---------- helpers ----------
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return "-";
// // //     const options = { day: "numeric", month: "short", year: "numeric" };
// // //     return new Date(dateString).toLocaleDateString("en-IN", options);
// // //   };

// // //   const getStatusIcon = (status) => {
// // //     switch (status) {
// // //       case "Pending":
// // //         return <Clock className="h-4 w-4 text-yellow-500" />;
// // //       case "Approved":
// // //       case "Completed":
// // //         return <CheckCircle className="h-4 w-4 text-green-500" />;
// // //       case "Rejected":
// // //         return <X className="h-4 w-4 text-red-500" />;
// // //       default:
// // //         return <Clock className="h-4 w-4 text-gray-500" />;
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "Pending":
// // //         return "bg-yellow-100 text-yellow-700";
// // //       case "Approved":
// // //       case "Completed":
// // //         return "bg-green-100 text-green-700";
// // //       case "Rejected":
// // //         return "bg-red-100 text-red-700";
// // //       default:
// // //         return "bg-gray-100 text-gray-700";
// // //     }
// // //   };

// // //   const prettyType = (t) => {
// // //     // backend types: 'bonus', 'deduct', 'withdrawal', 'refund'
// // //     const map = { bonus: "Bonus", deduct: "Deduction", withdrawal: "Withdrawal", refund: "Refund" };
// // //     return map[t] || t || "Transaction";
// // //   };

// // //   const amountClass = (amt) =>
// // //     Number(amt) >= 0 ? "text-green-600" : "text-red-600";

// // //   const sign = (amt) => (Number(amt) >= 0 ? "+" : "-");

// // //   // ---------- API calls ----------
// // //   const loadWallet = async () => {
// // //     if (!userId) return;
// // //     try {
// // //       setLoading((p) => ({ ...p, wallet: true }));
// // //       setError("");
// // //       const res = await userWalletAPI.getWallet(userId);
// // //       // expect: { success, wallet: { balance, transactions } }
// // //       const w = res?.data?.wallet || res?.data || {}; // tolerate shapes
// // //       setWallet({
// // //         balance: Number(w.balance) || 0,
// // //         transactions: Array.isArray(w.transactions) ? w.transactions : [],
// // //       });
// // //     } catch (err) {
// // //       setError(
// // //         err?.response?.data?.message ||
// // //           err?.message ||
// // //           "Failed to fetch wallet"
// // //       );
// // //     } finally {
// // //       setLoading((p) => ({ ...p, wallet: false }));
// // //     }
// // //   };

// // //   const loadRequests = async () => {
// // //     if (!userId) return;
// // //     try {
// // //       setLoading((p) => ({ ...p, withdrawals: true }));
// // //       setError("");
// // //       const res = await userWalletAPI.getWithdrawals(userId);
// // //       // expect: { success, withdrawalRequests: [...] }
// // //       const list =
// // //         res?.data?.withdrawalRequests ||
// // //         res?.data ||
// // //         [];
// // //       setWithdrawalRequests(Array.isArray(list) ? list : []);
// // //     } catch (err) {
// // //       setError(
// // //         err?.response?.data?.message ||
// // //           err?.message ||
// // //           "Failed to fetch withdrawals"
// // //       );
// // //     } finally {
// // //       setLoading((p) => ({ ...p, withdrawals: false }));
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (userId) {
// // //       loadWallet();
// // //       loadRequests();
// // //     }
// // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // //   }, [userId]);

// // //   // ---------- validations ----------
// // //   const validateForm = () => {
// // //     const errors = {};
// // //     let isValid = true;

// // //     if (!withdrawalForm.bankName.trim()) {
// // //       errors.bankName = "Bank name is required";
// // //       isValid = false;
// // //     }
// // //     if (
// // //       !withdrawalForm.accountNumber.trim() ||
// // //       !/^\d{9,18}$/.test(withdrawalForm.accountNumber)
// // //     ) {
// // //       errors.accountNumber = "Valid account number is required (9-18 digits)";
// // //       isValid = false;
// // //     }
// // //     if (
// // //       !withdrawalForm.ifscCode.trim() ||
// // //       !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)
// // //     ) {
// // //       errors.ifscCode = "Valid IFSC code is required";
// // //       isValid = false;
// // //     }
// // //     if (
// // //       !withdrawalForm.mobileNumber.trim() ||
// // //       !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)
// // //     ) {
// // //       errors.mobileNumber = "Valid Indian mobile number is required";
// // //       isValid = false;
// // //     }
// // //     const amt = parseFloat(withdrawalForm.amount);
// // //     if (!amt || amt < 1000) {
// // //       errors.amount = "Minimum withdrawal amount is ₹1000";
// // //       isValid = false;
// // //     } else if (amt > (Number(wallet.balance) || 0)) {
// // //       errors.amount = "Insufficient balance";
// // //       isValid = false;
// // //     }

// // //     setFormErrors(errors);
// // //     return isValid;
// // //   };

// // //   // ---------- submit ----------
// // //   const handleWithdrawalSubmit = async () => {
// // //     if (!validateForm()) return;

// // //     setLoading((p) => ({ ...p, submit: true }));
// // //     setError("");
// // //     setSuccess("");

// // //     try {
// // //       // backend expects POST /api/wallet/withdraw  with body { userId, amount, ... }
// // //       await userWalletAPI.requestWithdrawal({
// // //         userId,
// // //         ...withdrawalForm,
// // //         amount: Number(withdrawalForm.amount),
// // //       });

// // //       setSuccess("Withdrawal request submitted successfully!");
// // //       setShowWithdrawForm(false);
// // //       setWithdrawalForm({
// // //         bankName: "",
// // //         accountNumber: "",
// // //         ifscCode: "",
// // //         mobileNumber: "",
// // //         amount: "",
// // //       });

// // //       await Promise.all([loadWallet(), loadRequests()]);
// // //     } catch (err) {
// // //       setError(
// // //         err?.response?.data?.message ||
// // //           err?.message ||
// // //           "Withdrawal failed"
// // //       );
// // //     } finally {
// // //       setLoading((p) => ({ ...p, submit: false }));
// // //     }
// // //   };

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
// // //     if (formErrors[name]) {
// // //       setFormErrors((prev) => ({ ...prev, [name]: "" }));
// // //     }
// // //   };

// // //   // ---------- UI ----------
// // //   return (
// // //     <div className="p-4 md:p-6 max-w-5xl mx-auto">
// // //       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
// // //         <div>
// // //           <h2 className="text-lg font-semibold">Wallet Balance</h2>
// // //           <p className="text-3xl font-bold flex items-center gap-2 mt-2">
// // //             <IndianRupee size={24} /> {(Number(wallet.balance) || 0).toFixed(2)}
// // //           </p>
// // //         </div>
// // //         <WalletIcon size={50} className="opacity-70" />
// // //       </div>

// // //       <div className="mt-6 flex gap-4 border-b">
// // //         <button
// // //           onClick={() => setActiveTab("transactions")}
// // //           className={`pb-2 px-4 ${
// // //             activeTab === "transactions"
// // //               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
// // //               : "text-gray-600"
// // //           }`}
// // //         >
// // //           Transactions
// // //         </button>
// // //         <button
// // //           onClick={() => setActiveTab("withdrawals")}
// // //           className={`pb-2 px-4 ${
// // //             activeTab === "withdrawals"
// // //               ? "border-b-2 border-blue-600 font-semibold text-blue-600"
// // //               : "text-gray-600"
// // //           }`}
// // //         >
// // //           Withdrawals
// // //         </button>
// // //       </div>

// // //       {error && (
// // //         <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>
// // //       )}
// // //       {success && (
// // //         <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>
// // //       )}

// // //       {activeTab === "transactions" && (
// // //         <div className="mt-6 space-y-3">
// // //           {loading.wallet ? (
// // //             <p className="text-gray-500 text-center">Loading wallet…</p>
// // //           ) : wallet.transactions.length === 0 ? (
// // //             <p className="text-gray-500 text-center">No transactions yet.</p>
// // //           ) : (
// // //             wallet.transactions.map((t, i) => (
// // //               <div
// // //                 key={t._id || i}
// // //                 className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
// // //               >
// // //                 <div>
// // //                   <p className="font-medium">{prettyType(t.type)}</p>
// // //                   <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
// // //                 </div>
// // //                 <p className={`font-semibold ${amountClass(t.amount)}`}>
// // //                   {sign(t.amount)} ₹{Math.abs(Number(t.amount) || 0)}
// // //                 </p>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>
// // //       )}

// // //       {activeTab === "withdrawals" && (
// // //         <div className="mt-6 space-y-3">
// // //           <button
// // //             onClick={() => setShowWithdrawForm((s) => !s)}
// // //             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
// // //           >
// // //             {showWithdrawForm ? "Close" : "+ New Withdrawal"}
// // //           </button>

// // //           {showWithdrawForm && (
// // //             <div className="mt-4 bg-white shadow rounded-xl p-4 space-y-4">
// // //               {["bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map(
// // //                 (field) => (
// // //                   <div key={field}>
// // //                     <input
// // //                       type={field === "amount" ? "number" : "text"}
// // //                       name={field}
// // //                       placeholder={
// // //                         field === "bankName"
// // //                           ? "Bank Name"
// // //                           : field === "accountNumber"
// // //                           ? "Account Number"
// // //                           : field === "ifscCode"
// // //                           ? "IFSC Code"
// // //                           : field === "mobileNumber"
// // //                           ? "Mobile Number"
// // //                           : "Amount"
// // //                       }
// // //                       value={withdrawalForm[field]}
// // //                       onChange={handleInputChange}
// // //                       className={`w-full border rounded-lg px-3 py-2 ${
// // //                         formErrors[field] ? "border-red-500" : "border-gray-300"
// // //                       }`}
// // //                     />
// // //                     {formErrors[field] && (
// // //                       <p className="text-red-500 text-sm mt-1">
// // //                         {formErrors[field]}
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 )
// // //               )}
// // //               <button
// // //                 onClick={handleWithdrawalSubmit}
// // //                 disabled={loading.submit}
// // //                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
// // //               >
// // //                 {loading.submit ? "Submitting..." : "Submit Withdrawal"}
// // //               </button>
// // //             </div>
// // //           )}

// // //           <div className="space-y-3">
// // //             {loading.withdrawals ? (
// // //               <p className="text-gray-500 text-center">Loading withdrawals…</p>
// // //             ) : withdrawalRequests.length === 0 ? (
// // //               <p className="text-gray-500 text-center">
// // //                 No withdrawal requests yet.
// // //               </p>
// // //             ) : (
// // //               withdrawalRequests.map((req, i) => (
// // //                 <div
// // //                   key={req.id || i}
// // //                   className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg"
// // //                 >
// // //                   <div>
// // //                     <p className="font-medium">₹{req.amount}</p>
// // //                     <p className="text-sm text-gray-500">
// // //                       {formatDate(req.requestDate)}
// // //                     </p>
// // //                   </div>
// // //                   <span
// // //                     className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(
// // //                       req.status
// // //                     )}`}
// // //                   >
// // //                     {getStatusIcon(req.status)}
// // //                     {req.status}
// // //                   </span>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default EnhancedWallet;

// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import {
// //   Clock,
// //   CheckCircle,
// //   X,
// //   Wallet as WalletIcon,
// //   IndianRupee,
// // } from "lucide-react";
// // import userWalletAPI from "../../services/userWalletApi";

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

// //   // ---------- helpers ----------
// //   const formatDate = (dateString) => {
// //     if (!dateString) return "-";
// //     const options = { day: "numeric", month: "short", year: "numeric" };
// //     return new Date(dateString).toLocaleDateString("en-IN", options);
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return <Clock className="h-4 w-4 text-yellow-500" />;
// //       case "Approved":
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
// //       case "Approved":
// //       case "Completed":
// //         return "bg-green-100 text-green-700";
// //       case "Rejected":
// //         return "bg-red-100 text-red-700";
// //       default:
// //         return "bg-gray-100 text-gray-700";
// //     }
// //   };

// //   const prettyType = (t) => {
// //     const map = { bonus: "Bonus", deduct: "Deduction", withdrawal: "Withdrawal", refund: "Refund" };
// //     return map[t] || t || "Transaction";
// //   };

// //   const amountClass = (amt) =>
// //     Number(amt) >= 0 ? "text-green-600" : "text-red-600";

// //   const sign = (amt) => (Number(amt) >= 0 ? "+" : "-");

// //   // ---------- API calls ----------
// //   const loadWallet = async () => {
// //     if (!userId) return;
// //     try {
// //       setLoading((p) => ({ ...p, wallet: true }));
// //       setError("");
// //       const res = await userWalletAPI.getWallet(userId);
// //       const w = res?.data?.wallet || res?.data || {};
// //       setWallet({
// //         balance: Number(w.balance) || 0,
// //         transactions: Array.isArray(w.transactions) ? w.transactions : [],
// //       });
// //     } catch (err) {
// //       setError(err?.response?.data?.message || err?.message || "Failed to fetch wallet");
// //     } finally {
// //       setLoading((p) => ({ ...p, wallet: false }));
// //     }
// //   };

// //   const loadRequests = async () => {
// //     if (!userId) return;
// //     try {
// //       setLoading((p) => ({ ...p, withdrawals: true }));
// //       setError("");
// //       const res = await userWalletAPI.getWithdrawals(userId);
// //       const list = res?.data?.withdrawalRequests || res?.data || [];
// //       setWithdrawalRequests(Array.isArray(list) ? list : []);
// //     } catch (err) {
// //       setError(err?.response?.data?.message || err?.message || "Failed to fetch withdrawals");
// //     } finally {
// //       setLoading((p) => ({ ...p, withdrawals: false }));
// //     }
// //   };

// //   useEffect(() => {
// //     if (userId) {
// //       loadWallet();
// //       loadRequests();
// //     }
// //   }, [userId]);

// //   // ---------- validations ----------
// //   const validateForm = () => {
// //     const errors = {};
// //     let isValid = true;

// //     if (!withdrawalForm.bankName.trim()) {
// //       errors.bankName = "Bank name is required";
// //       isValid = false;
// //     }
// //     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
// //       errors.accountNumber = "Valid account number is required (9-18 digits)";
// //       isValid = false;
// //     }
// //     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
// //       errors.ifscCode = "Valid IFSC code is required";
// //       isValid = false;
// //     }
// //     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
// //       errors.mobileNumber = "Valid Indian mobile number is required";
// //       isValid = false;
// //     }
// //     const amt = parseFloat(withdrawalForm.amount);
// //     if (!amt || amt < 1000) {
// //       errors.amount = "Minimum withdrawal amount is ₹1000";
// //       isValid = false;
// //     } else if (amt > (Number(wallet.balance) || 0)) {
// //       errors.amount = "Insufficient balance";
// //       isValid = false;
// //     }

// //     setFormErrors(errors);
// //     return isValid;
// //   };

// //   // ---------- submit ----------
// //   const handleWithdrawalSubmit = async () => {
// //     if (!validateForm()) return;

// //     setLoading((p) => ({ ...p, submit: true }));
// //     setError("");
// //     setSuccess("");

// //     // sanitize & structure payload to match backend
// //     const payload = {
// //       userId: userId.trim(),
// //       bankName: withdrawalForm.bankName.trim(),
// //       accountNumber: withdrawalForm.accountNumber.trim(),
// //       ifscCode: withdrawalForm.ifscCode.trim().toUpperCase(),
// //       mobileNumber: withdrawalForm.mobileNumber.trim(),
// //       amount: Number(withdrawalForm.amount),
// //     };

// //     console.log("Sending withdrawal request:", payload);

// //     try {
// //       const res = await userWalletAPI.requestWithdrawal(payload);
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
// //       console.error("❌ requestWithdrawal error:", err.response?.data || err.message);
// //       if (err.response?.data?.errors) {
// //         setFormErrors(err.response.data.errors.reduce((acc, e) => ({ ...acc, [e.field]: e.message }), {}));
// //       }
// //       setError(err?.response?.data?.message || err?.message || "Withdrawal failed");
// //     } finally {
// //       setLoading((p) => ({ ...p, submit: false }));
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
// //     if (formErrors[name]) {
// //       setFormErrors((prev) => ({ ...prev, [name]: "" }));
// //     }
// //   };

// //   // ---------- UI ----------
// //   return (
// //     <div className="p-4 md:p-6 max-w-5xl mx-auto">
// //       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
// //         <div>
// //           <h2 className="text-lg font-semibold">Wallet Balance</h2>
// //           <p className="text-3xl font-bold flex items-center gap-2 mt-2">
// //             <IndianRupee size={24} /> {(Number(wallet.balance) || 0).toFixed(2)}
// //           </p>
// //         </div>
// //         <WalletIcon size={50} className="opacity-70" />
// //       </div>

// //       <div className="mt-6 flex gap-4 border-b">
// //         <button
// //           onClick={() => setActiveTab("transactions")}
// //           className={`pb-2 px-4 ${activeTab === "transactions" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
// //         >
// //           Transactions
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("withdrawals")}
// //           className={`pb-2 px-4 ${activeTab === "withdrawals" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
// //         >
// //           Withdrawals
// //         </button>
// //       </div>

// //       {error && <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>}
// //       {success && <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>}

// //       {activeTab === "transactions" && (
// //         <div className="mt-6 space-y-3">
// //           {loading.wallet ? (
// //             <p className="text-gray-500 text-center">Loading wallet…</p>
// //           ) : wallet.transactions.length === 0 ? (
// //             <p className="text-gray-500 text-center">No transactions yet.</p>
// //           ) : (
// //             wallet.transactions.map((t, i) => (
// //               <div key={t._id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
// //                 <div>
// //                   <p className="font-medium">{prettyType(t.type)}</p>
// //                   <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
// //                 </div>
// //                 <p className={`font-semibold ${amountClass(t.amount)}`}>
// //                   {sign(t.amount)} ₹{Math.abs(Number(t.amount) || 0)}
// //                 </p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       )}

// //       {activeTab === "withdrawals" && (
// //         <div className="mt-6 space-y-3">
// //           <button
// //             onClick={() => setShowWithdrawForm((s) => !s)}
// //             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
// //           >
// //             {showWithdrawForm ? "Close" : "+ New Withdrawal"}
// //           </button>

// //           {showWithdrawForm && (
// //             <div className="mt-4 bg-white shadow rounded-xl p-4 space-y-4">
// //               {["bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map((field) => (
// //                 <div key={field}>
// //                   <input
// //                     type={field === "amount" ? "number" : "text"}
// //                     name={field}
// //                     placeholder={field === "bankName" ? "Bank Name" : field === "accountNumber" ? "Account Number" : field === "ifscCode" ? "IFSC Code" : field === "mobileNumber" ? "Mobile Number" : "Amount"}
// //                     value={withdrawalForm[field]}
// //                     onChange={handleInputChange}
// //                     className={`w-full border rounded-lg px-3 py-2 ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
// //                   />
// //                   {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
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
// //             {loading.withdrawals ? (
// //               <p className="text-gray-500 text-center">Loading withdrawals…</p>
// //             ) : withdrawalRequests.length === 0 ? (
// //               <p className="text-gray-500 text-center">No withdrawal requests yet.</p>
// //             ) : (
// //               withdrawalRequests.map((req, i) => (
// //                 <div key={req.id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
// //                   <div>
// //                     <p className="font-medium">₹{req.amount}</p>
// //                     <p className="text-sm text-gray-500">{formatDate(req.requestDate)}</p>
// //                   </div>
// //                   <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(req.status)}`}>
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
//   Clock,
//   CheckCircle,
//   X,
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

//   // ---------- helpers ----------
//   const formatDate = (dateString) => {
//     if (!dateString) return "-";
//     const options = { day: "numeric", month: "short", year: "numeric" };
//     return new Date(dateString).toLocaleDateString("en-IN", options);
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Pending":
//         return <Clock className="h-4 w-4 text-yellow-500" />;
//       case "Approved":
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
//       case "Approved":
//       case "Completed":
//         return "bg-green-100 text-green-700";
//       case "Rejected":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const prettyType = (type) => {
//     const map = {
//       bonus: "Bonus",
//       deduct: "Deduction",
//       withdrawal: "Withdrawal",
//       refund: "Refund",
//     };
//     return map[type] || type || "Transaction";
//   };

//   const amountClass = (amt) => (Number(amt) >= 0 ? "text-green-600" : "text-red-600");
//   const sign = (amt) => (Number(amt) >= 0 ? "+" : "-");

//   // ---------- API calls ----------
//   const loadWallet = async () => {
//     if (!userId) return;
//     try {
//       setLoading((p) => ({ ...p, wallet: true }));
//       setError("");
//       const res = await userWalletAPI.getWallet(userId);
//       const w = res?.data?.wallet || res?.data || {};
//       setWallet({
//         balance: Number(w.balance) || 0,
//         transactions: Array.isArray(w.transactions) ? w.transactions : [],
//       });
//     } catch (err) {
//       setError(err?.response?.data?.message || err?.message || "Failed to fetch wallet");
//     } finally {
//       setLoading((p) => ({ ...p, wallet: false }));
//     }
//   };

//   const loadRequests = async () => {
//     if (!userId) return;
//     try {
//       setLoading((p) => ({ ...p, withdrawals: true }));
//       setError("");
//       const res = await userWalletAPI.getWithdrawals(userId);
//       const list = res?.data?.withdrawalRequests || res?.data || [];
//       setWithdrawalRequests(Array.isArray(list) ? list : []);
//     } catch (err) {
//       setError(err?.response?.data?.message || err?.message || "Failed to fetch withdrawals");
//     } finally {
//       setLoading((p) => ({ ...p, withdrawals: false }));
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadWallet();
//       loadRequests();
//     }
//   }, [userId]);

//   // ---------- validations ----------
//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     if (!withdrawalForm.bankName.trim()) {
//       errors.bankName = "Bank name is required";
//       isValid = false;
//     }

//     if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
//       errors.accountNumber = "Valid account number is required (9-18 digits)";
//       isValid = false;
//     }

//     if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
//       errors.ifscCode = "Valid IFSC code is required";
//       isValid = false;
//     }

//     if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
//       errors.mobileNumber = "Valid Indian mobile number is required";
//       isValid = false;
//     }

//     const amt = parseFloat(withdrawalForm.amount);
//     if (!amt || amt < 1000) {
//       errors.amount = "Minimum withdrawal amount is ₹1000";
//       isValid = false;
//     } else if (amt > (Number(wallet.balance) || 0)) {
//       errors.amount = "Insufficient balance";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   // ---------- submit ----------
//   const handleWithdrawalSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading((p) => ({ ...p, submit: true }));
//     setError("");
//     setSuccess("");

//     // const payload = {
//     //   userId: userId, // must match backend
//     //   bankName: withdrawalForm.bankName.trim(),
//     //   accountNumber: withdrawalForm.accountNumber.trim(),
//     //   ifscCode: withdrawalForm.ifscCode.trim().toUpperCase(),
//     //   mobileNumber: withdrawalForm.mobileNumber.trim(),
//     //   amount: Number(withdrawalForm.amount),
//     // };

//     // try {
//     //   const res = await userWalletAPI.requestWithdrawal(payload);
//     //   setSuccess(res?.data?.message || "Withdrawal request submitted successfully!");
      
//       const handleWithdrawalSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading((p) => ({ ...p, submit: true }));
//     setError("");
//     setSuccess("");


//     const payload = {
//       userId: userId, // backend validator requires this
//       amount: Number(withdrawalForm.amount),
//      accountDetails: {
//        name: "Account Holder", // 👉 Add input if you want user name, else default
//         bankName: withdrawalForm.bankName.trim(),
//         accountNumber: withdrawalForm.accountNumber.trim(),
//         ifscCode: withdrawalForm.ifscCode.trim().toUpperCase(),
//       },
//       mobileNumber: withdrawalForm.mobileNumber.trim(),
//     };

//     try {

//       const res = await userWalletAPI.requestWithdrawal(payload);      setSuccess(res?.message || "Withdrawal request submitted successfully!");

//     setShowWithdrawForm(false);
//       setWithdrawalForm({ bankName: "", accountNumber: "", ifscCode: "", mobileNumber: "", amount: "" });
//       await Promise.all([loadWallet(), loadRequests()]);
//     } catch (err) {
//       if (err.response?.data?.errors) {
//         const backendErrors = {};
//         err.response.data.errors.forEach((e) => {
//           backendErrors[e.field] = e.message;
//         });
//         setFormErrors(backendErrors);
//       }
//       setError(err.response?.data?.message || err.message || "Withdrawal failed");
//     } finally {
//       setLoading((p) => ({ ...p, submit: false }));
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
//     if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // ---------- UI ----------
//   return (
//     <div className="p-4 md:p-6 max-w-5xl mx-auto">
//       <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl p-6 flex items-center justify-between shadow-lg">
//         <div>
//           <h2 className="text-lg font-semibold">Wallet Balance</h2>
//           <p className="text-3xl font-bold flex items-center gap-2 mt-2">
//             <IndianRupee size={24} /> {(Number(wallet.balance) || 0).toFixed(2)}
//           </p>
//         </div>
//         <WalletIcon size={50} className="opacity-70" />
//       </div>

//       <div className="mt-6 flex gap-4 border-b">
//         <button
//           onClick={() => setActiveTab("transactions")}
//           className={`pb-2 px-4 ${activeTab === "transactions" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
//         >
//           Transactions
//         </button>
//         <button
//           onClick={() => setActiveTab("withdrawals")}
//           className={`pb-2 px-4 ${activeTab === "withdrawals" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
//         >
//           Withdrawals
//         </button>
//       </div>

//       {error && <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>}
//       {success && <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>}

//       {activeTab === "transactions" && (
//         <div className="mt-6 space-y-3">
//           {loading.wallet ? (
//             <p className="text-gray-500 text-center">Loading wallet…</p>
//           ) : wallet.transactions.length === 0 ? (
//             <p className="text-gray-500 text-center">No transactions yet.</p>
//           ) : (
//             wallet.transactions.map((t, i) => (
//               <div key={t._id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
//                 <div>
//                   <p className="font-medium">{prettyType(t.type)}</p>
//                   <p className="text-sm text-gray-500">{formatDate(t.date)}</p>
//                 </div>
//                 <p className={`font-semibold ${amountClass(t.amount)}`}>
//                   {sign(t.amount)} ₹{Math.abs(Number(t.amount) || 0)}
//                 </p>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {activeTab === "withdrawals" && (
//         <div className="mt-6 space-y-3">
//           <button
//             onClick={() => setShowWithdrawForm((s) => !s)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
//           >
//             {showWithdrawForm ? "Close" : "+ New Withdrawal"}
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
//                     className={`w-full border rounded-lg px-3 py-2 ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
//                   />
//                   {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
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
//             {loading.withdrawals ? (
//               <p className="text-gray-500 text-center">Loading withdrawals…</p>
//             ) : withdrawalRequests.length === 0 ? (
//               <p className="text-gray-500 text-center">No withdrawal requests yet.</p>
//             ) : (
//               withdrawalRequests.map((req, i) => (
//                 <div key={req.id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
//                   <div>
//                     <p className="font-medium">₹{req.amount}</p>
//                     <p className="text-sm text-gray-500">{formatDate(req.requestDate)}</p>
//                   </div>
//                   <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(req.status)}`}>
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
    name: "",          // 👈 new field (account holder name)
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

  const prettyType = (type) => {
    const map = {
      bonus: "Bonus",
      deduct: "Deduction",
      withdrawal: "Withdrawal",
      refund: "Refund",
    };
    return map[type] || type || "Transaction";
  };

  const amountClass = (amt) => (Number(amt) >= 0 ? "text-green-600" : "text-red-600");
  const sign = (amt) => (Number(amt) >= 0 ? "+" : "-");

  // ---------- API calls ----------
  const loadWallet = async () => {
    if (!userId) return;
    try {
      setLoading((p) => ({ ...p, wallet: true }));
      setError("");
      const res = await userWalletAPI.getWallet(userId);
      const w = res?.data?.wallet || res?.data || {};
      setWallet({
        balance: Number(w.balance) || 0,
        transactions: Array.isArray(w.transactions) ? w.transactions : [],
      });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch wallet");
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
      const list = res?.data?.withdrawalRequests || res?.data || [];
      setWithdrawalRequests(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch withdrawals");
    } finally {
      setLoading((p) => ({ ...p, withdrawals: false }));
    }
  };

  useEffect(() => {
    if (userId) {
      loadWallet();
      loadRequests();
    }
  }, [userId]);

  // ---------- validations ----------
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!withdrawalForm.name.trim()) {
      errors.name = "Account holder name is required";
      isValid = false;
    }

    if (!withdrawalForm.bankName.trim()) {
      errors.bankName = "Bank name is required";
      isValid = false;
    }

    if (!withdrawalForm.accountNumber.trim() || !/^\d{9,18}$/.test(withdrawalForm.accountNumber)) {
      errors.accountNumber = "Valid account number is required (9-18 digits)";
      isValid = false;
    }

    if (!withdrawalForm.ifscCode.trim() || !/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(withdrawalForm.ifscCode)) {
      errors.ifscCode = "Valid IFSC code is required";
      isValid = false;
    }

    if (!withdrawalForm.mobileNumber.trim() || !/^[6-9]\d{9}$/.test(withdrawalForm.mobileNumber)) {
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

  // ---------- submit ----------  

  const handleWithdrawalSubmit = async () => {
  if (!validateForm()) return;

  setLoading((p) => ({ ...p, submit: true }));
  setError("");
  setSuccess("");

  // 👇 payload backend ke required FLAT format me
  const payload = {
    userId: userId,
    amount: Number(withdrawalForm.amount),
    // name: withdrawalForm.name.trim(),
    bankName: withdrawalForm.bankName.trim(),
    accountNumber: withdrawalForm.accountNumber.trim(),
    ifscCode: withdrawalForm.ifscCode.trim().toUpperCase(),
    mobileNumber: withdrawalForm.mobileNumber.trim(),
  };

  console.log("🚀 Sending Withdrawal Payload:", payload);

  try {
    const res = await userWalletAPI.requestWithdrawal(payload);
    setSuccess(res?.message || "Withdrawal request submitted successfully!");

    setShowWithdrawForm(false);
    setWithdrawalForm({
      name: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      mobileNumber: "",
      amount: "",
    });
    await Promise.all([loadWallet(), loadRequests()]);
  } catch (err) {
    if (err.response?.data?.errors) {
      const backendErrors = {};
      err.response.data.errors.forEach((e) => {
        backendErrors[e.field] = e.message;
      });
      setFormErrors(backendErrors);
    }
    setError(err.response?.data?.message || err.message || "Withdrawal failed");
  } finally {
    setLoading((p) => ({ ...p, submit: false }));
  }
};




// const handleWithdrawalSubmit = async () => {
//   if (!validateForm()) return;

//   setLoading((p) => ({ ...p, submit: true }));
//   setError("");
//   setSuccess("");

//   // 👇 payload backend ke required nested format me
//   const payload = {
//     userId: userId,
//     amount: Number(withdrawalForm.amount),
//     accountDetails: {
//       name: withdrawalForm.name.trim(),
//       bankName: withdrawalForm.bankName.trim(),
//       accountNumber: withdrawalForm.accountNumber.trim(),
//       ifscCode: withdrawalForm.ifscCode.trim().toUpperCase(),
//     },
//     mobileNumber: withdrawalForm.mobileNumber.trim(),
//   };

//   try {
//     const res = await userWalletAPI.requestWithdrawal(payload);
//     setSuccess(res?.message || "Withdrawal request submitted successfully!");

//     setShowWithdrawForm(false);
//     setWithdrawalForm({
//       name: "",
//       bankName: "",
//       accountNumber: "",
//       ifscCode: "",
//       mobileNumber: "",
//       amount: "",
//     });
//     await Promise.all([loadWallet(), loadRequests()]);
//   } catch (err) {
//     if (err.response?.data?.errors) {
//       const backendErrors = {};
//       err.response.data.errors.forEach((e) => {
//         backendErrors[e.field] = e.message;
//       });
//       setFormErrors(backendErrors);
//     }
//     setError(err.response?.data?.message || err.message || "Withdrawal failed");
//   } finally {
//     setLoading((p) => ({ ...p, submit: false }));
//   }
// };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
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
          className={`pb-2 px-4 ${activeTab === "transactions" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab("withdrawals")}
          className={`pb-2 px-4 ${activeTab === "withdrawals" ? "border-b-2 border-blue-600 font-semibold text-blue-600" : "text-gray-600"}`}
        >
          Withdrawals
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 bg-red-50 p-2 rounded">{error}</p>}
      {success && <p className="mt-4 text-green-600 bg-green-50 p-2 rounded">{success}</p>}

      {activeTab === "transactions" && (
        <div className="mt-6 space-y-3">
          {loading.wallet ? (
            <p className="text-gray-500 text-center">Loading wallet…</p>
          ) : wallet.transactions.length === 0 ? (
            <p className="text-gray-500 text-center">No transactions yet.</p>
          ) : (
            wallet.transactions.map((t, i) => (
              <div key={t._id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
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
              {["name", "bankName", "accountNumber", "ifscCode", "mobileNumber", "amount"].map((field) => (
                <div key={field}>
                  <input
                    type={field === "amount" ? "number" : "text"}
                    name={field}
                    placeholder={
                      field === "name"
                        ? "Account Holder Name"
                        : field === "bankName"
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
                    className={`w-full border rounded-lg px-3 py-2 ${formErrors[field] ? "border-red-500" : "border-gray-300"}`}
                  />
                  {formErrors[field] && <p className="text-red-500 text-sm mt-1">{formErrors[field]}</p>}
                </div>
              ))}
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
              <p className="text-gray-500 text-center">No withdrawal requests yet.</p>
            ) : (
              withdrawalRequests.map((req, i) => (
                <div key={req.id || i} className="flex justify-between items-center bg-white shadow-sm p-3 rounded-lg">
                  <div>
                    <p className="font-medium">₹{req.amount}</p>
                    <p className="text-sm text-gray-500">{formatDate(req.requestDate)}</p>
                  </div>
                  <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${getStatusColor(req.status)}`}>
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
