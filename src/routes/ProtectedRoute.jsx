// 🧩 ProtectedRoute.jsx
// Comments in English only
// حماية المسارات حسب الدور - Route role protection

import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");

  if (!token) {
    // No token → redirect to home
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.Role;

    // ✅ Allow only specific roles
    if (allowedRoles.includes(userRole)) {
      return children;
    } else {
      // Role not allowed → redirect to home
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    console.error("Token decode failed:", err);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
