import {Button, Input, InputAdornment, InputLabel, MenuItem, Select} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useEffect, useState} from "react";
import "./Auction.css"
import {useNavigate} from "react-router-dom";
export function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/products/')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearch = () => {
        if (selectedCategory) {
            fetch(`http://localhost:8080/products/category/${selectedCategory}`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));
        } else {
            fetch('http://localhost:8080/products/')
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error fetching products:', error));
        }
    };
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}/detail`);
    };
    return (
        <div className="home">
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
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">Toutes</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat.id} value={cat.label}>{cat.label}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div className={"container-button-search"}>
                    <Button className="button" variant="contained" onClick={handleSearch}>Rechercher</Button>
                </div>
            </div>
            <div style={{display:"flex", flexWrap:"wrap",justifyContent:'center'}}>
                {products.map((product) => (
                    <div className="box" key={product.idProduct} onClick={() => handleProductClick(product.idProduct)}>
                        <div className="photo">
                        <img style={{ borderRadius: 25 }} src={product.urlImg} alt="Photo" />
                        </div>
                        <div className="description">
                            <h3>{product.nameProduct}</h3>
                            <p>Prix : {product.startPrice} €</p>
                            <p>Fin de l'enchère : {product.auctionEnd}</p>
                            <p>Vendeur : {product.seller.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
