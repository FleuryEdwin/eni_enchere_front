import './Header.css';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export function Header() {



    return (
        <header className="header">
            <div className="logo">
                <a href="/public">Eni-Enchères</a>
            </div>
            <div className="user-profile">
                <Button
                    component={Link}
                    to="/auth/login"
                >
                    Login
                </Button>
            </div>
        </header>
    );
}
