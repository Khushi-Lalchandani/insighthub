import { createContext, useEffect, useState, useContext } from "react";

type User = {
    name: string;
    email: string;
    role: string;
}


interface AuthContextType {

    user: User | null
    login: (user: User) => void
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        }
        setIsLoading(false)
    }, [])

    const login = (user: User) => {
        setUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("user", JSON.stringify(user))

    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};