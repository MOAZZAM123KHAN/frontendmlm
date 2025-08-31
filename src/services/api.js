// import axios from 'axios';
// import { API_URL } from '../config';

// const API_BASE_URL = API_URL;

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken') || localStorage.getItem('token'); // ✅ support both
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error('Unauthorized - redirect to login');
//     } else if (error.response?.status === 404) {
//       console.error('Resource not found');
//     } else if (error.response?.status === 500) {
//       console.error('Server error');
//     }
//     return Promise.reject(error);
//   }
// );

// // ================= AUTH API =================
// export const authAPI = {
//   login: async (data) => {
//     try {
//       const response = await api.post('/auth/login', data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Login failed' };
//     }
//   },
//   signup: async (data) => {
//     try {
//       const response = await api.post('/auth/signup', data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Signup failed' };
//     }
//   },
//   generateUserId: async (mobileNumber) => {
//     try {
//       const response = await api.post('/auth/generate-user-id', { mobileNumber });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to generate user ID' };
//     }
//   },
//   completeSignup: async (userData) => {
//     try {
//       const response = await api.post('/auth/complete-signup', userData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to complete signup' };
//     }
//   },
//   getDashboard: async (parentMobile) => {
//     try {
//       const response = await api.get(`/auth/dashboard/${parentMobile}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to get user data' };
//     }
//   },
//   verifyOtp: async (mobileNumber, otp) => {
//     try {
//       const response = await api.post('/auth/verify-otp', { mobileNumber, otp });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'OTP verification failed' };
//     }
//   },
//   resendOtp: async (mobileNumber) => {
//     try {
//       const response = await api.post('/auth/resend-otp', { mobileNumber });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to resend OTP' };
//     }
//   }
// };

// // ================= SYSTEM API =================
// export const systemAPI = {
//   healthCheck: async () => {
//     try {
//       const response = await api.get('/health');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Health check failed' };
//     }
//   }
// };

// // ================= PRODUCT API =================
// export const productAPI = {
//   createProduct: async (data) => {
//     try {
//       const response = await api.post('/product', data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to create product' };
//     }
//   },
//   assignProduct: async (id, assignedTo) => {
//     try {
//       const response = await api.patch(`/product/${id}/assign`, { assignedTo });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to assign product' };
//     }
//   },
//   getProducts: async (userId) => {
//     try {
//       const response = await api.get('/product', { params: userId ? { userId } : {} });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to get products' };
//     }
//   }
// };

// // ================= ORDER API =================
// export const orderAPI = {
//   createOrder: async (data) => {
//     try {
//       const response = await api.post('/order', data);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to create order' };
//     }
//   },
//   updateOrderStatus: async (id, statusData) => {
//     try {
//       const response = await api.patch(`/order/${id}/status`, statusData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to update order status' };
//     }
//   },
//   updatePaymentStatus: async (id, paymentStatus) => {
//     try {
//       const response = await api.patch(`/order/${id}/payment-status`, { paymentStatus });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to update payment status' };
//     }
//   },
//   getOrders: async (userId) => {
//     try {
//       const response = await api.get('/order', { params: userId ? { userId } : {} });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to get orders' };
//     }
//   },
//   getOrderById: async (orderId) => {
//     try {
//       const response = await api.get(`/order/${orderId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to get order details' };
//     }
//   }
// };

// // ================= WALLET API (from your first snippet) =================

// // ================= WALLET API =================
// export const walletAPI = {
//   /**
//    * Get user wallet
//    */
//   getUserWallet: async (userId) => {
//     try {
//       const response = await api.get(`/wallet/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: "Failed to fetch wallet" };
//     }
//   },

//   /**
//    * Get withdrawal history for a user
//    */
//   getUserWithdrawalRequests: async (userId) => {
//     try {
//       const response = await api.get(`/wallet/withdrawal-requests/user/${userId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: "Failed to fetch withdrawals" };
//     }
//   },

//   /**
//    * Submit withdrawal request
//    */
//   requestWithdrawal: async (userId, amount, formData) => {
//     try {
//       const response = await api.post(`/wallet/withdrawal-requests`, {
//         userId,
//         amount,
//         ...formData,
//       });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: "Withdrawal request failed" };
//     }
//   },
// };


