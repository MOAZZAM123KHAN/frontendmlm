import axios from "axios";

// const API_URL = "http://localhost:5001/api/wallet";
const API_URL = `${process.env.REACT_APP_API_URL}/wallet`;

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

  // requestWithdrawal: async (userId, data) => {
  //   try {
  //     const res = await axios.post(`${API_URL}/withdraw/${userId}`, data, {
  //       headers: getAuthHeaders(),
  //     });
  //     return res;
  //   } catch (error) {
  //     console.error("❌ requestWithdrawal error:", error.response?.data || error.message);
  //     throw error;
  //   }
  // },

  requestWithdrawal: async (data) => { // remove userId from param
    try {
        const res = await axios.post(`${API_URL}/withdraw`, data, { 
            headers: getAuthHeaders()
        });
        return res.data;
    } catch (error) {
        console.error("❌ requestWithdrawal error:", error.response?.data || error.message);
        throw error;
    }
},

};

export default userWalletAPI;


