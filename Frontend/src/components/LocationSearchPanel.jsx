import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ suggestions,  setPickup, setDestination, activeField, isLoading }) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }
    // setVehiclePanelOpen(true)
    // setPanelOpen(false)
  }

  const items = Array.isArray(suggestions) ? suggestions : [];

  //to add the loading animation 
  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 mt-4'>
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className='flex items-center gap-4 p-3 animate-pulse'>
            <div className='h-10 w-10 bg-gray-200 rounded-full shrink-0'></div>
            <div className='flex-1 h-10 bg-gray-200 rounded-lg'></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {items.map((elem, idx) => (
        <div
          key={`${idx}-${elem}`}
          onClick={() => handleSuggestionClick(elem)}
          className='flex border-2 border-gray-200 active:border-black rounded-xl items-center gap-2 my-2 justify-start cursor-pointer p-3'
        >
          <h2 className='bg-[#eee] p-3 rounded-full'><FaLocationDot /></h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
      ))}
      {items.length === 0 && (
        <p className='text-sm text-gray-500 px-1 py-2'>No suggestions yet.</p>
      )}
    </>
  )
}

export default LocationSearchPanel