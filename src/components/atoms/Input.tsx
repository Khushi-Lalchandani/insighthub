import React from 'react'
interface InputProps {
    type: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}


const Input = ({ type, placeholder, value, onChange, className }: InputProps) => {
    return (
        <input className={`w-full px-3 py-2  text-gray-900 dark:text-white border rounded focus:outline-none focus:ring-2 transition-colors duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${className}`} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input