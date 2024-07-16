import './Header.css';
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext, useAuth} from "../../Context/AuthContext.jsx";
import {useContext} from "react";

export function Header() {

    const { getUser, user } = useContext(AuthContext);

    const navigate = useNavigate()

    function isLoggedIn() {
        return localStorage.getItem('authToken') !== null;
    }

    const handleClick = (idUser) => {
        idUser = user.idUser
        navigate(`/users/${idUser}/profile`);
    };

    const auth = useAuth()

    return (
        <header className="header">
            <div className="logo">
                <a href="/public">Eni-Enchères</a>
            </div>
            {isLoggedIn() ?
                <div className="user-profile">
                    <Button component={Link} to="/auth/login">
                        Enchères
                    </Button>
                    <Button component={Link} to="/auth/login">
                        Vendre un article
                    </Button>
                    <Button onClick={handleClick}>
                        Mon profil
                    </Button>
                    <Button onClick={() => auth.logout()}>
                        Déconnexion
                    </Button>
                </div>
                :
                <div className="user-profilee">
                    <Button component={Link} to="/auth/login">
                        Login
                    </Button>
                </div>}
        </header>
    );
}
