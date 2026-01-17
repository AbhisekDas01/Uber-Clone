import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import Loading from '../components/Loading';


const CaptainProtectWrapper = ({children}) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {captain , setCaptain} = useContext(CaptainDataContext);
    const [loading , setLoading] = useState(true);

    useEffect(() =>{

        if(!token) {
            navigate('/captain-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
    
            if(response.status === 200) {
                setCaptain(response.data.captain);
                setLoading(false);
            }
        }).catch(err => {
            localStorage.removeItem('token');
            navigate('/captain-login');
        })

    } , [token]);

    if (loading) {
        return (
            <Loading/>
        )
    }

  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectWrapper