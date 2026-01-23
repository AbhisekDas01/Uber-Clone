import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Riding = () => {
    return (
        <div className='h-screen'>

            <Link to={'/home'} className='fixed h-10 w-10 bg-white flex items-center justify-center rounded-full top-2 right-2'>
                <FaHome className='text-lg font-bold' />
            </Link>

            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between p-5'>
                    <img className='h-12' src="/Uber_car.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Abhisek Das</h2>
                        <h2 className='text-xl font-semibold -my-1'>OD-050-345353</h2>
                        <p className='text-sm text-gray-600'>Suzuki baleno</p>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-2'>

                    <div className='w-full mt-2'>
                       

                        <div className='flex items-center justify-start gap-5 p-3'>
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
                </div>
                <button className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg my-2'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding