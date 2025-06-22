import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { MdOutlineWifiPassword } from "react-icons/md";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../App/AuthSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/route/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('Login successful');
        dispatch(authActions.login());
        if (data.role === "admin") {
          navigate("/dashboard");
          console.log("Admin logged in");
        } else {
          navigate("/");
          console.log("User logged in");
        }
        alert('Login successful. Please check your email for confirmation.');

        setInputs({
          email: '',
          password: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      if (err.message === "Email not found, please sign up" || err.message === "Incorrect password") {
        setError(err.message);
      } else {
        setError("Server error");
      }
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center h-dvh items-center bg-blue-100 pt-10 pb-20">
      <div className="rounded-lg p-8 bg-white font-[Chivo]" style={{ width: "500px" }}>
        <div className="items-center flex justify-center pb-8">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <FaEnvelope className="text-[#5F9BCE] mr-2" size={24} />
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="form-input px-2 mt-1 h-10 w-full md:w-[calc(100%-2.5rem)] rounded-lg border-gray-300 border"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="mb-4 flex items-center">
            <MdOutlineWifiPassword className="text-[#5F9BCE] mr-2" size={26} />
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              minLength={8}
              className="form-input px-2 mt-1 w-full md:w-[calc(100%-2.5rem)] h-10 rounded-lg border-gray-300 border"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-blue border-2 border-[text-[#5F9BCE]] mt-4 px-4 py-2 rounded-md hover:text-white hover:bg-[#5F9BCE] focus:outline-none focus:bg-[#5F9BCE] w-full duration-700 ease-in-out"
          >
             {isSubmitting ? "Signing In..." : "Sign In"}
           
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="text-center text-sm mt-2">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600">
              Register here
            </Link>
          </p>
        </div>
      </div>
    
    </div>
  );
}

export default Login;
