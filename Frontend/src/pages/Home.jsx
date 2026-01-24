import React, { useRef, useState } from 'react';
import { GoXCircle } from 'react-icons/go';
import { RiArrowDownWideFill } from "react-icons/ri";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = () => {

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const confirmRidePanelRef = useRef(null);

    const [vehicleFound, setVehicleFound] = useState(false);
    const vehicleFoundRef = useRef(null);

    const [waitingForDriver , setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);

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

    useGSAP(function () {

        if (vehiclePanelOpen) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanelOpen]);

    useGSAP(function () {

        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel]);

    useGSAP(function () {

        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound]);

    useGSAP(function () {

        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver]);

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

                    <LocationSearchPanel
                        setVehiclePanelOpen={setVehiclePanelOpen}

                        setPanelOpen={setPanelOpen}
                    />

                </div>
            </div>

            {/* vehicle panel  */}
            <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-8 pt-12 w-full' >
                <VehiclePanel
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setConfirmRidePanel={setConfirmRidePanel}
                />
            </div>

            {/* confirmed ride  */}
            <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12 w-full' >
                <ConfirmRide 
                setVehicleFound={setVehicleFound}
                setConfirmRidePanel={setConfirmRidePanel} />
            </div>

            {/* looking for ride  */}
            <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12 w-full' >
                <LookingForDriver setVehicleFound={setVehicleFound} />
            </div>

            {/* Waiting for driver  */}
            <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 translate-y-full    bg-white px-3 py-6 pt-12 w-full' >
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver}/>
            </div>
        </div>
    );
};

export default Home;
