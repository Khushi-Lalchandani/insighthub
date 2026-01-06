import Skeleton from '../atoms/Skeleton'

const SettingsSkeleton = () => {
    return (
        <div className="p-6 space-y-6 max-w-4xl">
            <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-96" />
            </div>

            {[1, 2, 3, 4].map((section) => (
                <div
                    key={section}
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton variant="circular" className="w-8 h-8" />
                        <Skeleton className="h-6 w-40" />
                    </div>

                    <div className="space-y-4">
                        {section === 1 ? (
                            <>
                                {[1, 2, 3].map((field) => (
                                    <div key={field}>
                                        <Skeleton className="h-3 w-16 mb-2" />
                                        <Skeleton className="h-5 w-48" />
                                    </div>
                                ))}
                            </>
                        ) : section === 4 ? (
                            <>
                                <Skeleton className="h-4 w-64 mb-4" />
                                <Skeleton className="h-10 w-24" />
                            </>
                        ) : (
                            <>
                                {[1, 2, 3, 4].slice(0, section === 2 ? 1 : 4).map((toggle) => (
                                    <div key={toggle} className="flex items-center justify-between py-2">
                                        <div className="flex-1">
                                            <Skeleton className="h-4 w-40 mb-1" />
                                            <Skeleton className="h-3 w-64" />
                                        </div>
                                        <Skeleton className="h-6 w-12 rounded-full" />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SettingsSkeleton
