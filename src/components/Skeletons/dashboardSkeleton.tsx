import Skeleton from '../atoms/Skeleton'

const DashboardSkeleton = () => {
    return (
        <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                            <Skeleton variant="circular" className="w-10 h-10" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardSkeleton