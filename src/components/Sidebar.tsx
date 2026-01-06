import React, { useEffect, useState } from 'react'
import Heading from './atoms/Heading'
import { NavLink } from 'react-router-dom'
import type { User } from '../types/api.types'

interface SidebarProps {
    isVisible: boolean
    onClose: () => void
}

const Sidebar = ({ isVisible, onClose }: SidebarProps) => {

    const commonClasses = 'border-r flex justify-between border-gray-200 dark:border-gray-700 transition-colors duration-200'
    const [user, setUser] = useState<User | null>(null)
    const getLinkClasses = ({ isActive }: { isActive: boolean }) => {
        const baseClasses = 'flex items-center text-sm font-medium p-3 gap-3 mx-2 my-1 rounded-lg transition-all duration-200'
        const activeClasses = 'bg-gray-100 text-gray-900 border-l-4 border-gray-800 dark:bg-gray-700 dark:text-white dark:border-gray-300'
        const inactiveClasses = 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'

        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])
    return (
        <div className={`${commonClasses} w-64 h-screen bg-white dark:bg-gray-900 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col`}>
            <div>
                <Heading className={`border-b border-gray-200 dark:border-gray-700 p-4`}>InsightHub</Heading>

                <nav className="flex flex-col mt-4">
                    <NavLink className={getLinkClasses} to={'/dashboard'}>
                        <img src="/public/bars-svgrepo-com.svg" className='h-5 w-5 dark:invert' alt="" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={getLinkClasses} to={'/report'}>
                        <img src="/public/report-linechart-svgrepo-com.svg" className='h-5 w-5 dark:invert' alt="" />
                        <p>Report</p>
                    </NavLink>
                    <NavLink className={getLinkClasses} to={'/settings'}>
                        <img src="/public/settings-svgrepo-com.svg" className='h-5 w-5 dark:invert' alt="" />
                        <p>Settings</p>
                    </NavLink>
                </nav>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.name || 'Guest'}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.role || 'No role'}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sidebar