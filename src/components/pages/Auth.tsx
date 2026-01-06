import { useState } from 'react'
import ThemeToggle from '../ThemeToggle'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'

const Auth = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [errors, setErrors] = useState<{ email?: string, password?: string, general?: string }>({})

    const validate = () => {
        const newErrors: { email?: string, password?: string } = {}
        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email invalid'
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const { user } = await authService.login({ email, password });

                login({
                    name: user.name,
                    email: user.email,
                    role: user.role
                });

                navigate('/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
                setErrors({
                    general: 'Invalid email or password. Please try again.'
                });
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <>
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-sm transition-colors duration-200">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Login</h2>

                    {errors.general && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
                            {errors.general}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                            Email
                        </label>
                        <Input type='email' className='bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400' placeholder='you@example.com' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                            Password
                        </label>
                        <Input type='password' className='bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400' placeholder='********' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}


                    </div>

                    <Button type='submit' className='bg-indigo-600 hover:bg-indigo-700 text-white' disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Auth