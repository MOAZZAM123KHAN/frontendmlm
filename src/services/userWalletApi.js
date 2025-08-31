// // // // // // // // src/services/userWalletApi.js
// // // // // // // import axios from "axios";

// // // // // // // const API_URL = "http://localhost:5001/api/wallet";
// // // // // // // const TOKEN_KEY = "userToken";

// // // // // // // const userWalletAPI = axios.create({ baseURL: API_URL });

// // // // // // // userWalletAPI.interceptors.request.use((config) => {
// // // // // // //   const token = localStorage.getItem(TOKEN_KEY);
// // // // // // //   if (token) config.headers.Authorization = `Bearer ${token}`;
// // // // // // //   return config;
// // // // // // // });

// // // // // // // export default {
// // // // // // //   getWallet: async (userId) => {
// // // // // // //     const res = await userWalletAPI.get(`/user/${userId}`);
// // // // // // //     return res.data;
// // // // // // //   },
// // // // // // //   getWithdrawals: async (userId) => {
// // // // // // //     const res = await userWalletAPI.get(`/withdrawals/${userId}`);
// // // // // // //     return res.data;
// // // // // // //   },
// // // // // // //   requestWithdrawal: async (userId, amount, bankDetails) => {
// // // // // // //     const res = await userWalletAPI.post(`/withdraw`, {
// // // // // // //       userId,
// // // // // // //       amount,
// // // // // // //       ...bankDetails,
// // // // // // //     });
// // // // // // //     return res.data;
// // // // // // //   },
// // // // // // // };



// // // // // // // src/services/userWalletApi.js
// // // // // // import axios from "axios";

// // // // // // const API_URL = "http://localhost:5001/api/wallet";
// // // // // // const TOKEN_KEY = "authToken";

// // // // // // // axios instance
// // // // // // const userWalletAPI = axios.create({ baseURL: API_URL });

// // // // // // // har request ke header me token inject karega
// // // // // // userWalletAPI.interceptors.request.use((config) => {
// // // // // //   const token = localStorage.getItem(TOKEN_KEY);
// // // // // //   if (token) config.headers.Authorization = `Bearer ${token}`;
// // // // // //   return config;
// // // // // // });

// // // // // // export default {
// // // // // //   // GET wallet data
// // // // // //   getWallet: async () => {
// // // // // //     const userId =
// // // // // //       localStorage.getItem("selectedUserId") ||
// // // // // //       JSON.parse(localStorage.getItem("activeUser") || "{}").userId;

// // // // // //     const res = await userWalletAPI.get(`/user/${userId}`);
// // // // // //     return res.data;
// // // // // //   },

// // // // // //   // GET withdrawals
// // // // // //   getWithdrawals: async () => {
// // // // // //     const userId =
// // // // // //       localStorage.getItem("selectedUserId") ||
// // // // // //       JSON.parse(localStorage.getItem("activeUser") || "{}").userId;

// // // // // //     const res = await userWalletAPI.get(`/withdrawals/${userId}`);
// // // // // //     return res.data;
// // // // // //   },

// // // // // //   // POST withdrawal request
// // // // // //   requestWithdrawal: async (amount, bankDetails) => {
// // // // // //     const userId =
// // // // // //       localStorage.getItem("selectedUserId") ||
// // // // // //       JSON.parse(localStorage.getItem("activeUser") || "{}").userId;

// // // // // //     const res = await userWalletAPI.post(`/withdraw`, {
// // // // // //       userId,
// // // // // //       amount,
// // // // // //       ...bankDetails,
// // // // // //     });
// // // // // //     return res.data;
// // // // // //   },
// // // // // // };



// // // // // // src/services/userWalletApi.js
// // // // // import axios from "axios";

// // // // // const API_URL = "http://localhost:5001/api/wallet";

// // // // // // axios instance
// // // // // const userWalletAPI = axios.create({ baseURL: API_URL });

// // // // // // helper to get token from multiple possible keys
// // // // // const getToken = () => {
// // // // //   const keys = ["authToken", "token", "userToken"];
// // // // //   for (let key of keys) {
// // // // //     const val = localStorage.getItem(key);
// // // // //     if (val) return val;
// // // // //   }
// // // // //   return null;
// // // // // };

// // // // // // har request ke header me token inject karega
// // // // // userWalletAPI.interceptors.request.use((config) => {
// // // // //   const token = getToken();
// // // // //   if (token) config.headers.Authorization = `Bearer ${token}`;
// // // // //   return config;
// // // // // });

// // // // // // helper to get current userId (selected or active)
// // // // // const getUserId = () => {
// // // // //   return (
// // // // //     localStorage.getItem("selectedUserId") ||
// // // // //     JSON.parse(localStorage.getItem("activeUser") || "{}").userId
// // // // //   );
// // // // // };

// // // // // export default {
// // // // //   // GET wallet data
// // // // //   getWallet: async () => {
// // // // //     const userId = getUserId();
// // // // //     const res = await userWalletAPI.get(`/user/${userId}`);
// // // // //     return res.data;
// // // // //   },

