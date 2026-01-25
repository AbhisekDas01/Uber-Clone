import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import FinishRide from '../components/FinishRide';


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidepanel] = useState(false);
    const finishRidePanelRef = useRef(null);


    useGSAP(function () {

        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel]);

    return (
        <div className='h-screen'>

            <div className='fixed top-0 p-3 flex items-center justify-between w-full'>
                <img className='w-16' src="Uber_driver_logo.png" alt="" />
                <Link to={'/captain/logout'} className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <LuLogOut className='text-lg font-bold' />
                </Link>

            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>

            <div 
            className='h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative pt-10'
            onClick={() => setFinishRidepanel(true)}
            >

                <h5 className='absolute top-0 left-0 w-full flex items-center justify-center p-1'><IoIosArrowUp className='text-2xl font-semibold' /></h5>

                <h4 className='text-xl  font-semibold'>4 KM away</h4>

                <button onClick={() => {


                }} className=' bg-green-600 text-white font-semibold p-3 px-11 rounded-lg'>Complete Ride</button>

            </div>

            <div ref={finishRidePanelRef} className='fixed z-10 bottom-0 translate-y-full    bg-white px-3 py-6  pt-12 w-full ' >
                <FinishRide
                    setFinishRidepanel={setFinishRidepanel}
                />
            </div>

        </div>
    )
}

export default CaptainRiding