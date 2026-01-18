import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { GoXCircle } from 'react-icons/go';

const PasswordField = ({setPassword , password = ''}) => {

    const [showPassword, setShowPassword] = useState(false);
    return (
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
    )
}

export default PasswordField