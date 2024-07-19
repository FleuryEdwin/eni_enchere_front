import { useContext, useEffect, useState } from 'react';
import { Button, Input, InputAdornment, InputLabel, MenuItem, Select, FormControl, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import "./Auction.css"
import { AuthContext } from "../../Context/AuthContext.jsx";

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedSalesOptions, setSelectedSalesOptions] = useState([]);
    const [selectedBidsOptions, setSelectedBidsOptions] = useState([]);
    const {user, token} = useContext(AuthContext);
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
        let url = 'http://localhost:8080/products/';
        if (selectedCategory) {
            url += `category/${selectedCategory}`;
        } else if (searchTerm) {
            url += `by-product-name/${searchTerm}`;
        } else if (filter === 'mySales') {
            url = `http://localhost:8080/products/user-sales/${user.idUser}`;
        } else if (filter === 'myBids') {
            url = `http://localhost:8080/user-bids/${user.idUser}`;
        }
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                let filteredData = data;
                if (filter === 'mySales') {
                    filteredData = data.map((product) => {
                        if (selectedSalesOptions.includes('sold') && !product.sold) {
                            return null;
                        }
                        if (selectedSalesOptions.includes('ongoing') && product.sold) {
                            return null;
                        }
                        return product;
                    }).filter(product => product !== null);
                } else if (filter === 'myBids') {
                    filteredData = data.map((product) => {
                        if (selectedBidsOptions.includes('ongoing') && product.sold) {
                            return null;
                        }
                        return product;
                    }).filter(product => product !== null);
                }
                setProducts(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setProducts([]);
                alert('Une erreur est survenue lors de la récupération des données. Veuillez réessayer plus tard.');
            });
    };


    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}/detail`);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSalesOptionChange = (option) => {
        setSelectedSalesOptions((prevOptions) =>
            prevOptions.includes(option)
                ? prevOptions.filter((o) => o !== option)
                : [...prevOptions, option]
        );
    };

    const handleBidsOptionChange = (option) => {
        setSelectedBidsOptions((prevOptions) =>
            prevOptions.includes(option)
                ? prevOptions.filter((o) => o !== option)
                : [...prevOptions, option]
        );
    };

    return (
        <div className="home">
            <h1>Liste des enchères</h1>
            <div className={"search"}>
                <div className={"searchBar"}>
                    <InputLabel htmlFor="outlined-basic">
                        Filtres
                    </InputLabel>
                    <Input
                        id="outlined-basic"
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
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
                </div>

                {user && (
                    <div className={"container-button-filter"}>
                        <div className={"filter"}>
                            <RadioGroup value={filter} onChange={handleFilterChange}>
                                <FormControlLabel value="all" control={<Radio />} label="Tous les produits" />
                                <FormControlLabel
                                    value="mySales"
                                    control={<Radio />}
                                    label="Mes ventes"
                                />
                                {filter === 'mySales' && (
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedSalesOptions.includes('sold')}
                                                    onChange={() => handleSalesOptionChange('sold')}
                                                />
                                            }
                                            label="Vendus"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedSalesOptions.includes('ongoing')}
                                                    onChange={() => handleSalesOptionChange('ongoing')}
                                                />
                                            }
                                            label="Enchères en cours"
                                        />
                                    </div>
                                )}
                                <FormControlLabel
                                    value="myBids"
                                    control={<Radio />}
                                    label="Mes enchères"
                                />
                                {filter === 'myBids' && (
                                    <div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={selectedBidsOptions.includes('ongoing')}
                                                    onChange={() => handleBidsOptionChange('ongoing')}
                                                />
                                            }
                                            label="Enchères en cours"
                                        />
                                    </div>
                                )}
                            </RadioGroup>
                        </div>
                    </div>
                )}
                <Button className="button" variant="contained" onClick={handleSearch}>Rechercher</Button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: 'center' }}>
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
