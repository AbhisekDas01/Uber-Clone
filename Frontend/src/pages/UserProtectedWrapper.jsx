import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Redirect unauthenticated users away from protected pages.
const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            toast.error("Please login first!");
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    if (!token) return null;

    return <>{children}</>;
}

export default UserProtectedWrapper