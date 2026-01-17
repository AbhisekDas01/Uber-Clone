import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

const CaptainLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {

        if (!token) {
            navigate('/captain-login', { replace: true });
            return;
        }

        const logout = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    toast.success(response.data.message || "Logged out");
                    navigate('/captain-login', { replace: true });
                }
            } catch (err) {
                const message = err.response?.data?.message || "Logout failed";
                toast.error(message);
                navigate('/captain-login', { replace: true });
            }
        }

        logout();

    }, [token, navigate]);

    return (
        <Loading />
    )
}

export default CaptainLogout;