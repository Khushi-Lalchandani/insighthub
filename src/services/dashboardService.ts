import apiClient from './api';
import type { DashboardStats, RevenueData } from '../types/api.types';

export const dashboardService = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get('/dashboardStats');
        return response.data;
    },

    getRevenueData: async (): Promise<RevenueData[]> => {
        const response = await apiClient.get('/revenueData');
        return response.data;
    },
};