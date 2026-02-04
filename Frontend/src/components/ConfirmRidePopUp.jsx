import React, { useRef, useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ConfirmRidePopUp = ({ setConfirmRidePopupPanel, setRidePopupPanel, ride }) => {

    const navigate = useNavigate();

    const [OTP, setOTP] = useState(new Array(6).fill(""));
    const otpFieldRef = useRef(new Array(6).fill(null));

    const handleOTPChange = (e, index) => {

        const value = e.target.value;

        if (isNaN(value)) return;
        const newOTP = [...OTP];
        newOTP[index] = value.substring(value.length - 1);
        setOTP(newOTP);

        // move to next index 
        if (value && index < 5) {
            otpFieldRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {

        if (e.key == 'Backspace' && index >= 0) {
            const newOTP = [...OTP];
            newOTP[index] = "";
            setOTP(newOTP);

            if (index > 0) {
                otpFieldRef.current[index - 1].focus();
            }
        }

        if (e.key == 'ArrowLeft' && index > 0) {
            e.preventDefault();
            otpFieldRef.current[index - 1].focus();
        }

        if (e.key == 'ArrowRight' && index < 5) {
            e.preventDefault();
            otpFieldRef.current[index + 1].focus();
        }


    }

    const handlePaste = (e) => {

        e.preventDefault();
        const data = e.clipboardData.getData('text').slice(0, 6).split("");


        if (data.length == 0) return;

        const newOTP = [...OTP];

        data.forEach((char, i) => {
            if (i < 6 && /[0-9]/.test(char)) newOTP[i] = char;
        });
        setOTP(newOTP);

        const nextIndex = Math.min(data.length, 5);

        otpFieldRef.current[nextIndex].focus();

    }

    const submitHandler = async (e) => {

        e.preventDefault();

        const otpText = OTP.join("");
        

        try {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: ride?._id,
                    otp: otpText
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if(response.status === 200) {
                toast.success('Ride started');
                setConfirmRidePopupPanel(false);
                navigate('/captain-riding');
            }

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Failed to start ride';
            toast.error(message);
        } finally {
            setOTP(new Array(6).fill(""));
        }

    }

    return (
        <div>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover border-2 border-white' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" alt="" />
                    <h2 className='text-xl font-medium capitalize'>{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-bold text-gray-900 bg-white/30 px-2 py-1 rounded'>2.5 KM</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2'>

                <div className='w-full mt-5'>
                    <div className='flex items-center justify-start gap-5 p-3 '>
                        <IoLocationOutline className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>{ride?.pickup?.split(",")[0]}</h3>
                            <p className='text-sm text-grey-600'>{ride?.pickup?.split(",").splice(1).join(", ")}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <FaRegMap className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>{ride?.destination?.split(",")[0]}</h3>
                            <p className='text-sm text-grey-600'>{ride?.destination?.split(",").splice(1).join(", ")}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-start gap-5 p-3 border-t border-gray-100'>
                        <LuIndianRupee className='text-xl text-yellow-500' />
                        <div >
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm text-grey-500'>Cash pay</p>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-5'>

                    {/* otp field  */}

                    <form onSubmit={(e) => submitHandler(e)}>

                        <h5 className='text-lg font-semibold p-1'>Enter OTP</h5>
                        <div className='flex justify-between gap-2 mb-6 px-1'>
                            {
                                OTP.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        ref={(el) => (otpFieldRef.current[index] = el)}
                                        inputMode='numeric'
                                        value={digit}
                                        maxLength={1}
                                        placeholder='-'
                                        className={`w-12 h-12 border-2 border-gray-100 rounded-lg text-center text-xl font-medium  outline-none transition-colors ${digit ? "border-yellow-400 bg-yellow-50 text-gray-800" : "focus:border-yellow-400 focus:bg-white bg-[#eee] "}`}
                                        onChange={(e) => handleOTPChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index == 0 ? handlePaste : undefined}

                                    />
                                ))
                            }
                        </div>

                        <button className='flex items-center justify-center w-full bg-green-600 text-white font-semibold p-2 rounded-lg '>Confirm</button>

                        <button onClick={() => {
                            setRidePopupPanel(false);
                            setConfirmRidePopupPanel(false)
                        }} className='w-full bg-red-500 text-white font-semibold p-2 rounded-lg mt-1'>Cancel</button>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default ConfirmRidePopUp