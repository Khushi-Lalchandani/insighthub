import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LogoutButton() {
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium transition-all duration-200 flex items-center gap-2"
            aria-label="Logout"
        >
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
            <span>Logout</span>
        </button>
    )
}

export default LogoutButton
