import apiClient from './api';
import type { LoginRequest, LoginResponse } from '../types/api.types';

export const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.get('/users', {
            params: {
                email: credentials.email,
                password: credentials.password,
            },
        });

        if (response.data.length === 0) {
            throw new Error('Invalid credentials');
        }

        const user = response.data[0];
        const token = `mock-token-${user.id}`;

        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        return { user, token };
    },
};
