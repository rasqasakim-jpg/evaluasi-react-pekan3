import React, { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!user && location.pathname === "/checkout" && !hasAlerted.current) {
      alert("kamu harus login untuk mengakses halaman checkout");
      hasAlerted.current = true;
    }
  }, [user, location.pathname]);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
