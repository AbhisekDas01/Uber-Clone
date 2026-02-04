import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';

import { LuLogOut } from "react-icons/lu";

import CaptainsDetails from '../components/CaptainsDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

import { SocketDataContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import { useContext } from 'react';
import { useEffect } from 'react';

import axios from 'axios'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const [ride, setRide] = useState({});

    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const confirmRidePopupPanelRef = useRef(null);

    const { sendMessage, receiveMessage } = useContext(SocketDataContext);
    const { captain } = useContext(CaptainDataContext);

    useEffect(() => {


        if (!captain) return;

        sendMessage('join', { userType: 'captain', userId: captain._id });

        const updateLocation = () => {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => sendMessage('update-location-captain', {
                    userId: captain._id,
                    location: {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        }

        const locationInterval = setInterval(updateLocation, 10000);

        updateLocation();



    }, []);

    receiveMessage('new-ride', (data) => {
        setRide(data);
        setRidePopupPanel(true);

    });

    async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    }

    useGSAP(function () {

        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel]);

    useGSAP(function () {

        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel]);


    return (
        <div className='h-screen'>

            <div className='fixed top-0 p-3 flex items-center justify-between w-full'>
                <img className='w-16' src="Uber_driver_logo.png" alt="" />
                <Link to={'/captain/logout'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <LuLogOut className='text-lg font-bold' />
                </Link>

            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className='h-2/5 p-6'>

                <CaptainsDetails />

            </div>

            <div ref={ridePopupPanelRef} className='fixed z-10 bottom-0 translate-y-full    bg-white px-3 py-6  pt-12 w-full' >

                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            <div ref={confirmRidePopupPanelRef} className='fixed z-10 bottom-0 translate-y-full    bg-white px-3 py-6  pt-12 w-full h-screen' >
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>


        </div>
    )
}

export default CaptainHome