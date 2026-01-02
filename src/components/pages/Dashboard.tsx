import React from 'react'
import Card from '../Card'
import StatCharts from '../StatCharts'
import {
    FiUsers,
    FiUserCheck,
    FiDollarSign,
    FiTrendingUp,
} from "react-icons/fi";
import { useDashboardPreferences } from '../../context/DashboardPreferencesContext';


const Dashboard = () => {
    const { preferences } = useDashboardPreferences();

    return (
        <div className={`p-8 text-gray-900 dark:text-gray-100 space-y-6`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
                <Card icon={<FiUsers />} title="Total Users" value="100" />
                {preferences.showUserGrowthCard && (
                    <Card icon={<FiUserCheck />} title="Active Users" value="100" />
                )}
                {preferences.showRevenueCard && (
                    <Card icon={<FiDollarSign />} title="Revenue" value="100" />
                )}
                <Card icon={<FiTrendingUp />} title="Conversion Rate" value="100" isPercentage />
            </div>


            <StatCharts
                showUserChart={preferences.showUserChart}
                showRevenueChart={preferences.showRevenueChart}
            />
        </div>
    )
}

export default Dashboard