import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.jsx";
import {useContext} from "react";


export function UserProfile(){
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleClick = (idUser) => {
        idUser = user.idUser
        navigate(`/users/${idUser}/profile/edit`);
    };

    return(
        <div className="Profile">
            <p>Pseudo: {user.username}</p>
            <p>Nom: {user.familyName}</p>
            <p>Prénom: {user.firstName}</p>
            <p>Email: {user.email}</p>
            <p>Teléphone: {user.phone}</p>
            <p>Rue: {user.address}</p>
            <p>Code postal: {user.postalCode}</p>
            <p>Ville: {user.city}</p>
        <div>
            <Button variant="contained" onClick={handleClick}>Modifier</Button>
        </div>
        </div>
    )
}
