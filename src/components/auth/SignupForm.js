import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
import { authAPI } from '../../services/api';

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1: form, 2: otp, 3: success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mobileForOtp, setMobileForOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedUserId, setGeneratedUserId] = useState('');
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  // ✅ Validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .required('Name is required'),
    email: Yup.string().email('Please enter a valid email address').nullable(),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
      .required('Mobile number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[a-zA-Z])(?=.*\d).+$/, 'Password must contain at least one letter and one number')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  // ✅ Setup Recaptcha once
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );
    }
  }, []);

  // ✅ Send OTP
  const sendOtp = async (mobile) => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const phoneNumber = `+91${mobile}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setMessage('OTP sent to your mobile number.');
      setMobileForOtp(mobile);
      setStep(2);
    } catch (err) {
      console.error("OTP Error:", err);
      if (err.code === "auth/invalid-app-credential") {
        setError("Firebase config invalid है। .env values और storageBucket check करो।");
      } else if (err.code === "auth/missing-phone-number") {
        setError("Phone number सही format में दो (+91XXXXXXXXXX).");
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    setLoading(true);
    setError('');

    try {
      await window.confirmationResult.confirm(otp);

      // Generate user ID
      const userId = await generateUserId(mobileForOtp);
      setGeneratedUserId(userId);

      // Complete signup
      const response = await authAPI.completeSignup({
        ...formData,
        userId
      });

      if (response.success) {
        setMessage('Account created successfully!');
        setStep(3);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate User ID
  const generateUserId = async (mobileNumber) => {
    try {
      const response = await authAPI.generateUserId({ mobileNumber });
      if (response.success) return response.userId;
      throw new Error(response.message || 'Failed to generate user ID');
    } catch (err) {
      throw err;
    }
  };

  // ✅ Handle Signup Submit
  const handleFormSubmit = async (values) => {
    setFormData(values);
    await sendOtp(values.mobileNumber);
  };

  // ==================== SCREENS ====================

  // Step 3: Success
  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Registration Complete</h2>
            <p className="mt-4 text-lg">
              Your User ID: <span className="font-bold">{generatedUserId}</span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Please note this ID carefully as you'll need it to login.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Proceed to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: OTP Verification
  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div id="recaptcha-container"></div>
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Verify OTP</h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter the 6-digit OTP sent to +91 {mobileForOtp}
            </p>
          </div>

          {message && <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">{message}</div>}
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

          <div className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border rounded-md text-center text-lg tracking-widest"
              inputMode="numeric"
              autoFocus
            />
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={() => sendOtp(mobileForOtp)}
              disabled={loading}
              className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
            >
              Resend OTP
            </button>
            <button
              onClick={() => { setStep(1); setError(''); setMessage(''); }}
              className="w-full py-2 text-indigo-600 hover:text-indigo-800 text-sm"
            >
              ← Back to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Registration Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div id="recaptcha-container"></div>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to your account
            </Link>
          </p>
        </div>

        <Formik
          initialValues={{ name: '', email: '', mobileNumber: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <Field name="name" type="text" placeholder="Your full name"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="name" component="div" className="text-sm text-red-600" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email (optional)</label>
                  <Field name="email" type="email" placeholder="your.email@example.com"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium">Mobile Number</label>
                  <div className="flex mt-1">
                    <span className="px-3 py-2 border bg-gray-50 text-gray-500">+91</span>
                    <Field name="mobileNumber" type="tel" maxLength="10" placeholder="9876543210"
                      className="flex-1 px-3 py-2 border rounded-r-md" />
                  </div>
                  <ErrorMessage name="mobileNumber" component="div" className="text-sm text-red-600" />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <Field name="password" type="password" placeholder="At least 6 characters"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <Field name="confirmPassword" type="password" placeholder="Confirm your password"
                    className="mt-1 block w-full px-3 py-2 border rounded-md" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-600" />
                </div>
              </div>

              {error && <div className="bg-red-50 p-3 text-sm text-red-700 rounded-md">{error}</div>}

              <button
                type="submit"
                disabled={loading || !isValid || !dirty}
                className="w-full py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
