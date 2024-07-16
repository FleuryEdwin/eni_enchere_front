import {useAuth} from "../Context/AuthContext.jsx";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export function UserProfile(){
    const auth = useAuth()
    return(
        <div>
            <ul>
                <li>Pseudo: {auth.user?.username}</li>
                <li>Nom: {auth.user?.familyName}</li>
                <li>Prénom: {auth.user?.firstName}</li>
                <li>Email: {auth.user?.email}</li>
                <li>Teléphone: {auth.user?.phone}</li>
                <li>Rue: {auth.user?.address}</li>
                <li>Code postal: {auth.user?.postalCode}</li>
                <li>Ville: {auth.user?.city}</li>
            </ul>
        <div>
            <Button variant="contained" component={Link} to="/auth/login">Modifier</Button>
        </div>
        </div>
    )
}