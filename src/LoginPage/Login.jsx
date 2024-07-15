import './Login.css'
import {Header} from "../Component/Header/Header.jsx";
import {Footer} from "../Component/Footer/Footer.jsx";
import {useState} from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";



export function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8080/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                // Appel de l'API
                const data = await response.json();
                console.log("Connexion réussie :", data);
                //TODO stocker le jeton d'authentification ou effectuez d'autres actions nécessaires

            } else {
                console.error("Échec de la connexion");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <div className="App">
            <Header />
            <main>
                <form onSubmit={handleSubmit}>
                    <div className={"container"}>
                        <TextField
                            id="outlined-basic"
                            className="input"
                            label="Identifiant"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
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
                        <Button variant="contained" type="submit">Connexion</Button>
                        <FormControlLabel className="checkBox" control={<Checkbox/>} label="Se souvenir de moi"/>
                    </div>
                    <div className={"create-account-container"}>
                        <Button className="create-account-button" variant="contained">Créer un compte</Button>
                    </div>
                </form>
            </main>
            <Footer/>
        </div>
    );
}