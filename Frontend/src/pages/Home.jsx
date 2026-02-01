import React, { useRef, useState } from 'react';
import { GoXCircle } from 'react-icons/go';
import { RiArrowDownWideFill, RiH5 } from 'react-icons/ri';
import { useGSAP } from '@gsap/react';
import axios from 'axios';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { toast } from 'react-hot-toast'


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

    const [waitingForDriver, setWaitingForDriver] = useState(false);
    const waitingForDriverRef = useRef(null);

    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fare, setFare] = useState({});
    const [vehicleType, setVehicleType] = useState('');

    //to hold a 300 ms delay in searches
    const pickupTimer = useRef(null);
    const destinationTimer = useRef(null);

    const fetchSuggestions = async (value, setter) => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
                {
                    params: { input: value },
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            const descriptions = Array.isArray(response.data)
                ? response.data.map((item) => item.description ?? '').filter(Boolean)
                : [];
            setter(descriptions);
        } catch (error) {
            console.error('Failed to fetch suggestions', error?.response || error);
            setter([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePickupChange = (e) => {
        const value = e.target.value;
        setPickup(value);

        // Avoid 400s from backend validation for short inputs
        if (value.trim().length < 3) {
            if (pickupTimer.current) clearTimeout(pickupTimer.current);
            setPickupSuggestions([]);
            return;
        }
        if (pickupTimer.current) clearTimeout(pickupTimer.current);
        pickupTimer.current = setTimeout(() => fetchSuggestions(value, setPickupSuggestions), 300);
    };

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);

        // Avoid 400s from backend validation for short inputs
        if (value.trim().length < 3) {
            if (destinationTimer.current) clearTimeout(destinationTimer.current);
            setDestinationSuggestions([]);
            return;
        }
        if (destinationTimer.current) clearTimeout(destinationTimer.current);
        destinationTimer.current = setTimeout(() => fetchSuggestions(value, setDestinationSuggestions), 300);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
    };

    useGSAP(function () {

        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
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
                transform: 'translateY(0)',
                display: 'block'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)',
                display: 'none'
            })
        }
    }, [confirmRidePanel]);

    useGSAP(function () {

        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)',
                display: 'block'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)',
                display: 'none'
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

    async function findTrip() {
        setVehiclePanelOpen(true);
        setPanelOpen(false);

        try {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup: pickup, destination: destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status == 200) {
                setFare(response.data);
            }
        } catch (error) {

            toast.error('Error while loading fare!')
            setFare({});
        }


    }

    async function createRide(vehicleType) {

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response);



        } catch (error) {

        }

    }

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
                <div className='h-[37%] p-5 bg-white relative'>
                    <div className='flex items-center justify-between'>
                        <h4 className='text-2xl font-semibold'>Find a trip</h4>
                        {panelOpen && <h5 onClick={() => setPanelOpen(false)} className='text-sm flex items-center justify-center gap-2 font-semibold bg-gray-200 p-1 px-2 rounded-full'>Close  <RiArrowDownWideFill
                            className='text-2xl cursor-pointer'

                        /></h5>}
                    </div>
                    <form onSubmit={submitHandler} className="relative">
                        <div className="line absolute h-16 w-1 bg-gray-900 top-[22%] left-5 rounded-full"></div>
                        <div className="bg-[#eeeeee] my-3 rounded-lg px-4 py-3  w-full flex items-center gap-2 justify-between">
                            <input
                                required
                                className="bg-transparent w-full outline-none text-base font-semibold pl-4"
                                type="text"
                                value={pickup}
                                onChange={handlePickupChange}
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('pickup');
                                }}
                                placeholder="Add a pick-up location"
                            />
                            {pickup.length > 0 && (
                                <GoXCircle
                                    className="cursor-pointer"
                                    onClick={() => setPickup('')}
                                />
                            )}
                        </div>
                        <div className="bg-[#eeeeee] my-3 rounded-lg px-4 py-3  w-full flex items-center gap-2 justify-between">
                            <input
                                required
                                className="bg-transparent w-full outline-none text-base pl-4 font-semibold"
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                onClick={() => {
                                    setPanelOpen(true);
                                    setActiveField('destination');
                                }}
                                placeholder="Enter your destination"
                            />
                            {destination.length > 0 && (
                                <GoXCircle
                                    className="cursor-pointer"
                                    onClick={() => setDestination('')}
                                />
                            )}
                        </div>

                    </form>

                    <button onClick={() => {
                        findTrip();
                    }} className='bg-[#111] text-white font-semibold  outline-none rounded-lg px-4 py-2  w-full text-lg disabled:cursor-none'>Find Trip</button>
                </div>
                {/**Location suggestion */}
                <div ref={panelRef} className='bg-white h-0 overflow-y-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            {/* vehicle panel  */}
            <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-8 pt-12 w-full'>
                <VehiclePanel
                    fare={fare}
                    setFare={setFare}
                    setVehicleType={setVehicleType}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setConfirmRidePanel={setConfirmRidePanel}
                />
            </div>

            {/* confirmed ride  */}
            <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12 w-full hidden'>
                <ConfirmRide
                    createRide={createRide}
                    fare={fare[vehicleType]}
                    pickup={pickup}
                    destination={destination}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                    setConfirmRidePanel={setConfirmRidePanel}
                />
            </div>

            {/* looking for ride  */}
            <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12 w-full'>
                <LookingForDriver
                    fare={fare[vehicleType]}
                    pickup={pickup}
                    destination={destination}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Waiting for driver  */}
            <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 w-full'>
                <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
            </div>
        </div>
    );
};

export default Home;
