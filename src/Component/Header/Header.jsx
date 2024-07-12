import './Header.css';
import {Button} from "@mui/material";

export function Header() {
    return (
        <header className="header">
            <div className="logo">
                <a href="/public">Eni-Enchères</a>
            </div>
            <div className="user-profile">
                <Button>Login</Button>
            </div>
        </header>
    );
}
