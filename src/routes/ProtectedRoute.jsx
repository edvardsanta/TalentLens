import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  console.log(user)
  if (user == undefined || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


export default ProtectedRoute;