import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useDashboardPreferences } from '../../context/DashboardPreferencesContext';
import Toggle from '../atoms/Toggle';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import Heading from '../atoms/Heading';

const Settings = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { preferences, updatePreference } = useDashboardPreferences();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl">
            {/* Page Header */}
            <div>
                <Heading className="text-3xl ">Settings</Heading>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">👤</span>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profile</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                        <p className="mt-1 text-base text-gray-900 dark:text-gray-100">{user?.name || 'Not set'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                        <p className="mt-1 text-base text-gray-900 dark:text-gray-100">{user?.email || 'Not set'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                        <p className="mt-1 text-base text-gray-900 dark:text-gray-100">{user?.role || 'Not set'}</p>
                    </div>
                </div>
            </div>

            {/* Appearance Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎨</span>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>
                </div>
                <Toggle
                    enabled={theme === 'dark'}
                    onChange={toggleTheme}
                    label="Dark Mode"
                    description="Toggle between light and dark theme"
                />
            </div>

            {/* Dashboard Preferences Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📊</span>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dashboard Preferences</h2>
                </div>
                <div className="space-y-4">
                    <Toggle
                        enabled={preferences.showRevenueCard}
                        onChange={(value) => updatePreference('showRevenueCard', value)}
                        label="Show Revenue Card"
                        description="Display revenue statistics on dashboard"
                    />
                    <Toggle
                        enabled={preferences.showUserGrowthCard}
                        onChange={(value) => updatePreference('showUserGrowthCard', value)}
                        label="Show User Growth Card"
                        description="Display user growth statistics on dashboard"
                    />
                    <Toggle
                        enabled={preferences.showRevenueChart}
                        onChange={(value) => updatePreference('showRevenueChart', value)}
                        label="Show Revenue Chart"
                        description="Display revenue chart on dashboard"
                    />
                    <Toggle
                        enabled={preferences.showUserChart}
                        onChange={(value) => updatePreference('showUserChart', value)}
                        label="Show User Chart"
                        description="Display user activity chart on dashboard"
                    />
                </div>
            </div>

            {/* Session Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🔒</span>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Session</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Logged in as: <span className="font-medium text-gray-900 dark:text-gray-100">{user?.email}</span>
                        </p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Settings