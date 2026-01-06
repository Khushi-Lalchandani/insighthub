import { useState, useRef, useEffect } from "react";

type Option = {
    label: string;
    value: number;
};

type DropdownProps = {
    options: Option[];
    value: Option;
    onChange: (option: Option) => void;
};

export default function Dropdown({ options, value, onChange }: DropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    return (
        <div ref={ref} className="relative w-40">
            <button
                onClick={() => setOpen((p) => !p)}
                className="text-black dark:text-gray-100 w-full flex justify-between items-center px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:border-gray-700"
            >
                <span>{value.label}</span>
                <span className="text-xs">▼</span>
            </button>

            {open && (
                <div className=" text-black dark:text-gray-100 absolute mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md z-50">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                ${opt.value === value.value && "bg-gray-100 dark:bg-gray-700"}
              `}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
