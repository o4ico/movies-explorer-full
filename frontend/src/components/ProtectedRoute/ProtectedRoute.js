import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggiedIn, children }) {
  if (!isLoggiedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;