

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../../../../assets/logo.jpg';

function Forget() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: Verify Code, 3: New Password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !email.includes('@')) {
      setMessage('❌ Please enter a valid email address');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Verification code sent to ${email}`);
        setStep(2);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error. Try again later.');
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/verify-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, resetCode: code }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Code verified! Proceed to reset password');
        setStep(3);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error. Try again later.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          verificationCode: Number(code),
          newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Password reset successful! Redirecting...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error. Try again later.');
    }
  };

  return (
    <div className="flex justify-center bg-blue-100 min-h-screen px-6 pt-10 pb-20 items-center font-[Chivo]">
      <div className="rounded-lg p-8 bg-white" style={{ width: '500px' }}>
        <div className='items-center flex justify-center pb-8'>
          <img src={logo} alt="Logo" className='w-24 h-24' />
        </div>

        <h2 className="text-2xl mb-4 text-center font-bold">
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Verify Code'}
          {step === 3 && 'Set New Password'}
        </h2>

        {message && (
          <p className={`text-center mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 text-gray-600">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input px-2 mt-1 w-full h-10 rounded-lg border-gray-300 border"
                placeholder="Enter your email address"
                required
              />
            </div>
            <button
              type="submit"
              className="text-[#5F9BCE] border-2 border-[#5F9BCE] mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-[#5F9BCE] w-full duration-700 ease-in-out"
            >
              Submit
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit}>
            <div className="mb-4">
              <label htmlFor="code" className="block mb-1 text-gray-600">Verification Code</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-input px-2 mt-1 w-full h-10 rounded-lg border-gray-300 border"
                placeholder="Enter the code sent to your email"
                required
              />
            </div>
            <button
              type="submit"
              className="text-[#5F9BCE] border-2 border-[#5F9BCE] mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-[#5F9BCE] w-full duration-700 ease-in-out"
            >
              Verify Code
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
                minLength={8}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
                minLength={8}
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Forget;
