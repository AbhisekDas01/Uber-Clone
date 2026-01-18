import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';

const UserSignup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newUser = {
            fullname: {
                firstname,
                lastname,
            },
            email: email,
            password: password,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                newUser
            );

            if (response.status === 201 || response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                toast.success('Account Created');
                navigate('/home');

                // Only clear form on success
                setEmail('');
                setPassword('');
                setFirstname('');
                setLastname('');
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
                toast.error(error.response?.data?.message || 'Signup failed');
            }
            // Only clear sensitive data on error?
            // setPassword('');
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
                    {/* //name input  */}
                    <h3 className="text-base font-medium mb-2">
                        What's your name
                    </h3>

                    <div className="mb-6 flex items-center justify-between gap-2">
                        {/**first name */}
                        <InputField
                            classes={'w-1/2'}
                            required={true}
                            value={firstname}
                            setValue={setFirstname}
                            placeholder={'First name'}

                        />

                        {/* {lastname} */}
                        <InputField
                            classes={'w-1/2'}
                            value={lastname}
                            setValue={setLastname}
                            placeholder={'Last name'}

                        />
                    </div>

                    {/**Email input */}
                    <h3 className="text-base font-medium mb-2">
                        What's your email
                    </h3>
                    <InputField
                        classes={'w-full mb-6'}
                        required={true}
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
                        className="bg-[#111] text-white font-semibold  mb-7 outline-none rounded px-4 py-2  w-full text-lg placeholder:text-base disabled:bg-gray-400"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                <p className="text-center">
                    Already have an Account ?
                    <Link to="/login" className="text-blue-600 ml-1">
                        Login
                    </Link>
                </p>
            </div>

            <div>
                <p className="text-[10px] mt-6 leading-tight">
                    This site is protected by reCAPTCHA and the{' '}
                    <span className="underline">Google Privacy Policy</span> and{' '}
                    <span className="underline">Terms of Service apply</span>.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
