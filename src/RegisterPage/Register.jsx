import './Register.css';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Register(){
    const[userName, setUsername] = useState("")
    const[firstName, setFirstName] = useState("")
    const[phone, setPhone] = useState("")
    const[postalCode, setPostalCode] = useState("")
    const[password, setPassword] = useState("")
    const[familyName, setFamilyName] = useState("")
    const[email, setEmail] = useState("")
    const[address, setAddress] = useState("")
    const[city, setCity] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")
    const country = "test"

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            userName,
            firstName,
            familyName,
            email,
            phone,
            address,
            postalCode,
            city,
            password,
            country,
        }

        console.log(userData)

        try {
            const response = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                // Traitez la réponse de l'API ici, par exemple :
                console.log("Utilisateur enregistré avec succès");
                navigate("/")
            } else {
                console.error("Échec de l'enregistrement de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
        }
    }

    return (
        <div className="App">
            <main>
                <h2>Mon Profil</h2>
                <div className="form-container">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="column column-left">
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Pseudo :"
                                    value={userName}
                                    onChange={event => setUsername(event.target.value)}
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
                                <Button
                                    className="button"
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Confirmer
                                </Button>
                            </div>
                        </div>
                        <div className="column column-right">
                            <div className={"container-input"}>
                                <TextField
                                    id="outlined-basic"
                                    className="input"
                                    label="Nom :"
                                    value={familyName}
                                    onChange={event => setFamilyName(event.target.value)}
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
        </div>
    );
}