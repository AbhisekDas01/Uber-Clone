import React from 'react'
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";


const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
  return (
    <>
      <div className='flex items-center justify-between py-2'>
        <h3 className='text-2xl font-semibold mb-5'>Waiting for Driver</h3>
        <h5 onClick={() => { setWaitingForDriver(false) }} className='cursor-pointer font-semibold bg-gray-200 rounded-full flex gap-1 items-center  p-2 text-center text-sm text-gray-700'>Leave now<RiArrowDownWideFill width={10} /></h5>
      </div>

      

      <div className='flex items-center justify-between p-5'>
        <img className='h-12' src="/Uber_car.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}</h2>
          <h2 className='text-xl font-semibold -my-1'>{ride?.captain.vehicle.plate}</h2>
          <p className='text-sm text-gray-600'>{ride?.captain.vehicle.vehicleType}</p>
        </div>
      </div>

      <div className='flex flex-col justify-between items-center gap-2'>

        <div className='w-full mt-5'>
          <div className='flex items-center justify-start gap-5 p-3 '>
            <FaLocationDot className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>{ride?.pickup.split(",")[0]}</h3>
              <p className='text-sm text-grey-600'>{ride?.pickup.split(",").splice(1).join(", ")}</p>
            </div>
          </div>

          <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
            <FaMapLocation className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>{ride?.destination.split(",")[0]}</h3>
              <p className='text-sm text-grey-600'>{ride?.destination.split(",").splice(1).join(", ")}</p>
            </div>
          </div>

          <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
            <HiCurrencyRupee className='text-xl' />
            <div >
              <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
              <p className='text-sm text-grey-600'>Cash pay</p>
            </div>
          </div>

          <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-400'>
            <span className='text-sm font-semibold bg-gray-800 text-white px-3 py-1 rounded'>OTP</span>
            <div>
              <h3 className='text-lg font-medium tracking-widest'>{ride?.otp || '------'}</h3>
              <p className='text-sm text-grey-600'>Share this with your captain to start the trip</p>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default WaitingForDriver