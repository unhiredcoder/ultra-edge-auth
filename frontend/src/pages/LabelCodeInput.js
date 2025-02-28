import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils"; 
import { ToastContainer } from "react-toastify";


const LabelCodeInput = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/verify-label`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      console.log("🚀 ~ handleSubmit ~ data:", data);

      if (response.status === 403) {
        setIsBlocked(true); // ✅ User is blocked, show blocked UI
        return;
      }

      if (response.ok && data.success) {
        localStorage.setItem("isLabelVerified", "true");
        navigate("/home", { replace: true });
      } else {
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
  
          setTimeout(() => {
              navigate('/login');
          }, 1000);
          handleSuccess('User Logged out');
  
      };
  

  if (isBlocked) {
    return (
      <div className="h-full w-screen flex flex-col items-center justify-center min-h-screen bg-white-100 p-6">
        <img src="https://img.freepik.com/free-vector/tiny-people-standing-near-prohibited-gesture-isolated-flat-illustration_74855-11132.jpg?semt=ais_hybrid" alt="Blocked" className="w-1/2 h-1/2 mb-6" />
        <h2 className="text-3xl font-bold text-red-600">Access Blocked</h2>
        <p className="text-lg text-gray-700 mt-2">Too many failed attempts. Please contact support.</p>
        <button onClick={handleLogout}>Logout</button>
                <ToastContainer />
      </div>
      
    );
  }

  return (
    <div className="h-full w-screen flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Enter Label Code</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <input
          type="number"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Label Code"
          required
          className="w-full p-3 mb-4 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button type="submit" className="w-full p-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600  capitalize focus:outline-none">
          Verify
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default LabelCodeInput;
