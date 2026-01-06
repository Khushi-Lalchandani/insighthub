export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface DashboardStats {
    totalRevenue: number;
    totalUsers: number;
    activeUsers: number;
    conversionRate: number;
}

export interface RevenueData {
    month: string;
    revenue: number;
    users: number;
}

export interface Report {
    id: number;
    type: 'user' | 'revenue';
    userName?: string;
    email?: string;
    signupDate?: string;
    status: string;
    totalSpent?: number;
    date?: string;
    amount?: number;
    source?: string;
}