import './Login.css'
import {useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {useAuth} from "../Context/AuthContext.jsx";
import {Link} from "react-router-dom";

export function Login() {

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
                <TextField
                    className="input"
                    type="email"
                    id="user-email"
                    name="email"
                    label="email"
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
                    onChange={handleInput}
                />
            </div>
            <div className="buttons">
                <Button variant="contained" className="connection-button" type="submit">Connexion</Button>
                <FormControlLabel className="checkBox" control={<Checkbox />} label="Se souvenir du mot de passe" />
            </div>
            <div className="register-button">
                <Button variant="contained" component={Link} to="/auth/register">Créer un compte</Button>
            </div>
        </form>
    )
}