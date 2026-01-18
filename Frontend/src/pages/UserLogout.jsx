import axios from 'axios';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const UserLogout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    toast.success(response.data.message || 'Logged out');
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                const message =
                    error.response?.data?.message || 'Logout failed';
                toast.error(message);
                navigate('/login', { replace: true });
            }
        };

        logout();
    }, [navigate, token]);

    return <Loading />;
};

export default UserLogout;
