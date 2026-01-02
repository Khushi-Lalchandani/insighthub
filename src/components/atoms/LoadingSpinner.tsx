import React from "react";

interface SpinnerProps {
    size?: number;
    color?: string;
}

const LoadingSpinner: React.FC<SpinnerProps> = ({
    size = 23,
    color = "bg-gray-900",
}) => {
    return (
        <div
            className="relative animate-spin"
            style={{ width: size, height: size }}
        >
            {[...Array(8)].map((_, i) => (
                <span
                    key={i}
                    className={`absolute rounded-full opacity-75 ${color}`}
                    style={{
                        width: size * 0.15,
                        height: size * 0.15,
                        top: "50%",
                        left: "50%",
                        transform: `
              rotate(${i * 45}deg)
              translate(${size / 2.2}px)
            `,
                        transformOrigin: "center",
                        animation: `fade 1s linear infinite`,
                        animationDelay: `${i * 0.12}s`,
                    }}
                />
            ))}

            <style>
                {`
          @keyframes fade {
            0%, 39%, 100% { opacity: 0.25; }
            40% { opacity: 1; }
          }
        `}
            </style>
        </div>
    );
};

export default LoadingSpinner;
