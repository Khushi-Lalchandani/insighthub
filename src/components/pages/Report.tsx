import React, { useState, useMemo } from 'react'
import Heading from '../atoms/Heading'
import Dropdown from '../DropDown'
import Input from '../atoms/Input';

const generateUserData = () => [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active", lastActive: "2025-12-29" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Active", lastActive: "2025-12-28" },
    { id: 3, name: "Bob Johnson", email: "bob.j@example.com", status: "Inactive", lastActive: "2025-12-15" },
    { id: 4, name: "Alice Williams", email: "alice.w@example.com", status: "Active", lastActive: "2025-12-30" },
    { id: 5, name: "Charlie Brown", email: "charlie.b@example.com", status: "Inactive", lastActive: "2025-11-20" },
    { id: 6, name: "Diana Prince", email: "diana.p@example.com", status: "Active", lastActive: "2025-12-29" },
    { id: 7, name: "Ethan Hunt", email: "ethan.h@example.com", status: "Active", lastActive: "2025-12-27" },
    { id: 8, name: "Fiona Green", email: "fiona.g@example.com", status: "Inactive", lastActive: "2025-10-05" },
];

const generateRevenueData = () => [
    { id: 1, date: "2025-12-30", amount: "$1,250.00", type: "Subscription" },
    { id: 2, date: "2025-12-29", amount: "$890.00", type: "Subscription" },
    { id: 3, date: "2025-12-28", amount: "$450.00", type: "Other" },
    { id: 4, date: "2025-12-27", amount: "$2,100.00", type: "Subscription" },
    { id: 5, date: "2025-12-26", amount: "$670.00", type: "Other" },
    { id: 6, date: "2025-12-25", amount: "$1,500.00", type: "Subscription" },
    { id: 7, date: "2025-12-24", amount: "$920.00", type: "Subscription" },
    { id: 8, date: "2025-12-23", amount: "$340.00", type: "Other" },
    { id: 9, date: "2025-11-15", amount: "$780.00", type: "Subscription" },
    { id: 10, date: "2025-10-10", amount: "$560.00", type: "Other" },
];

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

    const filteredUserData = useMemo(() => {
        let data = generateUserData();

        if (statusFilter.value === 1) {
            data = data.filter(user => user.status === "Active");
        } else if (statusFilter.value === 2) {
            data = data.filter(user => user.status === "Inactive");
        }

        const today = new Date();
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - dateRange.value);

        data = data.filter(user => {
            const lastActiveDate = new Date(user.lastActive);
            return lastActiveDate >= cutoffDate;
        });

        if (searchValue) {
            data = data.filter((user) =>
                Object.values(user).some((v) =>
                    String(v).toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }
        return data;
    }, [dateRange, statusFilter, searchValue]);

    const filteredRevenueData = useMemo(() => {
        let data = generateRevenueData();

        const today = new Date();
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - dateRange.value);

        data = data.filter(revenue => {
            const revenueDate = new Date(revenue.date);
            return revenueDate >= cutoffDate;
        });

        if (searchValue) {
            data = data.filter((revenue) =>
                revenue.date.toLowerCase().includes(searchValue.toLowerCase()) ||
                revenue.amount.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        return data;
    }, [dateRange, searchValue]);


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

            {/* Tabs */}
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
                                    filteredUserData.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    ID: {user.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {user.lastActive}
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
                                    filteredRevenueData.map((revenue) => (
                                        <tr key={revenue.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {revenue.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                {revenue.amount}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${revenue.type === 'Subscription'
                                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                    }`}>
                                                    {revenue.type}
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