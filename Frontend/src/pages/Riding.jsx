import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketDataContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import LiveTracking from '../components/LiveTracking';


const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketDataContext)
    const navigate = useNavigate()

    useEffect(() => {

        if (!socket) return;

        socket.on("ride-ended", () => {
            navigate('/home')
        })

    }, [socket, navigate])


    return (
        <div className='h-screen'>
            <Link to={'/home'} className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 right-2'>
                <FaHome className='text-lg font-bold' />
            </Link>
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between p-5'>
                    <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h2 className='text-xl font-semibold -my-1'>{ride?.captain.vehicle.plate}</h2>
                        <p className='text-sm text-gray-600 capitalize'>{ride?.captain.vehicle.vehicleType}</p>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-2'>
                    <div className='w-full mt-2'>
                        <div className='flex items-center justify-start gap-5 p-3'>
                            <FaMapLocation className='text-xl' />
                            <div>
                                <h3 className='text-lg font-medium'>{ride?.destination.split(",")[0]}</h3>
                                <p className='text-sm text-grey-600'>{ride?.destination?.split(",").splice(1).join(", ")}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
                            <HiCurrencyRupee className='text-xl' />
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                                <p className='text-sm text-grey-600'>Cash pay</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg my-2'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding