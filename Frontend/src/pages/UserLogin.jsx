import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const { setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        const user = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                user
            );

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                toast.success('Login successful');
                navigate('/home');

                // Clear state only on success
                setEmail('');
                setPassword('');
            }
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
                    className="w-16 mb-10"
                    src="./Uber_logo.png"
                    alt="Uber logo"
                />
                <form onSubmit={(e) => submitHandler(e)}>
                    <h3 className="text-base font-medium mb-2">
                        What's your email
                    </h3>
                    <InputField
                        required
                        classes={'w-full mb-6'}
                        type='email'
                        value={email}
                        setValue={setEmail}
                        placeholder={'example@example.com'}
                    />

                    <h3 className="text-base font-medium  mb-2">
                        Enter Password
                    </h3>
                    <PasswordField
                        password={password}
                        setPassword={setPassword}
                    />

                    <button
                        className="bg-[#111] text-white font-semibold  mb-7 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-center">
                    New here ?
                    <Link to="/signup" className="text-blue-600 ml-1">
                        Create new Account
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to="/captain-login"
                    className="bg-[#10b461] flex items-center justify-center text-white font-semibold  mb-5 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base cursor-pointer"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
