import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../utils';
import '../../src/LabelCodeInput.css'; 



const LabelCodeInput = ({ setIsLabelVerified }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/verify-label", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);

      if (response.ok && data.success) {
        navigate("/home"); 
      } else {
        // setIsLoading(false);
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    
    }
  };

  const handleLogout = (e) => {
    // Clear the token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    // Set localStorage flags to false
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('isLabelVerified', 'false');

    handleSuccess('User Logged out');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="h-full w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Label Code</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Label Code"
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="w-full p-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
          Verify
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      <button onClick={handleLogout} className="mt-4 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
        Logout
      </button>
    </div>

  );
};

export default LabelCodeInput;