// // // // //   // GET withdrawals
// // // // //   getWithdrawals: async () => {
// // // // //     const userId = getUserId();
// // // // //     const res = await userWalletAPI.get(`/withdrawals/${userId}`);
// // // // //     return res.data;
// // // // //   },

// // // // //   // POST withdrawal request
// // // // //   requestWithdrawal: async (amount, bankDetails) => {
// // // // //     const userId = getUserId();
// // // // //     const res = await userWalletAPI.post(`/withdraw`, {
// // // // //       userId,
// // // // //       amount,
// // // // //       ...bankDetails,
// // // // //     });
// // // // //     return res.data;
// // // // //   },
// // // // // };



// // // // import axios from "axios";

// // // // const API = axios.create({
// // // //   baseURL: "http://localhost:5001/api/wallet",
// // // // });

// // // // // 🟢 Add token to every request
// // // // API.interceptors.request.use(
// // // //   (config) => {
// // // //     const token = localStorage.getItem("authToken"); // ✅ same key as LoginForm
// // // //     if (token) {
// // // //       config.headers.Authorization = `Bearer ${token}`;
// // // //       console.log("👉 Attached token:", token); // debug
// // // //     } else {
// // // //       console.warn("⚠️ No token found in localStorage!");
// // // //     }
// // // //     return config;
// // // //   },
// // // //   (error) => Promise.reject(error)
// // // // );

// // // // // ✅ Wallet APIs
// // // // export const getUserWallet = (userId) => API.get(`/user/${userId}`);
// // // // export const getUserWithdrawals = (userId) => API.get(`/withdrawals/${userId}`);
// // // // export const requestWithdrawal = (userId, amount) =>
// // // //   API.post(`/withdraw/${userId}`, { amount });

// // // // export default API;



// // // import axios from "axios";

// // // const API = axios.create({
// // //   baseURL: "http://localhost:5001/api/wallet",
// // // });

// // // // 🟢 Add token to every request
// // // API.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem("authToken"); 
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // // ✅ Wallet APIs
// // // export const getWallet = (userId) => API.get(`/user/${userId}`);
// // // export const getWithdrawals = (userId) => API.get(`/withdrawals/${userId}`);
// // // export const requestWithdrawal = (userId, formData) =>
// // //   // API.post(`/withdraw/${userId}`, formData);
// // //  API.post(`/withdraw`, { userId, ...formData });
// // // export default {
// // //   getWallet,
// // //   getWithdrawals,
// // //   requestWithdrawal,
// // // };


// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:5001/api/wallet",
// // });

// // // 🟢 Add token to every request
// // API.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");  // 🔥 yahan "authToken" ki jagah "token"
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // ✅ Wallet APIs
// // export const getWallet = (userId) => API.get(`/user/${userId}`);
// // export const getWithdrawals = (userId) => API.get(`/withdrawals/${userId}`);
// // export const requestWithdrawal = (userId, formData) =>
// //   API.post(`/withdraw/${userId}`, formData);

// // export default {
// //   getWallet,
// //   getWithdrawals,
// //   requestWithdrawal,
// // };


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5001/api/wallet", // ✅ backend ke sath exact match
// });

// // 🟢 Attach token automatically
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // ✅ Sirf "token" use ho
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       console.warn("⚠️ No token found in localStorage!");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Wallet APIs

// // Get wallet details
// export const getWallet = async (userId) => {
//   try {
//     const res = await API.get(`/user/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ getWallet error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// // Get withdrawal history
// export const getWithdrawals = async (userId) => {
//   try {
//     const res = await API.get(`/withdrawals/${userId}`);
//     return res.data;
//   } catch (err) {
//     console.error("❌ getWithdrawals error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// // Submit withdrawal request (⚠️ userId body me bhejna hoga)
// export const requestWithdrawal = async (formData) => {
//   try {
//     const res = await API.post(`/withdraw`, formData); // ✅ backend ko sirf body me userId chahiye
//     return res.data;
//   } catch (err) {
//     console.error("❌ requestWithdrawal error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// export default {
//   getWallet,
//   getWithdrawals,
//   requestWithdrawal,
// };



import axios from "axios";

const API_URL = "http://localhost:5001/api/wallet";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("⚠️ No token found in localStorage!");
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const userWalletAPI = {
  getWallet: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ getWallet error:", error.response?.data || error.message);
      throw error;
    }
  },

  getWithdrawals: async (userId) => {
    try {
      const res = await axios.get(`${API_URL}/withdrawals/${userId}`, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ getWithdrawals error:", error.response?.data || error.message);
      throw error;
    }
  },

  requestWithdrawal: async (userId, data) => {
    try {
      const res = await axios.post(`${API_URL}/withdraw/${userId}`, data, {
        headers: getAuthHeaders(),
      });
      return res;
    } catch (error) {
      console.error("❌ requestWithdrawal error:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default userWalletAPI;
