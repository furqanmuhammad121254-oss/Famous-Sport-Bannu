import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import api from '../services/api';

function PublicRoutes() {
    const ProtectedRoute = ({ children, allowRole }) => {
        const { user } = useAuth(); // Your auth logic/context

        if (!user) return <Navigate to="/home" />;
        if (user.role !== allowRole) return <Navigate to="/" />;

        return children;
    };
}

export default PublicRoutes