// // ================= DOWNLINE API =================
// export const downlineAPI = {
//   assignDownline: async (userId, parentId, level) => {
//     try {
//       const response = await api.post('/downline/assign', { userId, parentId, level });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to assign downline' };
//     }
//   },
//   getDownline: async (userId) => {
//     try {
//       const response = await api.get('/downline', { params: { userId } });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { success: false, message: 'Failed to get downline' };
//     }
//   }
// };

// export default api;  



import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ================= Interceptors =================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) console.error("Unauthorized - redirect to login");
    if (status === 404) console.error("Resource not found");
    if (status === 500) console.error("Server error");
    return Promise.reject(error.response?.data || error);
  }
);

// ================= AUTH API =================
export const authAPI = {
  login: (data) => api.post("/auth/login", data).then((res) => res.data),
  signup: (data) => api.post("/auth/signup", data).then((res) => res.data),
  generateUserId: (mobileNumber) =>
    api.post("/auth/generate-user-id", { mobileNumber }).then((res) => res.data),
  completeSignup: (userData) =>
    api.post("/auth/complete-signup", userData).then((res) => res.data),
  getDashboard: (parentMobile) =>
    api.get(`/auth/dashboard/${parentMobile}`).then((res) => res.data),
  verifyOtp: (mobileNumber, otp) =>
    api.post("/auth/verify-otp", { mobileNumber, otp }).then((res) => res.data),
  resendOtp: (mobileNumber) =>
    api.post("/auth/resend-otp", { mobileNumber }).then((res) => res.data),
};

// ================= SYSTEM API =================
export const systemAPI = {
  healthCheck: () => api.get("/health").then((res) => res.data),
};

// ================= PRODUCT API =================
export const productAPI = {
  createProduct: (data) => api.post("/products", data).then((res) => res.data),
  assignProduct: (id, assignedTo) =>
    api.patch(`/product/${id}/assign`, { assignedTo }).then((res) => res.data),
  getProducts: (userId) =>
    api.get("/products", { params: userId ? { userId } : {} }).then((res) => res.data),
};

// ================= ORDER API =================
// export const orderAPI = {
//   createOrder: (data) => api.post("/order", data).then((res) => res.data),
//   updateOrderStatus: (id, statusData) =>
//     api.patch(`/order/${id}/status`, statusData).then((res) => res.data),
//   updatePaymentStatus: (id, paymentStatus) =>
//     api.patch(`/order/${id}/payment-status`, { paymentStatus }).then((res) => res.data),
//   getOrders: (userId) =>
//     api.get("/order", { params: userId ? { userId } : {} }).then((res) => res.data),
//   getOrderById: (orderId) =>
//     api.get(`/order/${orderId}`).then((res) => res.data),
// };

export const orderAPI = {
  createOrder: (data) => api.post("/orders", data).then(res => res.data), // works for normal user now
  updateOrderStatus: (id, statusData) => api.patch(`/orders/${id}/status`, statusData).then(res => res.data),
  updatePaymentStatus: (id, paymentStatus) => api.patch(`/orders/${id}/payment-status`, { paymentStatus }).then(res => res.data),
  getOrders: (userId) => api.get("/orders", { params: userId ? { userId } : {} }).then(res => res.data),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`).then(res => res.data)
};


// ================= WALLET API =================
export const walletAPI = {
  getUserWallet: (userId) =>
    api.get(`/wallet/user/${userId}`).then((res) => res.data),

  getUserWithdrawalRequests: (userId) =>
    api.get(`/wallet/withdrawal-requests/user/${userId}`).then((res) => res.data),

  requestWithdrawal: (userId, amount, formData) =>
    api.post(`/wallet/withdrawal-requests`, { userId, amount, ...formData })
       .then((res) => res.data),
};

// ================= DOWNLINE API =================
export const downlineAPI = {
  assignDownline: (userId, parentId, level) =>
    api.post("/downline/assign", { userId, parentId, level }).then((res) => res.data),

  getDownline: (userId) =>
    api.get("/downline", { params: { userId } }).then((res) => res.data),
};

export default api;

