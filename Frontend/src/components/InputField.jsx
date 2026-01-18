import React from 'react';
import { GoXCircle } from 'react-icons/go';

const InputField = ({ type = 'text', required = false, placeholder, value, setValue }) => {
    return (
        <div className="bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full flex items-center justify-between">
            <input
                required={required}
                className="bg-transparent w-full outline-none text-base placeholder:text-sm"
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
            />
            {value?.length > 0 && (
                <GoXCircle
                    className="cursor-pointer"
                    onClick={() => setValue('')}
                />
            )}
        </div>
    );
};

export default InputField;
