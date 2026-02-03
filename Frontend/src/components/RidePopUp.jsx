import React, { useState } from 'react'

import { IoLocationOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";


const RidePopUp = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride }) => {



    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover border-2 border-white' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-xl font-medium'>{ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname} </h2>
                </div>
                <h5 className='text-lg font-bold text-gray-900 bg-white/30 px-2 py-1 rounded'>{} KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2'>

                <div className='w-full mt-5'>
                    <div className='flex items-center justify-start gap-5 p-3 '>
                        <IoLocationOutline className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>{ride.pickup?.split(',')[0]}</h3>
                            <p className='text-sm text-grey-500'>{ride.pickup?.split(",").splice(1).join(", ")}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <FaRegMap className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>{ride.destination?.split(',')[0]}</h3>
                            <p className='text-sm text-grey-500'>{ride.destination?.split(',').splice(1).join(", ")}</p>
                        </div>
                    </div>


                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <LuIndianRupee className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
                            <p className='text-sm text-grey-500'>Cash pay</p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full items-center justify-between mt-5'>
                    <button onClick={() => {

                        setRidePopupPanel(false)
                    }} className=' bg-gray-300 text-black font-semibold p-3 px-11 rounded-lg'>Ignore</button>
                    <button onClick={() => {
                        
                        setConfirmRidePopupPanel(true);

                    }} className=' bg-green-600 text-white font-semibold p-3 px-11 rounded-lg'>Accept</button>


                </div>
            </div>

        </div>
    )
}

export default RidePopUp