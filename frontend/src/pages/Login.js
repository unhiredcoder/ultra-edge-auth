import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };
    console.log(process.env.REACT_APP_BACKEND_URL);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required');
        }

        

        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, fullname, error } = result; 

            if (success) {
                handleSuccess(message);
                // setTimeout(() => {
                    navigate('/label-verification');
                // }, 1000);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', fullname); 
            } else if (error) {
                handleError(error?.details?.[0]?.message || message);
            } else {
                handleError(message);
            }

            console.log(result);
        } catch (err) {
            handleError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="h-full w-screen flex items-center justify-center min-h-screen bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={loginInfo.email}
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
                  value={loginInfo.password}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Login
              </button>
              <p className="mt-4 text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-green-500 hover:underline">
                  Signup
                </Link>
              </p>
            </form>
            <ToastContainer />
          </div>
        </div>
      );
    };

export default Login;
