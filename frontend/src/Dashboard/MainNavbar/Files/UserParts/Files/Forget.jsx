import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../../assets/logo.jpg'

function Forget() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform basic email validation
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Clear any existing email error
    setEmailError('');

    // Send password reset email logic here
    console.log('Email sent to:', email);

    // Reset form fields and show success message
    setEmail('');

    setIsEmailSent(true);
  };

  return (
    <div className="flex justify-center bg-blue-100 h-full pt-10 pb-20 items-center font-[Chivo]">
      <div className="rounded-lg p-8 items-center bg-white" style={{ width: '500px' }}>
      
      <div className=' items-center flex justify-center pb-8'>
<img src={logo} alt="Logo" className='w-24 h-24'/>
</div>

        <form onSubmit={handleSubmit}>
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
            {emailError && <p className="text-red-600 mt-1">{emailError}</p>}
          </div>
          <button type="submit" className=" text-[#5F9BCE] border-2 border-[#5F9BCE] mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-[#5F9BCE]  w-full duration-700 ease-in-out">SUBMIT</button>
        </form>
        {isEmailSent && <p className="text-green-600 mt-4">An email with instructions to reset your password has been sent to {email}.</p>}
        <div className="text-center text-sm mt-4">
          <p>Remember your password? <Link to="/MyLogin" className="text-[#5F9BCE]">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
}


export default Forget