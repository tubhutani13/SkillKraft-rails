import api from '../utils/api';
import { createContext, useState, useEffect, useMemo } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const setToken = (newToken) => {
        setToken_(newToken);
    };
    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
            console.log('token set');
        } else {
            delete api.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
            console.log('token removed');
        }
    }, [token]);
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext