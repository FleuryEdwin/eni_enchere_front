import './Header.css';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function Header() {

    function isLoggedIn() {
        return localStorage.getItem('authToken') !== null;
    }

    console.log(isLoggedIn())

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
                    <Button component={Link} to="/auth/login">
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
