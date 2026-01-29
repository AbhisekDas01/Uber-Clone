import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ suggestions, setVehiclePanelOpen, setPanelOpen, setPickup, setDestination, activeField }) => {

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