import './Header.css';
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext, useAuth} from "../../Context/AuthContext.jsx";
import {useContext} from "react";
import GavelIcon from '@mui/icons-material/Gavel';

export function Header() {

    const auth = useAuth()

    const { getUser, user } = useContext(AuthContext);

    const navigate = useNavigate()

    function isLoggedIn() {
        return localStorage.getItem('authToken') !== null;
    }

    const handleClick = (idUser) => {
        idUser = user.idUser
        navigate(`/users/${idUser}/profile`);
    };


    return (
        <header className="header">
            <div className="logo">
                <a href="/">Eni-Enchères <GavelIcon/></a>
            </div>
            {isLoggedIn() ?
                <div className="user-profile">
                    <Button style={{color:"white"}} component={Link} to="/auth/login">
                        Enchères
                    </Button>
                    <Button style={{color:"white"}} component={Link} to="/product/add">
                        Vendre un article
                    </Button>
                    <Button style={{color:"white"}} onClick={handleClick}>
                        Mon profil
                    </Button>
                    <Button style={{color:"white"}} onClick={() => auth.logout()}>
                        Déconnexion
                    </Button>
                    <p className="user-name">{user?.pseudo}: {user?.credit} crédit</p>
                </div>
                :

                <div className="user-profile">
                    <Button style={{color:"white"}} component={Link} to="/auth/login">
                        Login
                    </Button>
                </div>}
        </header>
    );
}
