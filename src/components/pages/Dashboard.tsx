import React, { useEffect, useState } from 'react'
import Card from '../Card'
import StatCharts from '../StatCharts'
import {
    FiUsers,
    FiUserCheck,
    FiDollarSign,
    FiTrendingUp,
} from "react-icons/fi";
import { useDashboardPreferences } from '../../context/DashboardPreferencesContext';
import { dashboardService } from '../../services/dashboardService';
import type { DashboardStats } from '../../types/api.types';
import DashboardSkeleton from '../Skeletons/dashboardSkeleton';


const Dashboard = () => {
    const { preferences } = useDashboardPreferences();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const statsData = await dashboardService.getStats();
                setStats(statsData);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <DashboardSkeleton />
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className={`p-8 text-gray-900 dark:text-gray-100 space-y-6`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
                <Card
                    icon={<FiUsers />}
                    title="Total Users"
                    value={stats?.totalUsers.toLocaleString() || '0'}
                />
                {preferences.showUserGrowthCard && (
                    <Card
                        icon={<FiUserCheck />}
                        title="Active Users"
                        value={stats?.activeUsers.toLocaleString() || '0'}
                    />
                )}
                {preferences.showRevenueCard && (
                    <Card
                        icon={<FiDollarSign />}
                        title="Revenue"
                        value={`$${stats?.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}
                    />
                )}
                <Card
                    icon={<FiTrendingUp />}
                    title="Conversion Rate"
                    value={stats?.conversionRate.toString() || '0'}
                    isPercentage
                />
            </div>


            <StatCharts
                showUserChart={preferences.showUserChart}
                showRevenueChart={preferences.showRevenueChart}
            />
        </div>
    )
}

export default Dashboard