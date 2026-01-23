import React from 'react'
import { RiArrowDownWideFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import { FaMapLocation } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";


const WaitingForDriver = ({setWaitingForDriver}) => {
  return (
    <>
      <div className='flex items-center justify-between py-2'>
        <h5 onClick={() => { setWaitingForDriver(false)  }} className='cursor-pointer font-semibold bg-gray-200 rounded-full flex gap-1 items-center  p-2 text-center text-sm text-gray-700'>Leave now<RiArrowDownWideFill width={10} /></h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center pb-2'>
        <div className='w-full h-1 bg-gray-200 rounded-full overflow-hidden'>
          <div className='h-full bg-black w-[40%] animate-linear-loading rounded-full'></div>
        </div>
      </div>

      <div className='flex items-center justify-between p-5'>
        <img className='h-12' src="/Uber_car.png" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium'>Abhisek Das</h2>
          <h2 className='text-xl font-semibold -my-1'>OD-050-345353</h2>
          <p className='text-sm text-gray-600'>Suzuki baleno</p>
        </div>
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
      </div>


    </>
  )
}

export default WaitingForDriver