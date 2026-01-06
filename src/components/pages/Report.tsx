import React, { useState, useMemo, useEffect } from 'react'
import Heading from '../atoms/Heading'
import Dropdown from '../DropDown'
import Input from '../atoms/Input';
import { reportService } from '../../services/reportService';
import type { Report } from '../../types/api.types';
import ReportSkeleton from '../Skeletons/reportSkeleton';

const Report = () => {
    const dateOptions = [
        { label: "Last 7 days", value: 7 },
        { label: "Last 30 days", value: 30 },
        { label: "Last 90 days", value: 90 },
    ];

    const statusOptions = [
        { label: "All", value: 0 },
        { label: "Active", value: 1 },
        { label: "Inactive", value: 2 },
    ];

    const [dateRange, setDateRange] = useState(dateOptions[0]);
    const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
    const [activeTab, setActiveTab] = useState<'users' | 'revenue'>('users');
    const [searchValue, setSearchValue] = useState<string>('')
    const [allReports, setAllReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const data = await reportService.getReports();
                setAllReports(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch reports:', err);
                setError('Failed to load reports');
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const filteredUserData = useMemo(() => {
        let data = allReports.filter(report => report.type === 'user');

        if (statusFilter.value === 1) {
            data = data.filter(report => report.status === "active");
        } else if (statusFilter.value === 2) {
            data = data.filter(report => report.status === "inactive");
        }

        const today = new Date();
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - dateRange.value);

        data = data.filter(report => {
            if (report.signupDate) {
                const signupDateObj = new Date(report.signupDate);
                return signupDateObj >= cutoffDate;
            }
            return false;
        });

        if (searchValue) {
            data = data.filter((report) =>
                Object.values(report).some((v) =>
                    String(v).toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
        return data;
    }, [allReports, dateRange, statusFilter, searchValue]);

    const filteredRevenueData = useMemo(() => {
        let data = allReports.filter(report => report.type === 'revenue');

        const today = new Date();
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - dateRange.value);

        data = data.filter(report => {
            if (report.date) {
                const reportDate = new Date(report.date);
                return reportDate >= cutoffDate;
            }
            return false;
        });

        if (searchValue) {
            data = data.filter((report) =>
                (report.date?.toLowerCase().includes(searchValue.toLowerCase())) ||
                (report.amount?.toString().includes(searchValue.toLowerCase()))
            );
        }

        return data;
    }, [allReports, dateRange, searchValue]);


    if (loading) {
        return <ReportSkeleton />
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
        <div className="p-6 space-y-6">
            <div>
                <Heading className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</Heading>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    View detailed data for users and revenue
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-end justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Date Range
                        </label>
                        <Dropdown
                            options={dateOptions}
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>

                    {activeTab === 'users' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <Dropdown
                                options={statusOptions}
                                value={statusFilter}
                                onChange={setStatusFilter}
                            />
                        </div>
                    )}
                </div>
                <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Search' className='max-w-xs bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 rounded-none focus:border focus:border-blue-500 dark:focus:border-blue-400 focus:rounded focus:ring-0' />
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'users'
                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('revenue')}
                        className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'revenue'
                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        Revenue
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                {activeTab === 'users' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        User Name / ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Last Active Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredUserData.length > 0 ? (
                                    filteredUserData.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {report.userName}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    ID: {report.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {report.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${report.status === 'active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {report.signupDate}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No users found for the selected filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Revenue Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Type
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredRevenueData.length > 0 ? (
                                    filteredRevenueData.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {report.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                ${report.amount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {report.source}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No revenue data found for the selected date range
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
                {activeTab === 'users' ? (
                    <p>Showing {filteredUserData.length} user{filteredUserData.length !== 1 ? 's' : ''}</p>
                ) : (
                    <p>Showing {filteredRevenueData.length} revenue record{filteredRevenueData.length !== 1 ? 's' : ''}</p>
                )}
            </div>
        </div>
    )
}

export default Report