import React, { useState } from 'react';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { MdOutlineWifiPassword } from "react-icons/md";
import logo from '../../../../../assets/logo.jpg'
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setError('');

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Agree Terms:', agreeTerms);

    // Reset form fields after submission
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreeTerms(false);
  };

  const handleGoogleSignup = () => {
    console.log("Sign up with Google");
  };

  const handleFacebookSignup = () => {
    console.log("Sign up with Facebook");
  };

  return (
    <div className='bg-blue-100 p-1'>
      <div className="flex justify-center h-full items-center pt-10 pb-20">
        <div className="bg-white rounded-lg p-10 shadow-md" style={{ width: '600px' }}>
        
<div className='items-center flex justify-center'>
    <img src={logo} alt="Logo" className='w-24 h-24'/>
</div>


          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className='my-5 h-[1px] ' />
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <FaUser className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] rounded-lg border border-gray-300 h-12" // Adjusted height
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaEnvelope className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] border rounded-lg border-gray-300 h-12" // Adjusted height
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <MdOutlineWifiPassword className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="password"
                id="password"
                name="password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input mt-1 px-2 w-full md:w-[calc(100%-2.5rem)] border rounded-lg border-gray-300 h-12" // Adjusted height
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <MdOutlineWifiPassword className="text-[#5F9BCE] mr-2" size={24} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] border rounded-lg border-gray-300 h-12" // Adjusted height
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agreeTerms" className="text-sm">I agree to the terms and conditions</label>
            </div>
            <button type="submit" className="bg-white text-[#5F9BCE] border-2 border-[#5F9BCE] mt-4 px-4 py-2 rounded-md hover:bg-[#5F9BCE] focus:outline-none hover:text-white w-full">Sign Up</button>
          </form>
      

          <div className="mt-1 text-center py-4">
            <button className="bg-[#00A2E3] text-white my-2 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full" onClick={handleGoogleSignup}> Sign up with Google</button>
            <button className="bg-[#3868CD] text-white my-2 px-4 py-2 rounded-md hover:bg-[#5F9BCE] focus:outline-none focus:bg-[#5F9BCE] w-full" onClick={handleFacebookSignup}>Sign up with Facebook</button>
        
          </div>

          <div className="text-center text-sm mt-2">
          <p>Already have account? <Link to="/MyLogin" className='text-red-600'>Sign in</Link></p>
        </div>


        </div>

      


      </div>
    </div>
  );
}



export default Register