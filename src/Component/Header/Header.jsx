import './Header.css';
import {Button} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function Header() {
    const tokenBlacklist = localStorage.getItem('authToken')
    const navigate = useNavigate();

    const handleDisconnect = async(event) =>{
        event.preventDefault()

        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tokenBlacklist),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("deconnexion réussie :", data);
                // Redirige vers la page d'accueil
                navigate("/");
            } else {
                console.error("Échec de la deconnexion");
            }
        } catch (error) {
            console.error("Erreur lors de la deconnexion :", error);
        }
    }

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
                    <Button onClick={handleDisconnect}>
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
