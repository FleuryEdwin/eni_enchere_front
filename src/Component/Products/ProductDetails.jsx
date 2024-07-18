import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Button, TextField } from "@mui/material";
import {AuthContext} from "../../Context/AuthContext.jsx";
import "./ProductAdd.css";
export function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [offer, setOffer] = useState("");
    const { getUser, user ,token} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error("Error fetching product: ", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching product: ", error);
            }
        };

        fetchProduct();
        getUser(); // Récupérez l'utilisateur connecté
    }, [id]);

    const handleBidSubmit = async (event) => {
        event.preventDefault();

        const bidData = {
            bidDate: new Date().toISOString().split("T")[0],
            offer: parseInt(offer),
            bidderId: user?.idUser, // Utilisez l'opérateur optionnel pour éviter les erreurs si user est null
            productId: product.idProduct,
        };

        try {
            const response = await fetch(`http://localhost:8080/bids/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bidData),
            });

            if (response.ok) {

                navigate("/")
                console.log("Nouvelle enchère soumise avec succès");
            } else {
                console.error("Échec de la soumission de l'enchère");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission de l'enchère :", error);
        }
    };

    return (
        <div className="product">
            <h1>Ajouter un objet à vendre</h1>
        <div className="productDetail">
            {product && (
                <>
                    <h2>{product.nameProduct}</h2>
                    <p>Catégorie : {product.categoryLabel}</p>
                    <p>Meilleure offre en cours : {product.highestBid} € par : {product.highestBidder}</p>
                    <p>Mise à prix: {product.startPrice} €</p>
                    <p>Date de fin d'enchère : {product.auctionEnd}</p>
                    <p>Retrait : {product.address}</p>
                    <p>Vendeur : {product.sellerUsername} </p>


                    {user && (
                        <form onSubmit={handleBidSubmit}>
                            <TextField
                                id="outlined-basic"
                                className="input"
                                label="Nouvelle enchère"
                                type="number"
                                value={offer}
                                onChange={(event) => setOffer(event.target.value)}
                            />
                            <Button style={{marginTop: 20}} variant="contained" type="submit">
                                Enchérir
                            </Button>
                        </form>
                    )}
                </>
            )}
        </div>
        </div>
    );
}
