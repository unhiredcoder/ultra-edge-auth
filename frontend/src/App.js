import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import LabelCodeInput from "./pages/LabelCodeInput"; 
import { useState } from "react";
import RefrshHandler from "./RefrshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const LabelVerificationRoute = ({ element }) => {
    const isLabelVerified = localStorage.getItem("isLabelVerified") === "true";
    return isAuthenticated ? (isLabelVerified ? element : <Navigate to="/label-verification" />) : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/label-verification" element={<PrivateRoute element={<LabelCodeInput />} />} />
        <Route path="/home" element={<LabelVerificationRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
