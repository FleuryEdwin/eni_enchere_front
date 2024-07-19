import './Register.css';
import {Button, TextField} from "@mui/material";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

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
    const [errors, setErrors] = useState({
        userName: false,
        firstName: false,
        phone: false,
        postalCode: false,
        password: false,
        familyName: false,
        email: false,
        address: false,
        city: false,
    })

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
                console.log("Utilisateur enregistré avec succès");
                navigate("/")
            } else if (response.status === 400) {
                console.error("Échec de l'enregistrement de l'utilisateur");
                const errorData = await response.json();
                console.log(errorData)
            } else {
                console.error("Erreur lors de l'enregistrement de l'utilisateur");
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
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Pseudo :"
                                error={errors.username}
                                helperText={errors.userName ? "Invalid first name" : ""}
                                value={userName}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Prénom :"
                                error={errors.firstName}
                                helperText={errors.firstName ? "Invalid first name" : ""}
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Nom :"
                                error={errors.familyName}
                                helperText={errors.familyName ? "Invalid first name" : ""}
                                value={familyName}
                                onChange={event => setFamilyName(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Email :"
                                error={errors.email}
                                helperText={errors.email ? "Invalid first name" : ""}
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Téléphone :"
                                error={errors.phone}
                                helperText={errors.phone ? "Invalid first name" : ""}
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Rue :"
                                error={errors.address}
                                helperText={errors.address ? "Invalid first name" : ""}
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Ville :"
                                error={errors.city}
                                helperText={errors.city ? "Invalid first name" : ""}
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Code postal :"
                                error={errors.postalCode}
                                helperText={errors.postalCode ? "Invalid first name" : ""}
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
                                error={errors.password}
                                helperText={errors.password ? "Invalid first name" : ""}
                                value={password}
                                onChange={event => setPassword(event.target.value)}
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
                        <div className={"container-button-confirm"}>
                            <Button className="button" variant="contained" onClick={handleSubmit}>
                                Confirmer
                            </Button>
                        </div>
                        <div className={"container-button-cancel"}>
                            <Button className="button" variant="contained" component={Link} to="http://localhost:5173/auth/login">Annuler</Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}