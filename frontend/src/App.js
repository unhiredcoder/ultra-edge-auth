import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import LabelCodeInput from "./pages/LabelCodeInput";

const ProtectedRoute = ({ element }) => {

  const isAuthenticated = localStorage.getItem("token") ? true : false;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/label-verification" element={<ProtectedRoute element={<LabelCodeInput/>} />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />
      </Routes>
    </div>
  );
}

export default App;




// import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Home from './pages/Home';
// import { useState } from 'react';
// import RefrshHandler from './RefrshHandler';
// import LabelCodeInput from './pages/LabelCodeInput';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLabelVerified, setIsLabelVerified] = useState(false);

//   const PrivateRoute = ({ element }) => {
//     return isAuthenticated ? element : <Navigate to="/login" />;
//   };

//   const LabelCodeRoute = ({ element }) => {
//     return isAuthenticated ? (isLabelVerified ? element : <Navigate to="/label-verification" />) : <Navigate to="/login" />;
//   };

//   return (
//     <div className="App">
//       <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/label-verification" element={<LabelCodeInput />}/>
//         <Route path="/home" element={<LabelCodeRoute element={<Home />} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

