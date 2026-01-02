type CardProps = {
    icon?: React.ReactNode;
    title?: string;
    value?: string;
    isPercentage?: boolean;
};

export default function Card({ icon, title, value, isPercentage }: CardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
            <div className="text-blue-600 dark:text-blue-400 text-3xl">
                {icon}
            </div>

            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {title}
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {value} {isPercentage && "%"}
                </p>
                <p className="text-xs text-gray-500  dark:text-gray-500">
                    {isPercentage ? "Rate" : ""}
                </p>
            </div>
        </div>
    );
}
