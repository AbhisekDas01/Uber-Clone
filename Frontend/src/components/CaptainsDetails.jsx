import React , {useContext} from 'react'
import { MdSpeed } from "react-icons/md";
import { MdOutlineEventNote } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import {CaptainDataContext} from '../context/CaptainContext';

const CaptainsDetails = () => {

    const { captain }  = useContext(CaptainDataContext);


    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>₹360.3</h4>
                    <p className='text-sm font-medium text-gray-600'>Earned</p>
                </div>
            </div>

            <div className='flex justify-center items-start gap-5 p-3 mt-8 bg-gray-100 rounded-xl'>
                <div className='text-center flex flex-col items-center justify-start'>
                    <IoMdTime className='text-3xl mb-2 font-thin ' />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className='text-center flex flex-col items-center justify-start'>
                    <MdSpeed className='text-3xl mb-2  font-thin ' />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>

                <div className='text-center flex flex-col items-center justify-start'>
                    <MdOutlineEventNote className='text-3xl mb-2 font-thin ' />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainsDetails