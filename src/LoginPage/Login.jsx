import './Login.css'
import {useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import {Link} from "react-router-dom";

export default function Login(){
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="App">
            <main>
                <div className={"container"}>
                    <TextField
                        id="outlined-basic"
                        className="input"
                        label="Identifiant"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                </div>
                <div className={"container"}>
                    <TextField
                        id="outlined-password-input"
                        className="input"
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <div className={"container"}>
                    <Button variant="contained">Connexion</Button>
                    <FormControlLabel className="checkBox" control={<Checkbox/>} label="Se souvenir de moi"/>
                </div>
                <div className={"create-account-container"}>
                    <Button
                        className="create-account-button"
                        variant="contained"
                        component={Link}
                        to="/auth/register"
                    >
                        Créer un compte
                    </Button>
                </div>
            </main>
        </div>
    );
}