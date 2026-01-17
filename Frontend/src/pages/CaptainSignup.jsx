import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CaptainSignup = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('');
  const [loading, setLoading] = useState(false);

  const { setCaptain } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        toast.success("Captain registered");
        navigate('/captain-home')
      }


      setEmail('');
      setPassword('');
      setFirstname("");
      setLastname("");
      setVehicleCapacity("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleType("");

    } catch (error) {

      if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach(({ msg }) => toast.error(msg));
      } else {
        toast.error(error.response?.data?.message || "Signup failed");
      }

    } finally {
      setLoading(false);
    }



  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="./Uber_driver_logo.png" alt="Uber logo" />
        <form onSubmit={(e) => submitHandler(e)}>

          {/* //name input  */}
          <h3 className='text-base font-medium mb-2'>What's your name</h3>

          <div className='mb-6 flex items-center justify-between gap-2'>

            {/**first name */}
            <div className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 flex items-center justify-between'>
              <input
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder='First name'
              />
              {firstname.length > 0 && (
                <GoXCircle
                  className='cursor-pointer'
                  onClick={() => setFirstname("")}
                />
              )}
            </div>

            {/* {lastname} */}
            <div className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 flex items-center justify-between'>
              <input
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder='Last name'
              />
              {lastname.length > 0 && (
                <GoXCircle
                  className='cursor-pointer'
                  onClick={() => setLastname("")}
                />
              )}
            </div>
          </div>

          {/**Email input */}
          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <div className='bg-[#eeeeee] mb-6  rounded px-4 py-2  w-full flex items-center justify-between'>
            <input
              required
              className='bg-transparent w-full outline-none text-base placeholder:text-sm'
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder='email@example.com'
            />
            {email.length > 0 && (
              <GoXCircle
                className='cursor-pointer'
                onClick={() => setEmail("")}
              />
            )}
          </div>

          {/**Vehicle information */}
          <h3 className='text-base font-medium  mb-2'>Vehicle information</h3>

          <div className='mb-6 flex items-center justify-between gap-2'>

            {/**vehicle color */}
            <div className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 flex items-center justify-between'>
              <input
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                type="text"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
                placeholder='Vehicle Color'
              />
              {vehicleColor.length > 0 && (
                <GoXCircle
                  className='cursor-pointer'
                  onClick={() => setVehicleColor("")}
                />
              )}
            </div>

            {/* Number plate */}
            <div className='bg-[#eeeeee]  rounded px-4 py-2  w-1/2 flex items-center justify-between'>
              <input
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                type="text"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
                placeholder='Vehicle plate'
              />
              {vehiclePlate.length > 0 && (
                <GoXCircle
                  className='cursor-pointer'
                  onClick={() => setVehiclePlate("")}
                />
              )}
            </div>
          </div>

          <div className='mb-6 flex items-center justify-between gap-2'>
            <div className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 flex items-center justify-between'>
              <input
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                type="text"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
              />
            </div>
            <div className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 flex items-center justify-between'>
              <select
                required
                className='bg-transparent w-full outline-none text-base placeholder:text-sm'
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                }}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
              </select>
            </div>
          </div>

          <h3 className='text-base font-medium  mb-2'>Enter Password</h3>
          <div className='flex w-full justify-between items-center bg-[#eeeeee] mb-6  rounded px-4 py-2'>
            <input
              className='bg-transparent w-full outline-none text-base placeholder:text-sm'
              type={showPassword ? "text" : "password"}
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required
            />
            <div className='flex items-center gap-2'>
              {password.length > 0 && (
                <GoXCircle
                  className='cursor-pointer'
                  onClick={() => setPassword("")}
                />
              )}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className='cursor-pointer'
              >
                {
                  showPassword ?
                    <FaRegEyeSlash /> : <FaRegEye />
                }
              </div>
            </div>
          </div>

          <button
            className='bg-[#111] text-white font-semibold  mb-7 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base'
            disabled={loading}
          >{loading ? "Creating Account..." : "Create Account"}</button>

        </form>
        <p className='text-center'>
          Already have an Account ?
          <Link to='/login' className='text-blue-600 ml-1'>Login</Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup