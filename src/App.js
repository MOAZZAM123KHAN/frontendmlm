// import React, { useState, useEffect, createContext } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
//   NavLink,
// } from "react-router-dom";

// import "./App.css";
// import "./styles/components.css";

// import AuthContainer from "./components/auth/AuthContainer";
// import UserDashboard from "./components/dashboard/UserDashboard";
// import Home from "./pages/Home";
// import Shop from "./pages/Shop";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./components/ecommerce/Checkout";
// import ProductDetails from "./components/ecommerce/ProductDetails";
// import ShoppingCart from "./components/ecommerce/ShoppingCart";
// import Orders from "./components/ecommerce/Orders";
// import Wallet from "./components/dashboard/Wallet";
// import ForgotPassword from "./pages/ForgotPassword";

// import { CartProvider } from "./components/ecommerce/CartContext";

// export const ActiveUserContext = createContext();

// const navLinks = [
//   { to: "", label: "Home" },
//   { to: "shop", label: "Shop" },
//   { to: "about", label: "About" },
//   { to: "contact", label: "Contact" },
//   { to: "cart", label: "Cart" },
//   { to: "orders", label: "Orders" },
//   { to: "wallet", label: "Wallet" },
// ];

// // ✅ User App Layout
// const UserApp = ({ activeUser, onSwitchUser }) => (
//   <ActiveUserContext.Provider value={{ activeUser, onSwitchUser }}>
//     <div>
//       <header
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: 16,
//         }}
//       >
//         <div>
//           <b>User:</b> {activeUser.userId} | <b>Mobile:</b>{" "}
//           {activeUser.parentMobile}
//         </div>
//         <button
//           onClick={onSwitchUser}
//           style={{
//             background: "#f44336",
//             color: "#fff",
//             border: "none",
//             borderRadius: 4,
//             padding: "8px 16px",
//           }}
//         >
//           Switch User
//         </button>
//       </header>

//       {/* Navigation */}
//       <nav
//         style={{
//           display: "flex",
//           gap: 16,
//           padding: 16,
//           background: "#f5f5f5",
//           borderBottom: "1px solid #eee",
//         }}
//       >
//         {navLinks.map((link) => (
//           <NavLink
//             key={link.to}
//             to={
//               link.to === ""
//                 ? `/user/${activeUser.userId}`
//                 : `/user/${activeUser.userId}/${link.to}`
//             }
//             end={link.to === ""}
//             style={({ isActive }) => ({
//               color: isActive ? "#1976d2" : "#333",
//               fontWeight: isActive ? "bold" : "normal",
//               textDecoration: "none",
//               padding: "8px 12px",
//               borderRadius: 4,
//               background: isActive ? "#e3f2fd" : "transparent",
//             })}
//           >
//             {link.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Routes */}
//       <div style={{ padding: 24 }}>
//         <Routes>
//           <Route path="" element={<Home />} />
//           <Route path="shop" element={<Shop />} />
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="products/:id" element={<ProductDetails />} />
//           <Route path="cart" element={<ShoppingCart />} />
//           <Route path="checkout" element={<Checkout />} />
//           <Route path="orders" element={<Orders />} />
//           <Route path="wallet" element={<Wallet />} />
//           <Route path="forgot-password" element={<ForgotPassword />} />
//           <Route path="*" element={<Navigate to="" />} />
//         </Routes>
//       </div>
//     </div>
//   </ActiveUserContext.Provider>
// );

// // ✅ Main App Wrapper
// function AppWrapper() {
//   const navigate = useNavigate();
//   const [authData, setAuthData] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("authData");
//     const storedActive = localStorage.getItem("activeUser");

//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         setAuthData(parsed);
//         setIsAuthenticated(true);
//       } catch {
//         localStorage.removeItem("authData");
//       }
//     }

//     if (storedActive) {
//       try {
//         const parsed = JSON.parse(storedActive);
//         setActiveUser(parsed);
//       } catch {
//         localStorage.removeItem("activeUser");
//       }
//     }
//   }, []);

//   // ✅ Login Success
//   // const handleAuthSuccess = (data) => {
//   //   setAuthData(data);
//   //   setIsAuthenticated(true);
//   //   setActiveUser(null);
//   //   localStorage.setItem("authData", JSON.stringify(data));
//   // };
//   // ✅ Login Success
// const handleAuthSuccess = (data) => {
//   setAuthData(data);
//   setIsAuthenticated(true);
//   setActiveUser(null);
//   localStorage.setItem("authData", JSON.stringify(data));

//   // 🔥 Token ko alag save karo
//   if (data.token) {
//     localStorage.setItem("token", data.token);
//   }
// };


//   // ✅ Logout
//   // const handleLogout = () => {
//   //   setAuthData(null);
//   //   setIsAuthenticated(false);
//   //   setActiveUser(null);
//   //   localStorage.removeItem("authData");
//   //   localStorage.removeItem("activeUser");
//   //   localStorage.removeItem("userToken");
//   //   localStorage.removeItem("userId");
//   // };
//    // ✅ Logout
// const handleLogout = () => {
//   setAuthData(null);
//   setIsAuthenticated(false);
//   setActiveUser(null);
//   localStorage.removeItem("authData");
//   localStorage.removeItem("activeUser");
//   localStorage.removeItem("token"); // ✅ yeh important hai
// };



