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


