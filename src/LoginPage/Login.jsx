import './Login.css'
import {useEffect, useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useAuth} from "../Context/AuthContext.jsx";
import {Link} from "react-router-dom";

export function Login() {
    const [error, setError] = useState(false)
    const [check, setCheck] = useState(true)

    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth()

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const savedCheck = localStorage.getItem('checkboxState') === 'true';
        if (rememberedEmail && savedCheck) {
            setCheck(true);
            setInput((prev) => ({
                ...prev,
                email: rememberedEmail,
            }));
        }
        setCheck(false);
    }, []);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (check === true) {
            localStorage.setItem("rememberedEmail", input.email)
            localStorage.setItem('checkboxState', 'true');
        } else {
            localStorage.removeItem("rememberedEmail")
            localStorage.setItem('checkboxState', 'false');
        }

        try {
            const response = await auth.loginAction(input);
            if (response.status === 500) {
                setError(true);
            } else {
                setError(false);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheck = async () => {
        setCheck(!check);
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmitEvent}>
                <h1>Connexion</h1>
                <div className="form_control">
                    <TextField
                        className="input"
                        type="email"
                        id="user-email"
                        name="email"
                        label="email"
                        error={error}
                        value={input.email}
                        onChange={handleInput}
                    />
                </div>
                <div className="form_control">
                    <TextField
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        label="Mot de passe"
                        error={error}
                        helperText={error ? "Email ou Mot de passe incorrect" : ""}
                        value={input.password}
                        onChange={handleInput}
                    />

                </div>
                <div className="buttons">
                    <Button variant="contained" className="connection-button" type="submit" style={{left: "70px", width: "165px"}}>Connexion</Button>
                </div>
                <div className="checkBox-container" style={{paddingLeft: "45px"}}>
                    <FormControlLabel
                        className="checkBox"
                        value={check} onChange={handleCheck}
                        control={<Checkbox/>}
                        label="Se souvenir de moi"
                    />
                </div>
                <div className="register-button">
                    <Button
                        variant="contained" component={Link} to="/auth/register" style={{height: "60px", top: "30px", left: "67px"}}>Créer un compte</Button>
                </div>
            </form>
        </div>
    )
}