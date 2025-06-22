import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { Link } from 'react-router-dom';
import logo from '../../../../../assets/logo.jpg'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset any previous error messages
    setPasswordError('');
    setEmailError('');

    // Perform basic email validation
    if (!username || !username.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Perform password validation
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return; // Prevent form submission if password is invalid
    }

    // Perform login authentication logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    // Reset form fields after successful submission
    setUsername('');
    setPassword('');
  };

  const handleGoogleSignup = () => {
    console.log("Sign in with Google");
    
  };

  const handleFacebookSignup = () => {
    console.log("Sign in with Facebook");
  };


  return (
    <div className="flex justify-center h-full items-center bg-blue-100 pt-10 pb-20">
      <div className=" rounded-lg p-8 bg-white font-[Chivo]" style={{ width: '500px' }}>
       
<div className='items-center flex justify-center pb-8'>
    <img src={logo} alt="Logo" className='w-24 h-24'/>
</div>


        {/* <div className='my-5 h-[1px] bg-[#5F9BCE]' /> */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <FaUserCircle className="text-[#5F9BCE] mr-2" size={24} />
            <input
              type="email"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input px-2 mt-1 h-10 w-full md:w-[calc(100%-2.5rem)] 
              rounded-lg border-gray-300 border"
              placeholder="Email"
              required
            />
          </div>
          {emailError && <p className="text-red-600">{emailError}</p>}
          <div className="mb-4 flex items-center">
            <TbPasswordFingerprint className="text-[#5F9BCE] mr-2" size={26} />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              min={8}
              className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] h-10 rounded-lg border-gray-300 border"
              placeholder="Password"
              required
            />
          </div>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-sm">Remember me</label> 
            <span className="text-sm ml-auto">
              <a href="MyForgetPassword" className='text-red-600'>Forgot password ?</a>
            </span>
          </div>
         
          <button type="submit" className=" text-blue border-2 border-[text-[#5F9BCE]] mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-[#5F9BCE] focus:outline-none focus:bg-[#5F9BCE] w-full duration-700 ease-in-out">SIGN IN</button>
        </form>
        <div className='my-5 h-[1px] bg-[#5F9BCE]' />

        <div className="mt-4 text-center py-4">
          <button className="bg-[#00A2E3] text-white my-2 px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 w-full" onClick={handleGoogleSignup}> Sign up with Google</button>
          <button className="bg-[#3868CD] text-white my-2 px-4 py-2 rounded-md hover:bg-[#5F9BCE] focus:outline-none focus:bg-[#5F9BCE] w-full" onClick={handleFacebookSignup}>Sign up with Facebook</button>
        
        </div>
        <div className='my-5 h-[1px] bg-[#5F9BCE]' />

        <div className="text-center text-sm mt-2">
          <p>Don't have an account? <Link to="/MyRegister" className='text-red-600'>Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login