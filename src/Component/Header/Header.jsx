import './Header.css';
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../Context/AuthContext.jsx";

export function Header() {
    const navigate = useNavigate();

    function isLoggedIn() {
        return localStorage.getItem('authToken') !== null;
    }

    console.log(isLoggedIn())

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
                    <Button component={Link} to="/auth/login">
                        Mon profil
                    </Button>
                    <Button onClick={() => auth.logout()}>
                        Déconnexion
                    </Button>
                </div>
                :
                <div className="user-profile">
                    <Button component={Link} to="/auth/login">
                        Login
                    </Button>
                </div>}
        </header>
    );
}
