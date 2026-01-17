import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import Loading from '../components/Loading';

// Redirect unauthenticated users away from protected pages.
const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {setUser} = useContext(UserDataContext);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                setLoading(false)
            }
        })
            .catch(err => {
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (loading) {
        return (
           <Loading/>
        )
    }


    return <>{children}</>;
}

export default UserProtectedWrapper