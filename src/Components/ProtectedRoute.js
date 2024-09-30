import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const role = localStorage.getItem('role'); // Retrieve user role from local storage

    if (!role || !allowedRoles.includes(role)) {
        // If user role is not allowed, redirect to login or unauthorized page
        return <Navigate to="/login" replace />;
    }

    return children; // Render the protected route
};

export default ProtectedRoute;
