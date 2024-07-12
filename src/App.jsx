import { Header } from './Component/Header/Header.jsx';
import { Footer } from './Component/Footer/Footer.jsx';
import './App.css';
import './EnchereHome.css';
import {Button, FormControlLabel, Input, InputAdornment, InputLabel, Select, MenuItem} from "@mui/material";
import {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Auction} from "./Component/Auction/Auction.jsx";
import {BidAPI} from "./BidsAPI.jsx";

function App(){
    const [category, setCategory] = useState('Toutes');

    return (
        <div className="App">
            <BidAPI />
            <Header />
            <main>
                <div className={"search"}>
                <h2>Liste des enchères</h2>
                    <div className={"searchBar"}>
                        <InputLabel htmlFor="outlined-basic">
                            Filtres
                        </InputLabel>
                        <Input
                            id="outlined-basic"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div className={"select-categorie"}>
                        <Select
                            id={"select-categorie"}
                            value={category}

                            className={"select"}
                            onChange={event => setCategory(event.target.value)}
                        >
                            <MenuItem value={""}>Toutes</MenuItem>
                            <MenuItem value={"informatique"}>Informatique</MenuItem>
                            <MenuItem value={"furnishings"}>Ameublement</MenuItem>
                            <MenuItem value={"clothes"}>Vêtement</MenuItem>
                            <MenuItem value={"sport"}>Sport&Loisirs</MenuItem>
                        </Select>
                    </div>
                    <div className={"container-button-search"}>
                        <Button className="button" variant="contained">Rechercher</Button>
                    </div>
                </div>
                <div className={"column row-left"}>
                    <Auction/>
                </div>
                <div className={"column column-right"}>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
