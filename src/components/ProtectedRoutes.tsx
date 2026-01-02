import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth()


    if (isLoading) {
        return null
    }

    return (
        isAuthenticated ? children
            : <Navigate to="/" replace />)
}

export default ProtectedRoutes