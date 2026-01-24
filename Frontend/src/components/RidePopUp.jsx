import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";

const RidePopUp = ({ setRidePopupPanel }) => {



    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-xl font-medium'>Abhisek Das</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.5 KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2'>

                <div className='w-full mt-5'>
                    <div className='flex items-center justify-start gap-5 p-3 '>
                        <FaLocationDot className='text-xl' />
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-grey-600'>Jnv Jagatsinghpur, Odisha</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
                        <FaMapLocation className='text-xl' />
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-grey-600'>Jnv Jagatsinghpur, Odisha</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
                        <HiCurrencyRupee className='text-xl' />
                        <div >
                            <h3 className='text-lg font-medium'>₹195</h3>
                            <p className='text-sm text-grey-600'>Cash pay</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => {


                }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5'>Confirm</button>

                <button onClick={() => {

                    setRidePopupPanel(false)
                }} className='w-full bg-gray-300 text-black font-semibold p-2 rounded-lg mt-1'>Ignore</button>
            </div>

        </div>
    )
}

export default RidePopUp