//   // ✅ Switch User
//   const handleSwitchUser = () => {
//     setActiveUser(null);
//     localStorage.removeItem("activeUser");
//     navigate("/dashboard");
//   };

//   // ✅ User Select
//   const handleUserIdSelect = (userId) => {
//     const userInfo = {
//       userId,
//       parentMobile: authData?.parentMobile || authData?.mobileNumber,
//     };
//     setActiveUser(userInfo);
//     localStorage.setItem("activeUser", JSON.stringify(userInfo));
//     navigate(`/user/${userId}`);
//   };

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AuthContainer onAuthSuccess={handleAuthSuccess} />
//           )
//         }
//       />
//       <Route
//         path="/auth"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/dashboard" />
//           ) : (
//             <AuthContainer onAuthSuccess={handleAuthSuccess} />
//           )
//         }
//       />
//       <Route
//         path="/dashboard"
//         element={
//           isAuthenticated ? (
//             <UserDashboard
//               userData={authData}
//               onLogout={handleLogout}
//               onUserIdSelect={handleUserIdSelect}
//             />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//       <Route
//         path="/user/:userId/*"
//         element={
//           activeUser ? (
//             <CartProvider userId={activeUser.userId}>
//               <UserApp activeUser={activeUser} onSwitchUser={handleSwitchUser} />
//             </CartProvider>
//           ) : (
//             <Navigate to="/dashboard" />
//           )
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// // ✅ Root App
// function App() {
//   return (
//     <Router>
//       <CartProvider>
//         <AppWrapper />
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;



import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink,
} from "react-router-dom";

import "./App.css";
import "./styles/components.css";

import AuthContainer from "./components/auth/AuthContainer";
import UserDashboard from "./components/dashboard/UserDashboard";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./components/ecommerce/Checkout";
import ProductDetails from "./components/ecommerce/ProductDetails";
import ShoppingCart from "./components/ecommerce/ShoppingCart";
import Orders from "./components/ecommerce/Orders";
import Wallet from "./components/dashboard/Wallet";
import ForgotPassword from "./pages/ForgotPassword";

import { CartProvider } from "./components/ecommerce/CartContext"; // ✅ Correct path

export const ActiveUserContext = createContext();

const navLinks = [
  { to: "", label: "Home" },
  { to: "shop", label: "Shop" },
  { to: "about", label: "About" },
  { to: "contact", label: "Contact" },
  { to: "cart", label: "Cart" },
  { to: "orders", label: "Orders" },
  { to: "wallet", label: "Wallet" },
];

// ✅ User App Layout
const UserApp = ({ activeUser, onSwitchUser }) => (
  <ActiveUserContext.Provider value={{ activeUser, onSwitchUser }}>
    <div>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
        }}
      >
        <div>
          <b>User:</b> {activeUser.userId} | <b>Mobile:</b>{" "}
          {activeUser.parentMobile}
        </div>
        <button
          onClick={onSwitchUser}
          style={{
            background: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "8px 16px",
          }}
        >
          Switch User
        </button>
      </header>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          gap: 16,
          padding: 16,
          background: "#f5f5f5",
          borderBottom: "1px solid #eee",
        }}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={
              link.to === ""
                ? `/user/${activeUser.userId}`
                : `/user/${activeUser.userId}/${link.to}`
            }
            end={link.to === ""}
            style={({ isActive }) => ({
              color: isActive ? "#1976d2" : "#333",
              fontWeight: isActive ? "bold" : "normal",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: 4,
              background: isActive ? "#e3f2fd" : "transparent",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Routes */}
      <div style={{ padding: 24 }}>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="" />} />
        </Routes>
      </div>
    </div>
  </ActiveUserContext.Provider>
);

// ✅ Main App Wrapper
function AppWrapper() {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("authData");
    const storedActive = localStorage.getItem("activeUser");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthData(parsed);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("authData");
      }
    }

    if (storedActive) {
      try {
        const parsed = JSON.parse(storedActive);
        setActiveUser(parsed);
      } catch {
        localStorage.removeItem("activeUser");
      }
    }
  }, []);

  // ✅ Login Success
  const handleAuthSuccess = (data) => {
    setAuthData(data);
    setIsAuthenticated(true);
    setActiveUser(null);
    localStorage.setItem("authData", JSON.stringify(data));

    // 🔥 Token ko alag save karo
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    setAuthData(null);
    setIsAuthenticated(false);
    setActiveUser(null);
    localStorage.removeItem("authData");
    localStorage.removeItem("activeUser");
    localStorage.removeItem("token"); // ✅ yeh important hai
  };

  // ✅ Switch User
  const handleSwitchUser = () => {
    setActiveUser(null);
    localStorage.removeItem("activeUser");
    navigate("/dashboard");
  };

  // ✅ User Select
  const handleUserIdSelect = (userId) => {
    const userInfo = {
      userId,
      parentMobile: authData?.parentMobile || authData?.mobileNumber,
    };
    setActiveUser(userInfo);
    localStorage.setItem("activeUser", JSON.stringify(userInfo));
    navigate(`/user/${userId}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <AuthContainer onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <UserDashboard
              userData={authData}
              onLogout={handleLogout}
              onUserIdSelect={handleUserIdSelect}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/user/:userId/*"
        element={
          activeUser ? (
            <CartProvider userId={activeUser.userId}>
              <UserApp activeUser={activeUser} onSwitchUser={handleSwitchUser} />
            </CartProvider>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

// ✅ Root App
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;