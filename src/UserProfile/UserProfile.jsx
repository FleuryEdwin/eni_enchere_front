import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.jsx";
import {useContext} from "react";


export function UserProfile(){
    const { getUser, user } = useContext(AuthContext);
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
            <Button variant="contained" component={Link} to="/auth/login">Modifier</Button>
        </div>
        </div>
    )
}
