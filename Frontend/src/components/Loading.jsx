import React from 'react'

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading