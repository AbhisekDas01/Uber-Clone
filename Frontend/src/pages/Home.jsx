import React, { useRef, useState } from 'react';
import { GoXCircle } from 'react-icons/go';
import { FaUser } from "react-icons/fa";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import LocationPanel from '../components/LocationPanel';

const Home = () => {

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);

    const submitHandler = async (e) => {
        e.preventDefault();

    }

    useGSAP(function () {

        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                opacity: 1,
                padding: 24
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                opacity: 0,
                padding: 0
            })
        }
    }, [panelOpen]);

    return (
        <div className='h-screen relative overflow-hidden'>
            <img
                className="w-16 absolute left-5 top-5"
                src="./Uber_logo.png"
                alt="Uber logo"
            />

            <div className='h-screen w-screen'>
                {/**Image for temp use */}
                <img
                    className='h-full w-full object-cover'
                    src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*gwMx05pqII5hbfmX.gif"
                    alt="Map img"
                />
            </div>

            <div className='flex h-screen flex-col justify-end absolute top-0 w-full '>

                {/**input field */}
                <div className='h-[30%] p-5 bg-white relative'>
                    {panelOpen ? (
                        <RiArrowDownWideFill
                            className='text-2xl cursor-pointer'
                            onClick={() => setPanelOpen(false)}
                        />
                    ) : (
                        <h4 className='text-2xl font-semibold'>Find a trip</h4>

                    )}
                    <form onSubmit={(e) => { submitHandler(e) }} className="relative">
                        <div className="line absolute h-16 w-1 bg-gray-900 top-[22%] left-5 rounded-full"></div>
                        <div className="bg-[#eeeeee] my-3 rounded-lg px-4 py-3  w-full flex items-center justify-between">
                            <input
                                required
                                className="bg-transparent w-full outline-none text-base pl-4"
                                type="text"
                                value={pickup}
                                onChange={(e) => setPickup(e.target.value)}
                                onClick={(e) => setPanelOpen(true)}
                                placeholder="Add a pick-up location"
                            />
                            {pickup.length > 0 && (
                                <GoXCircle
                                    className="cursor-pointer"
                                    onClick={() => setPickup("")}
                                />
                            )}
                        </div>
                        <div className="bg-[#eeeeee] my-3 rounded-lg px-4 py-3  w-full flex items-center justify-between">
                            <input
                                required
                                className="bg-transparent w-full outline-none text-base pl-4"
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onClick={(e) => setPanelOpen(true)}
                                placeholder="Enter your destination"
                            />
                            {destination.length > 0 && (
                                <GoXCircle
                                    className="cursor-pointer"
                                    onClick={() => setDestination("")}
                                />
                            )}
                        </div>

                    </form>
                </div>


                {/**Location suggestion */}
                <div ref={panelRef} className='bg-white h-0 opacity-0'>

                    <LocationPanel />

                </div>
            </div>

            <div className='fixed z-10 bottom-0  bg-white px-3 py-6 w-full' >
                <h3 className='text-2xl font-semibold mb-5'>Choose a Ride</h3>
                <div className="border-2 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                    <img className='h-12' src="/Uber_car.png" alt="" />
                    <div className='ml-2 w-1/2'>
                        <h4 className='flex items-center gap-2 font-medium text-lg'>UberGo <span className='flex items-center gap-1'><FaUser />4</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable , compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹193.20</h2>
                </div>

                <div className="border-2 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                    <img className='h-12' src="/Uber_bike.png" alt="" />
                    <div className='-ml-2 w-1/2'>
                        <h4 className='flex items-center gap-2 font-medium text-lg'>Moto <span className='flex items-center gap-1'><FaUser />1</span></h4>
                        <h5 className='font-medium text-sm'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable motercycle rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹56</h2>
                </div>

                <div className="border-2 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                    <img className='h-12' src="/Uber_auto.png" alt="" />
                    <div className='-ml-2 w-1/2'>
                        <h4 className='flex items-center gap-2 font-medium text-lg'>UberAuto <span className='flex items-center gap-1'><FaUser />3</span></h4>
                        <h5 className='font-medium text-sm'>3 mins away</h5>
                        <p className='font-normal text-xs text-gray-600'>Affordable motercycle rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹56</h2>
                </div>


            </div>
        </div>
    );
};

export default Home;
