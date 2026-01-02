import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar'
import ThemeToggle from '../ThemeToggle'
import LogoutButton from '../LogoutButton'
import LoadingSpinner from '../atoms/LoadingSpinner'

const DashboardLayout = () => {
    const location = useLocation()



    return (
        <div className=' overflow-hidden flex h-screen w-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200'>
            <Sidebar />

            <div className='flex-1 flex flex-col overflow-hidden'>

                <header className='border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between'>

                    <div className=" ml-auto flex items-center gap-3">
                        <ThemeToggle />
                        <LogoutButton />

                    </div>
                </header>

                {/* Main Content */}
                <main className='flex-1 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]   bg-gray-50 dark:bg-gray-900'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout