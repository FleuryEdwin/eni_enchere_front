import './Home.css';
import '../EnchereHome.css';
import {Button, Input, InputAdornment, InputLabel, Select, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {ProductList} from "../Component/Products/ProductList.jsx";
import {useLocation} from "react-router-dom";

export function Home(){
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Toutes');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productAdded = searchParams.get('productAdded') === 'true';
    useEffect(() => {
        fetch('http://localhost:8080/categories').then(response => response.json()).then(data => {
            console.log(data)
            setCategories(data);
        }).catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
      <div>
                {productAdded && <div>Le produit a été ajouté avec succès !</div>}

                <div className={"search"}>
                    <h1>Liste des enchères</h1>
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
                            <MenuItem value={"Informatique"}></MenuItem>
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
                    <ProductList/>
                </div>
                <div className={"column column-right"}>
                </div>
      </div>

    );
}
