import React, { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { GoXCircle } from 'react-icons/go';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const captainData = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/login`,
                captainData
            );

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);

                toast.success('Login success');
                navigate('/captain-home');
            }

            setEmail('');
            setPassword('');
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                Array.isArray(error.response.data.errors)
            ) {
                error.response.data.errors.forEach(({ msg }) =>
                    toast.error(msg)
                );
            } else {
                toast.error(error.response?.data?.message || 'Login failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-20 mb-3"
                    src="./Uber_driver_logo.png"
                    alt="Uber logo"
                />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className="text-base font-medium mb-2">
                        What's your email
                    </h3>
                    <div className="bg-[#eeeeee] mb-6  rounded px-4 py-2  w-full flex items-center justify-between">
                        <input
                            required
                            className="bg-transparent w-full outline-none text-base placeholder:text-sm"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="email@example.com"
                        />
                        {email.length > 0 && (
                            <GoXCircle
                                className="cursor-pointer"
                                onClick={() => setEmail('')}
                            />
                        )}
                    </div>

                    <h3 className="text-base font-medium  mb-2">
                        Enter Password
                    </h3>
                    <div className="flex w-full justify-between items-center bg-[#eeeeee] mb-6  rounded px-4 py-2">
                        <input
                            className="bg-transparent w-full outline-none text-base placeholder:text-sm"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                        />
                        <div className="flex items-center gap-2">
                            {password.length > 0 && (
                                <GoXCircle
                                    className="cursor-pointer"
                                    onClick={() => setPassword('')}
                                />
                            )}
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer"
                            >
                                {showPassword ? (
                                    <FaRegEyeSlash />
                                ) : (
                                    <FaRegEye />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        className="bg-[#111] text-white font-semibold  mb-7 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base disabled:cursor-none"
                        disabled={loading}
                    >
                        {loading ? 'Logging in..' : 'Login'}
                    </button>
                </form>
                <p className="text-center">
                    Join a fleet ?
                    <Link to="/captain-signup" className="text-blue-600 ml-1">
                        Register as a Captain
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to="/login"
                    className="bg-[#d5622d] flex items-center justify-center text-white font-semibold  mb-5 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base cursor-pointer"
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
