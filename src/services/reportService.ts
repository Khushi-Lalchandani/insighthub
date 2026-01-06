import apiClient from './api';
import type { Report } from '../types/api.types';

export const reportService = {
    getReports: async (): Promise<Report[]> => {
        const response = await apiClient.get('/reports');
        return response.data;
    },
};
