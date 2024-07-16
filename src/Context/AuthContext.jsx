import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("authToken") || "");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [ token]);

    console.log("test : ", user)
    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/me", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUser(data);
            console.log("User:" , data)
            return data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log("data: "+ data)
            const res = await response.json();
            if (response.ok) {
                setToken(res.token);
                localStorage.setItem("authToken", res.token);
                navigate("/");
            } else {
                throw new Error(res.message);
            }
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
        }
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("authToken");
        navigate("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logout, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
