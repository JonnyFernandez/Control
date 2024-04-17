import { createContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'


export const AuthContex = createContext({})


export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null)
    const [isAutenticated, setIsAutenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [Loading, setLoading] = useState(true)


    const signup = async (values) => {
        try {
            const res = await registerRequest(values);
            setUser(res)
            setIsAutenticated(true)
        } catch (error) {
            setErrors(error.response.data.message)
        }

    }
    const signin = async (values) => {
        try {
            const res = await loginRequest(values);

            setUser(res.data)
            setIsAutenticated(true)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }

    }


    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])


    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAutenticated(false);
                setLoading(false)
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAutenticated(false)
                    setLoading(false)
                    return
                }
                setIsAutenticated(true)
                setUser(res.data);
                setLoading(false)

            } catch (error) {
                console.log(error);
                setIsAutenticated(false)
                setUser(null)
                setLoading(false)

            }
        }
        checkLogin()
    }, [])

    const logout = () => {
        Cookies.remove("token");
        setIsAutenticated(false);
        setUser(null);
    }

    return (
        <AuthContex.Provider value={{ logout, signup, signin, user, isAutenticated, errors, Loading }}>
            {children}
        </AuthContex.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};




