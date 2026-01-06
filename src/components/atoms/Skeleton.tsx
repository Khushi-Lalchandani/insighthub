const Skeleton = ({
    className = '',
    variant = 'rectangular'
}: {
    className?: string
    variant?: 'rectangular' | 'circular' | 'text'
}) => {
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700'

    const variantClasses = {
        rectangular: 'rounded',
        circular: 'rounded-full',
        text: 'rounded h-4'
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            aria-label="Loading..."
        />
    )
}

export default Skeleton
