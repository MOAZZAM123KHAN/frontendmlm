
// import axios from "axios";
// import { API_URL } from "../config";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // ================= Interceptors =================
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken") || localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     if (status === 401) console.error("Unauthorized - redirect to login");
//     if (status === 404) console.error("Resource not found");
//     if (status === 500) console.error("Server error");
//     return Promise.reject(error.response?.data || error);
//   }
// );

// // ================= AUTH API =================
// export const authAPI = {
//   login: async (data) => {
//     try {
//       // Normalize input
//       const payload = {};
//       if (data.userId) payload.userId = data.userId.trim().toLowerCase();
//       if (data.mobileNumber) payload.mobileNumber = data.mobileNumber.trim();
//       else if (data.parentMobile) payload.mobileNumber = data.parentMobile.trim();
//       payload.password = data.password;

//       const response = await api.post("/auth/login", payload, {
//         headers: { "Content-Type": "application/json" },
//       });
//       return response.data;
//     } catch (err) {
//       console.error("Login API error:", err.response?.data || err.message);
//       throw err.response?.data || err;
//     }
//   },

//   signup: (data) => api.post("/auth/signup", data).then((res) => res.data),

//   generateUserId: (mobileNumber) =>
//     api.post("/auth/generate-user-id", { mobileNumber: mobileNumber.trim() }).then((res) => res.data),

//   completeSignup: (userData) =>
//     api.post("/auth/complete-signup", userData).then((res) => res.data),

//   getDashboard: (parentMobile) =>
//     api.get(`/auth/dashboard/${parentMobile.trim()}`).then((res) => res.data),

//   verifyOtp: (mobileNumber, otp) =>
//     api.post("/auth/verify-otp", { mobileNumber: mobileNumber.trim(), otp }).then((res) => res.data),

//   resendOtp: (mobileNumber) =>
//     api.post("/auth/resend-otp", { mobileNumber: mobileNumber.trim() }).then((res) => res.data),
// };

// // ================= SYSTEM API =================
// export const systemAPI = {
//   healthCheck: () => api.get("/health").then((res) => res.data),
// };

// // ================= PRODUCT API =================
// export const productAPI = {
//   createProduct: (data) => api.post("/products", data).then((res) => res.data),
//   assignProduct: (id, assignedTo) =>
//     api.patch(`/product/${id}/assign`, { assignedTo }).then((res) => res.data),
//   getProducts: (userId) =>
//     api.get("/products", { params: userId ? { userId } : {} }).then((res) => res.data),
// };

// // ================= ORDER API =================
// export const orderAPI = {
//   createOrder: (data) => api.post("/orders", data).then((res) => res.data),
//   updateOrderStatus: (id, statusData) =>
//     api.patch(`/orders/${id}/status`, statusData).then((res) => res.data),
//   updatePaymentStatus: (id, paymentStatus) =>
//     api.patch(`/orders/${id}/payment-status`, { paymentStatus }).then((res) => res.data),
//   getOrders: (userId) =>
//     api.get("/orders", { params: userId ? { userId } : {} }).then((res) => res.data),
//   getOrderById: (orderId) => api.get(`/orders/${orderId}`).then((res) => res.data),
// };

// // ================= WALLET API =================
// export const walletAPI = {
//   getUserWallet: (userId) => api.get(`/wallet/user/${userId}`).then((res) => res.data),

//   getUserWithdrawalRequests: (userId) =>
//     api.get(`/wallet/withdrawal-requests/user/${userId}`).then((res) => res.data),

//   requestWithdrawal: (userId, amount, formData) =>
//     api.post(`/wallet/withdrawal-requests`, { userId, amount, ...formData }).then((res) => res.data),
// };

// // ================= DOWNLINE API =================
// export const downlineAPI = {
//   assignDownline: (userId, parentId, level) =>
//     api.post("/downline/assign", { userId, parentId, level }).then((res) => res.data),

//   getDownline: (userId) =>
//     api.get("/downline", { params: { userId } }).then((res) => res.data),
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
  login: async (data) => {
    try {
      const payload = {};
      if (data.userId) payload.userId = data.userId.trim().toLowerCase();
      if (data.mobileNumber) payload.mobileNumber = data.mobileNumber.trim();
      else if (data.parentMobile) payload.mobileNumber = data.parentMobile.trim();
      payload.password = data.password;

      const response = await api.post("/auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (err) {
      console.error("Login API error:", err.response?.data || err.message);
      throw err.response?.data || err;
    }
  },

  signup: (data) => api.post("/auth/signup", data).then((res) => res.data),

  generateUserId: (mobileNumber) =>
    api.post("/auth/generate-user-id", { mobileNumber: mobileNumber.trim() }).then((res) => res.data),

  completeSignup: (userData) =>
    api.post("/auth/complete-signup", userData).then((res) => res.data),

  getDashboard: (parentMobile) =>
    api.get(`/auth/dashboard/${parentMobile.trim()}`).then((res) => res.data),

  verifyOtp: (mobileNumber, otp) =>
    api.post("/auth/verify-otp", { mobileNumber: mobileNumber.trim(), otp }).then((res) => res.data),

  resendOtp: (mobileNumber) =>
    api.post("/auth/resend-otp", { mobileNumber: mobileNumber.trim() }).then((res) => res.data),
};

// ================= SYSTEM API =================
export const systemAPI = {
  healthCheck: () => api.get("/health").then((res) => res.data),
};

// ================= PRODUCT API =================

// ================= PRODUCT API =================
export const productAPI = {
  // Create product (admin only)
  createProduct: (data) =>
    api.post("/admin/products", data).then((res) => res.data),

  // Assign product (admin only)
  assignProduct: (id, assignedTo) =>
    api.patch(`/admin/products/${id}/assign`, { assignedTo }).then((res) => res.data),

  // Get products (user side)
  getProducts: (userId) =>
    api.get("/admin/products", { params: userId ? { userId } : {} }).then((res) => res.data),
};



// ================= ORDER API =================
export const orderAPI = {
  createOrder: (data) => api.post("/orders", data).then((res) => res.data),
  updateOrderStatus: (id, statusData) =>
    api.patch(`/orders/${id}/status`, statusData).then((res) => res.data),
  updatePaymentStatus: (id, paymentStatus) =>
    api.patch(`/orders/${id}/payment-status`, { paymentStatus }).then((res) => res.data),
  getOrders: (userId) =>
    api.get("/orders", { params: userId ? { userId } : {} }).then((res) => res.data),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`).then((res) => res.data),
};

// ================= WALLET API =================
export const walletAPI = {
  getUserWallet: (userId) => api.get(`/wallet/user/${userId}`).then((res) => res.data),

  getUserWithdrawalRequests: (userId) =>
    api.get(`/wallet/withdrawal-requests/user/${userId}`).then((res) => res.data),

  requestWithdrawal: (userId, amount, formData) =>
    api.post(`/wallet/withdrawal-requests`, { userId, amount, ...formData }).then((res) => res.data),
};

// ================= DOWNLINE API =================
export const downlineAPI = {
  assignDownline: (userId, parentId, level) =>
    api.post("/downline/assign", { userId, parentId, level }).then((res) => res.data),

  getDownline: (userId) =>
    api.get("/downline", { params: { userId } }).then((res) => res.data),
};

export default api;

