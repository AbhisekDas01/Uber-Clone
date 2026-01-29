import React from 'react'
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const VehiclePanel = ({ setVehiclePanelOpen, setConfirmRidePanel , fare }) => {

    const {auto , moto , car} = fare;
    return (
        <>
            <div className='flex items-center justify-between py-2'>

                <h3 className='text-2xl font-semibold mb-5'>Choose a Ride</h3>
                <h5 onClick={() => { setVehiclePanelOpen(false) }} className='cursor-pointer font-semibold bg-gray-200 rounded-full flex gap-1 items-center  p-2 text-center text-sm text-gray-700'>Leave now<RiArrowDownWideFill width={10} /></h5>
            </div>

            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    setVehiclePanelOpen(false);
                }}
                className="border-2 border-gray-200 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                <img className='h-12' src="/Uber_car.png" alt="" />
                <div className='ml-2 w-1/2'>
                    <h4 className='flex items-center gap-2 font-medium text-lg'>UberGo <span className='flex items-center gap-1'><FaUser />4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable , compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{car || '--'}</h2>
            </div>

            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    setVehiclePanelOpen(false);
                }}
                className="border-2 border-gray-200 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                <img className='h-12' src="/Uber_bike.png" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='flex items-center gap-2 font-medium text-lg'>Moto <span className='flex items-center gap-1'><FaUser />1</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motercycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{moto || '--'}</h2>
            </div>

            <div
                onClick={() => {
                    setConfirmRidePanel(true);
                    setVehiclePanelOpen(false);
                }}
                className="border-2 border-gray-200 active:border-black rounded-xl flex items-center justify-between w-full p-3 mb-2">
                <img className='h-12' src="/Uber_auto.png" alt="" />
                <div className='-ml-2 w-1/2'>
                    <h4 className='flex items-center gap-2 font-medium text-lg'>UberAuto <span className='flex items-center gap-1'><FaUser />3</span></h4>
                    <h5 className='font-medium text-sm'>3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable motercycle rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹{auto || '--'}</h2>
            </div>
        </>
    )
}

export default VehiclePanel