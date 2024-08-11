import React, { createContext, useCallback, useEffect, useState } from "react";

interface UserLoggedsData {
    token: string | undefined;
    isAuthenticated: boolean;
    logout: () => void;
    setAuthCredentials: (token: string) => void;
}

interface UserLoggedContextProps {
    children: React.ReactNode;
}

export const UserLoggedContext = createContext<UserLoggedsData>({} as UserLoggedsData);

export const UserLoggedProvider: React.FC<UserLoggedContextProps> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Função para lidar com logout
    const handlerLogout = useCallback(() => {
        localStorage.removeItem("authToken");
        setToken(undefined);
        setIsAuthenticated(false);
    }, []);

    // Função para definir as credenciais de autenticação
    const handlerSetAuthCredentials = useCallback((token: string) => {
        localStorage.setItem("authToken", token);
        setToken(token);
        setIsAuthenticated(true);
    }, []);

    // Função para obter as credenciais de autenticação
    const handlerGetAuthCredentials = useCallback(() => {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        handlerGetAuthCredentials();
    
    }, [handlerGetAuthCredentials]);

    return (
        <UserLoggedContext.Provider
            value={{
                token,
                isAuthenticated,
                setAuthCredentials: handlerSetAuthCredentials,
                logout: handlerLogout,
            }}
        >
            {children}
        </UserLoggedContext.Provider>
    );
};
