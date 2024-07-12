import { Header } from './../Component/Header/Header.jsx';
import { Footer } from './../Component/Footer/Footer.jsx';
import './Register.css';
import {Button, FormControlLabel, TextField} from "@mui/material";
import {useState} from "react";

export function Register(){
    const[pseudo, setPseudo] = useState("")
    const[firstName, setFirstName] = useState("")
    const[phone, setPhone] = useState("")
    const[postalCode, setPostalCode] = useState("")
    const[password, setPassword] = useState("")
    const[lastName, setLastName] = useState("")
    const[email, setEmail] = useState("")
    const[address, setAddress] = useState("")
    const[city, setCity] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    return (
        <div className="App">
            <Header />
            <main>
                <h2>Mon Profil</h2>
                <div className="form-container">
                    <form className="register-form" onSubmit="">
                        <div className="column column-left">
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Pseudo :"
                                    value={pseudo}
                                    onChange={event => setPseudo(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Prénom :"
                                    value={firstName}
                                    onChange={event => setFirstName(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Téléphone :"
                                    value={phone}
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Code postal :"
                                    value={postalCode}
                                    onChange={event => setPostalCode(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-password-input"
                                    className="input"
                                    label="Mot de passe :"
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </div>
                            <div className={"container-button-confirm"}>
                                <Button className="button" variant="contained">Confirmer</Button>
                            </div>
                        </div>
                        <div className="column column-right">
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Nom :"
                                    value={lastName}
                                    onChange={event => setLastName(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Email :"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Rue :"
                                    value={address}
                                    onChange={event => setAddress(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Ville :"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                />
                            </div>
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-password-input"
                                    className="input"
                                    label="Confirmation :"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                />
                            </div>
                            <div className={"container-button-cancel"}>
                                <Button className="button" variant="contained">Annuler</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <Footer/>
        </div>
    );
}