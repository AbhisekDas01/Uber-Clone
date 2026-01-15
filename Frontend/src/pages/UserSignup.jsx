import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GoXCircle } from "react-icons/go";
import { Link } from 'react-router-dom'

const UserSignup = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      fullname: {
        firstname,
        lastname
      },
      email: email,
      password: password
    });

    setEmail('');
    setPassword('');
    setFirstname("");
    setLastname("");

  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="./Uber_logo.png" alt="Uber logo" />
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
          >Create Account</button>

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

export default UserSignup