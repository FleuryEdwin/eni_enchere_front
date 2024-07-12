import './Login.css'
import {Header} from "../Component/Header/Header.jsx";
import {Footer} from "../Component/Footer/Footer.jsx";
import {useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";

export function Login(){
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="App">
            <Header />
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
                    <Button className="create-account-button" variant="contained">Créer un compte</Button>
                </div>
            </main>
            <Footer/>
        </div>
    );
}