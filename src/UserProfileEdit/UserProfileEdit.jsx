import {Button, TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext.jsx";
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import './UserProfileEdit.css'

export function UserProfileEdit() {
    const { user, updateUser, token } = useContext(AuthContext);

    const[username, setUsername] = useState("")
    const[firstName, setFirstName] = useState("")
    const[phone, setPhone] = useState("")
    const[postalCode, setPostalCode] = useState("")
    //const[password, setPassword] = useState("")
    const[familyName, setFamilyName] = useState("")
    const[email, setEmail] = useState("")
    const[address, setAddress] = useState("")
    const[city, setCity] = useState("")
    //const[confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setFirstName(user.firstName);
            setPhone(user.phone);
            setPostalCode(user.postalCode);
            setFamilyName(user.familyName);
            setEmail(user.email);
            setAddress(user.address);
            setCity(user.city);
        }
    }, [user]);

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const idUser = user.idUser
        const userProfileData = {
            username,
            firstName,
            phone,
            postalCode,
            familyName,
            email,
            address,
            city,
            password: user.password,
        }

        try {
            const response = await fetch(`http://localhost:8080/users/${idUser}/profile/edit`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(userProfileData),
            });
            if (response.ok) {
                console.log("Utilisateur modifié avec succès");
                updateUser(userProfileData);
                navigate(`/`);
            } else {
                console.error("Échec de la modification de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur :", error);
        }
    }

    const handleDelete = async (event) =>{
        event.preventDefault()
        const idUser = user.idUser

        try {
            const response = await fetch(`http://localhost:8080/users/${idUser}/delete`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                console.log("Utilisateur supprimé avec succès");
                navigate(`/`);
            } else {
                console.error("Échec de la suppression de l'utilisateur");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
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
                                className="input"
                                label="Pseudo :"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Prénom :"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Nom :"
                                value={familyName}
                                onChange={event => setFamilyName(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Email :"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Téléphone :"
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Rue :"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Ville :"
                                value={city}
                                onChange={event => setCity(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Code postal :"
                                value={postalCode}
                                onChange={event => setPostalCode(event.target.value)}
                            />
                        </div>
                        {/*<div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Mot de passe :"
                                type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                        <div className={"container-input"}>
                            <TextField
                                className="input"
                                label="Confirmation :"
                                type="password"
                                value={confirmPassword}
                                onChange={event => setConfirmPassword(event.target.value)}
                            />
                        </div>*/}
                        <p>Crédit: {user.credit}</p>
                        <div className={"container-button-delete"}>
                            <Button
                                className="button"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon/>}
                                style={{top:"75px"}}
                                onClick={handleDelete}
                            >
                                Supprimer mon compte
                            </Button>
                        </div>
                        <div className={"container-button-confirm"}>
                            <Button className="button-delete" variant="contained" type="submit">
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}