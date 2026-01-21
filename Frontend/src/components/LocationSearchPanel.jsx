import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({setPanelOpen , setVehiclePanelOpen}) => {
  // sample array for locations 
  const locations = [
    "24B, Infocity Square, Trident lane, Pratyush Nadiawala",
    "15A, Downtown Avenue, City Center, John Doe",
    "7C, Riverside Park, Lakeview Road, Jane Smith",
    "101, Tech Park, Silicon Valley, Elon Musk"
  ];

  return (
    <>
      {locations.map((location, idx) => (
        <div key={idx} onClick={() => {setVehiclePanelOpen(true); setPanelOpen(false)}} className='flex border-2 border-gray-200 active:border-black rounded-xl  items-center gap-2 my-2 justify-start cursor-pointer p-3'>
          <h2 className='bg-[#eee] p-3 rounded-full'><FaLocationDot /></h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
      ))}
    </>
  )
}

export default LocationSearchPanel