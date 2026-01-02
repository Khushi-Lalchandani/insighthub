import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: () => void
};

const Button = ({ children, type = "button", className = "", onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`w-full font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
