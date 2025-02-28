import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLabelVerified = localStorage.getItem("isLabelVerified") === "true";

    if (token) {
      setIsAuthenticated(true);

      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate(isLabelVerified ? "/home" : "/label-verification", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
