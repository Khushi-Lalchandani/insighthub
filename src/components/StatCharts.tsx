import React, { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { dashboardService } from '../services/dashboardService';
import type { RevenueData } from '../types/api.types';

const userData = [
    { date: 'Dec 22', users: 100 },
    { date: 'Dec 23', users: 130 },
    { date: 'Dec 24', users: 200 },
    { date: 'Dec 25', users: 285 },
    { date: 'Dec 26', users: 325 },
    { date: 'Dec 27', users: 350 },
    { date: 'Dec 28', users: 355 },
    { date: 'Dec 29', users: 400 },
]

const trafficData = [
    { name: 'Website', value: 45, color: '#3B82F6' },
    { name: 'Mobile', value: 35, color: '#10B981' },
    { name: 'Other', value: 20, color: '#F59E0B' },
]

const formatCurrency = (value: number) => {
    if (value >= 100000) {
        return `₹${value / 100000}L`
    } else if (value >= 1000) {
        return `₹${value / 1000}k`
    }
    return `₹${value}`
}

interface StatChartsProps {
    showUserChart?: boolean;
    showRevenueChart?: boolean;
}

const StatCharts = ({ showUserChart = true, showRevenueChart = true }: StatChartsProps) => {
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const data = await dashboardService.getRevenueData();
                setRevenueData(data);
            } catch (error) {
                console.error('Failed to fetch revenue data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);
    return (
        <div className="space-y-6">

            {showUserChart && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        User Growth
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#374151"
                                opacity={0.3}
                            />
                            <XAxis
                                dataKey="date"
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#F3F4F6'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={{ fill: '#3B82F6', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {showRevenueChart && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Revenue Overview
                    </h3>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#374151"
                                opacity={0.3}
                            />
                            <XAxis
                                dataKey="month"
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis
                                stroke="#9CA3AF"
                                style={{ fontSize: '12px' }}
                                tickFormatter={formatCurrency}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1F2937',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#F3F4F6'
                                }}
                                formatter={(value: number | undefined) => value ? [`₹${value.toLocaleString('en-IN')}`, 'Revenue'] : ['', '']}
                                cursor={false}
                            />
                            <Legend />
                            <Bar
                                dataKey="revenue"
                                fill="#10B981"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Traffic Sources
                </h3>

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={trafficData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {trafficData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-gray-800 dark:bg-gray-700 border border-gray-600 rounded-lg p-3">
                                            <p className="text-white font-medium">{payload[0].name}</p>
                                            <p className="text-gray-200">{`${payload[0].value}%`}</p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatCharts
