import React from 'react'

function Heading({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={` ${className} flex items-center w-full `}>
            <h1 className={` text-2xl font-bold dark:text-gray-100 text-gray-900 transition-colors duration-200`} >{children}</h1></div>
    )
}

export default Heading