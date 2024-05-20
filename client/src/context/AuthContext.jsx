import { createContext, useState, useEffect, useContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    // console.log(user?.type);
    //Login
    const signin = async (values) => {
        try {
            const res = await loginRequest(values);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            // console.log(error);
            if (error.message === "Network Error") setErrors(["Servidor desconectado, soporte tecnico: arcancode@gmail.com"]);
            setErrors(error.response.data.message)
        }
    };
    // register
    const signup = async (values) => {
        try {
            const res = await registerRequest(values);
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            if (error.message === "Network Error") setErrors(["Servidor desconectado, soporte tecnico: arcancode@gmail.com"]);
            setErrors(error.response.data.message)
        }
    };
    // clear errors 
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    // verificar si el user esta logeado o si no expiro su token
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false)
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, errors, loading, signin, signup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
