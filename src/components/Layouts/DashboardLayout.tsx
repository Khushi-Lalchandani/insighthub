import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import ThemeToggle from '../ThemeToggle'
import LogoutButton from '../LogoutButton'
import LoadingSpinner from '../atoms/LoadingSpinner'

const DashboardLayout = () => {
    const location = useLocation()
    const [isSidebarVisible, setIsSidebarVisible] = useState(true)
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible)
    }

    useEffect(() => {
        const checkScreenSize = () => {
            const isSmallScreen = window.innerWidth < 900
            setIsTabletOrMobile(isSmallScreen)

            if (isSmallScreen) {
                setIsSidebarVisible(false)
            } else {
                setIsSidebarVisible(true)
            }
        }


        checkScreenSize()


        window.addEventListener('resize', checkScreenSize)


        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <div className='overflow-hidden flex h-screen w-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>

            {isTabletOrMobile && isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                />
            )}


            <div className={`
                ${isTabletOrMobile
                    ? 'fixed top-0 left-0 h-full z-50'
                    : 'relative'
                }
                transition-transform duration-300 ease-in-out
                ${isSidebarVisible
                    ? 'translate-x-0'
                    : isTabletOrMobile ? '-translate-x-full' : 'w-0'
                }
            `}>
                {(isSidebarVisible || isTabletOrMobile) && <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />}
            </div>

            <div className='flex-1 flex flex-col overflow-hidden'>

                <header className='border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between'>

                    <div className="flex items-center gap-3 w-full">
                        <button
                            onClick={toggleSidebar}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                            title={isSidebarVisible ? "Click to hide sidebar" : "Click to show sidebar"}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <span className="text-sm font-medium">
                                {isSidebarVisible ? "Click to hide sidebar" : "Click to show sidebar"}
                            </span>
                        </button>

                        <div className="ml-auto flex items-center gap-3">
                            <ThemeToggle />
                            <LogoutButton />
                        </div>
                    </div>
                </header>


                <main className='flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]   bg-gray-50 dark:bg-gray-900'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout