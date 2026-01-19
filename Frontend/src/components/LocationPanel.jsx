import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

const LocationPanel = () => {
  return (
    <>
    <div className='flex  items-center gap-2 my-2 justify-start cursor-pointer py-2'>
        <h2 className='bg-[#eee] p-3 rounded-full'><FaLocationDot /></h2>
        <h4 className='font-medium'>24B, Infocity Square , Trident lane , Pratyush Nadiawala </h4>
    </div>
    
    </>
  )
}

export default LocationPanel