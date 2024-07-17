import './Home.css';
import '../EnchereHome.css';
import { Button, Input, InputAdornment, InputLabel, Select, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { ProductList } from "../Component/Products/ProductList.jsx";
import { useLocation } from "react-router-dom";

export function Home() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productAdded = searchParams.get('productAdded') === 'true';



    return (
        <div>
            {productAdded && <div>Le produit a été ajouté avec succès !</div>}

            <div className={"flex-box"}>
                <ProductList />
            </div>

        </div>
    );
}
