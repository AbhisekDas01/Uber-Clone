import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { Link } from 'react-router-dom';

const FinishRide = ({ setFinishRidepanel }) => {
    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover border-2 border-white' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-xl font-medium'>Abhisek Das</h2>
                </div>
                <h5 className='text-lg font-bold text-gray-900 bg-white/30 px-2 py-1 rounded'>2.5 KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2'>

                <div className='w-full mt-5'>
                    <div className='flex items-center justify-start gap-5 p-3 '>
                        <IoLocationOutline className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-grey-500'>Jnv Jagatsinghpur, Odisha</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <FaRegMap className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm text-grey-500'>Jnv Jagatsinghpur, Odisha</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <LuIndianRupee className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>₹195</h3>
                            <p className='text-sm text-grey-500'>Cash pay</p>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-6'>

                    {/* otp field  */}

                    <Link to={'/captain-home'} className='flex items-center justify-center text-lg w-full bg-green-600 text-white font-semibold p-2 rounded-lg '>Finish Ride</Link>



                </div>
            </div>

        </div>
    )
}

export default FinishRide