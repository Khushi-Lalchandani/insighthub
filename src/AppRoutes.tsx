import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './App'
import Dashboard from './components/pages/Dashboard'
import Settings from './components/pages/Settings'
import Report from './components/pages/Report'
import Auth from './components/pages/Auth'
import ProtectedRoutes from './components/ProtectedRoutes'
import DashboardLayout from './components/Layouts/DashboardLayout'
const AppRoutes = () => {


    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/report" element={<Report />} />
            </Route>

        </Routes>
    )
}

export default AppRoutes