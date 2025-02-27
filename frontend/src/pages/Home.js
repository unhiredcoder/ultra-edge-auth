import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        // Clear the token and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        // Set localStorage flags to false
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('isLabelVerified', 'false');

        setTimeout(() => {
            navigate('/login');
        }, 1000);
        handleSuccess('User Logged out');

    };

    return (
        <div className="H-FULL w-screen flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Welcome, {loggedInUser}!</h1>
                <p className="text-lg text-gray-600 text-center mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel congue
                    ullamcorper, velit libero consequat orci, eget efficitur augue nisl nec tortor.
                </p>

                <div className="text-center">
                    <button
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 mb-4"
                    >
                        Logout
                    </button>

                    <p className="text-sm text-gray-500">
                        We hope you had a great experience. If you need anything, feel free to reach out.
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Home
