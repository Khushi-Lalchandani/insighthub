import Skeleton from '../atoms/Skeleton'

const ReportSkeleton = () => {
    return (
        <div className="p-8 space-y-6">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                    <div className="grid grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                </div>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                    <div key={row} className="border-b border-gray-200 dark:border-gray-700 p-4">
                        <div className="grid grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((col) => (
                                <Skeleton key={col} className="h-4 w-full" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReportSkeleton
