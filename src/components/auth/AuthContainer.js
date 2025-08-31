import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthContainer = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = (userData) => {
    onAuthSuccess(userData);
  };

  const handleSignupSuccess = (userData) => {
    onAuthSuccess(userData);
  };

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={switchToSignup}
        />
      ) : (
        <SignupForm
          onSignupSuccess={handleSignupSuccess}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default AuthContainer; 