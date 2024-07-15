import './Home.css';
import '../EnchereHome.css';
import {Button, Input, InputAdornment, InputLabel, Select, MenuItem} from "@mui/material";
import {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {AuctionList} from "../Component/Auction/AuctionList.jsx";

export function Home(){
    const [category, setCategory] = useState('Toutes');

    return (
        <div className="App">
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
                <div className={"flex-box"}>
                    <AuctionList/>
                </div>
                <div className={"column column-right"}>
                </div>
            </main>
        </div>
    );
}
