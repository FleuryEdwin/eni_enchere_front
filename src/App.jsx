import { Header } from './Component/Header/Header.jsx';
import { Footer } from './Component/Footer/Footer.jsx';
import './App.css';
import './EnchereHome.css';
import {Button, Input, InputAdornment, InputLabel, Select, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {AuctionList} from "./Component/Auction/AuctionList.jsx";

function App(){
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Toutes');

    useEffect(()=> {
        fetch('http://localhost:8080/categories').then(response => response.json()).then(data => {
            console.log(data)
            setCategories(data);
        }).catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="App">
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
                            value={selectedCategory}
                            className={"select"}
                            onChange={event => setSelectedCategory(event.target.value)}
                        >
                            <MenuItem value={""}>Toutes</MenuItem>
                            {categories.map(cat => (
                                <MenuItem key={cat.id} value={cat.label}>{cat.label}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className={"container-button-search"}>
                        <Button className="button" variant="contained">Rechercher</Button>
                    </div>
                </div>
                <div className={"flex-box"}>
                    <AuctionList />
                </div>
                <div className={"column column-right"}>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
