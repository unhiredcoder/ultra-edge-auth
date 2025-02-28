import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        fullname: '',
        email: '',
        mobile: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { fullname, email, mobile, password } = signupInfo;
        
        if (!fullname || !email || !mobile || !password) {
            return handleError('Full name, email, mobile, and password are required');
        }

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                console.log("🚀 ~ handleSignup ~ error:", error)
                handleError(error?.details?.[0]?.message);
            } else {
                handleError(message);
            }

        } catch (err) {
            console.log("🚀 ~ handleSignup ~ err:", err)
            handleError(err.message);
        }
    };

    return (
        <div className="h-full w-screen flex items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Signup</h1>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="fullname" className="block text-lg text-gray-700 mb-2">Full Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="fullname"
                  autoFocus
                  placeholder="Enter your full name..."
                  value={signupInfo.fullname}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={signupInfo.email}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile" className="block text-lg text-gray-700 mb-2">Mobile</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="mobile"
                  placeholder="Enter your mobile number..."
                  value={signupInfo.mobile}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-lg text-gray-700 mb-2">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  value={signupInfo.password}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Signup
              </button>
              <p className="mt-4 text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-500 hover:underline">
                  Login
                </Link>
              </p>
            </form>
            <ToastContainer />
          </div>
        </div>
      );
}

export default Signup;
