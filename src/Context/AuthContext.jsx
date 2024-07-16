import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("authToken" || ""))
    const navigate = useNavigate()

    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();
            console.log(res)
            if (data) {
                setUser(data.user);
                setToken(res.token);
                localStorage.setItem("authToken", res.token);
                navigate("/");
            }
            throw new Error(res.message);
        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
        }
    };

    const logout = () => {
        setUser(null)
        setToken("")
        localStorage.removeItem("authToken")
        navigate("/auth/login")
    }

    return <AuthContext.Provider value={{ token, user, loginAction, logout }}>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};