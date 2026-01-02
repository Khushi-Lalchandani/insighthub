import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface DashboardPreferences {
    showRevenueCard: boolean;
    showUserGrowthCard: boolean;
    showRevenueChart: boolean;
    showUserChart: boolean;
}

interface DashboardPreferencesContextType {
    preferences: DashboardPreferences;
    updatePreference: (key: keyof DashboardPreferences, value: boolean) => void;
}

const DashboardPreferencesContext = createContext<DashboardPreferencesContextType | undefined>(undefined);

export function DashboardPreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<DashboardPreferences>(() => {
        const saved = localStorage.getItem('dashboardPreferences');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            showRevenueCard: true,
            showUserGrowthCard: true,
            showRevenueChart: true,
            showUserChart: true,
        };
    });

    useEffect(() => {
        localStorage.setItem('dashboardPreferences', JSON.stringify(preferences));
    }, [preferences]);

    const updatePreference = (key: keyof DashboardPreferences, value: boolean) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    return (
        <DashboardPreferencesContext.Provider value={{ preferences, updatePreference }}>
            {children}
        </DashboardPreferencesContext.Provider>
    );
}

export function useDashboardPreferences() {
    const context = useContext(DashboardPreferencesContext);
    if (!context) {
        throw new Error('useDashboardPreferences must be used within DashboardPreferencesProvider');
    }
    return context;
}
