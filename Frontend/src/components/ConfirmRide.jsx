import React from 'react'
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";

const ConfirmRide = ({ setConfirmRidePanel, setVehicleFound , fare , pickup , destination , vehicleType, createRide }) => {

  const vehicleLogos = {
    car: '/Uber_car.png',
    moto: '/Uber_bike.png',
    auto: '/Uber_auto.png'
  }
  return (
    <>
      <div className='flex items-center justify-between py-2'>

        <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
        <h5 onClick={() => { setConfirmRidePanel(false) }} className='cursor-pointer font-semibold bg-gray-200 rounded-full flex gap-1 items-center  p-2 text-center text-sm text-gray-700'>Leave now<RiArrowDownWideFill width={10} /></h5>
      </div>

      <div className='flex flex-col justify-between items-center gap-2'>
        <img className='h-20' src={vehicleLogos[vehicleType]} alt="" />

        <div className='w-full mt-5'>
          <div className='flex items-center justify-start gap-5 p-3 '>
            <FaLocationDot className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>{pickup.split(',')[0]}</h3>
              <p className='text-sm text-grey-600'>{pickup.split(',').splice(1).join(', ')}</p>
            </div>
          </div>

          <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
            <FaMapLocation className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>{destination.split(',')[0]}</h3>
              <p className='text-sm text-grey-600'>{destination.split(',').splice(1).join(", ")}</p>
            </div>
          </div>

          <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
            <HiCurrencyRupee className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>₹{fare}</h3>
              <p className='text-sm text-grey-600'>Cash pay</p>
            </div>
          </div>
        </div>

        <button onClick={() => {
          setVehicleFound(true);
          createRide(vehicleType);
          
        }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5'>Confirm</button>
      </div>


    </>
  )
}

export default ConfirmRide