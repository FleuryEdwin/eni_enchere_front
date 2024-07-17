import"./ProductAdd.css";
import {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from '@mui/material';
import {AuthContext} from "../../Context/AuthContext.jsx";

const ProductAdd = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [auctionStart, setAuctionStart] = useState('');
    const [auctionEnd, setAuctionEnd] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [finalPrice, setFinalPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [saleState, setSaleState] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories :', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const selectedCategoryObject = categories.find(category => category.label === selectedCategory);

        const newProduct = {
            nameProduct,
            descriptionProduct,
            auctionStart,
            auctionEnd,
            startPrice,
            finalPrice,
            sellerId: user.idUser,
            categoryId: selectedCategoryObject.idCat,
            saleState,
            urlImg,
        };

        try {
            const response = await fetch('http://localhost:8080/products/add', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                navigate('/?productAdded=true');
            } else {
                setMessage('Erreur lors de l\'ajout du produit');
            }
        } catch (error) {
            setMessage('Erreur lors de l\'ajout du produit : ' + error.message);
        }
    };

    return (
        <div style={{width: 500, display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <h2>Mettre un objet en vente</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nom du produit"
                    value={nameProduct}
                    onChange={(e) => setNameProduct(e.target.value)}
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField label="Description du produit" value={descriptionProduct}
                           onChange={(e) => setDescriptionProduct(e.target.value)} margin="normal" fullWidth required
                           multiline rows={4}/>

                <TextField label="Date de début de l'enchère" type="date" value={auctionStart}
                           onChange={(e) => setAuctionStart(e.target.value)} margin="normal" fullWidth required
                           InputLabelProps={{shrink: true}}/>

                <TextField label="Date de fin de l'enchère" type="date" value={auctionEnd}
                           onChange={(e) => setAuctionEnd(e.target.value)} margin="normal" fullWidth required
                           InputLabelProps={{shrink: true}}/>

                <TextField label="Prix de départ" type="number" value={startPrice}
                           onChange={(e) => setStartPrice(e.target.value)} margin="normal" fullWidth required/>

                <FormControl margin="normal" fullWidth required> <InputLabel
                    id="category-select-label">Catégorie</InputLabel> <Select labelId="category-select-label"
                                                                              value={selectedCategory}
                                                                              onChange={(e) => setSelectedCategory(e.target.value)}
                                                                              label="Catégorie"> <MenuItem
                    value="">Toutes</MenuItem> {categories.map((category) => (
                    <MenuItem key={category.idCat} value={category.label}>{category.label}</MenuItem>))} </Select>
                    <FormHelperText>Sélectionnez la catégorie</FormHelperText> </FormControl>
                <TextField label="État de la vente" value={saleState} onChange={(e) => setSaleState(e.target.value)}
                           margin="normal" fullWidth required/>

                <TextField label="URL de l'image" value={urlImg} onChange={(e) => setUrlImg(e.target.value)}
                           margin="normal" fullWidth required/>

                <Button type="submit" variant="contained" color="primary" fullWidth> Ajouter le produit </Button></form>
        </div>);
};
export default ProductAdd;
