import './Login.css'
import {useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import AuthProvider, {useAuth} from "../Context/AuthContext.jsx";
import authContext from "../Context/AuthContext.jsx";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /*const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Connexion réussie :", data);

                // Stockez le jeton d'authentification dans localStorage
                localStorage.setItem("authToken", data.token);

                // Redirigez vers la page d'accueil
                navigate("/");
            } else {
                console.error("Échec de la connexion");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };*/
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth()

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        auth.loginAction(input);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent}>
            <div className="form_control">
                <label htmlFor="user-email">Email:</label>
                <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-email" className="sr-only">
                    Please enter a valid username. It must contain at least 6 characters.
                </div>
            </div>
            <div className="form_control">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-password" className="sr-only">
                    your password should be more than 6 character
                </div>
            </div>
            <button className="btn-submit" type="submit">Submit</button>
        </form>
    )
}