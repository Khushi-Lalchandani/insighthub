import { useEffect } from 'react'

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-modal-title"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-red-600 dark:text-red-400"
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
                    </div>
                    <h2
                        id="logout-modal-title"
                        className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                    >
                        Confirm Logout
                    </h2>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to logout? You'll need to sign in again to access your dashboard.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LogoutModal