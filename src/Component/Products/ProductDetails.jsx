import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export function ProductDetails() {
    const { id } = useParams();
    const [bid, setBid] = useState(null);
    const [offer, setOffer] = useState("");

    useEffect(() => {
        const fetchBid = async () => {
            try {
                const response = await fetch(`http://localhost:8080/bids/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBid(data);
                } else {
                    console.error("Error fetching bid: ", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching bid: ", error);
            }
        };

        fetchBid();
    }, [id]);

    const handleBidSubmit = async (event) => {
        event.preventDefault();

        const bidData = {
            offer,
        };

        try {
            const response = await fetch(`http://localhost:8080/bids/${bid.idBid}/offer`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bidData),
            });

            console.error(bidData)
            if (response.ok) {
                // Traitement de la réponse réussie (mise à jour de l'interface, etc.)
                console.log("Nouvelle enchère soumise avec succès");
            } else {
                console.error("Échec de la soumission de l'enchère");
            }
        } catch (error) {
            console.error("Erreur lors de la soumission de l'enchère :", error);
        }
    };

    return (
        <div>
            {bid && (
                <>
                    <h2>{bid.product.nameProduct}</h2>
                    <p>Catégorie : {bid.product.category.label}</p>
                    <p>Vendeur : {bid.product.seller.username} ({bid.product.seller.address})</p>
                    <p>Date de fin d'enchère : {bid.auctionEnd}</p>
                    <p>Meilleure offre en cours : {bid.finalPrice} €</p>
                    <p>Offre de départ : {bid.product.startPrice} €</p>
                    <form onSubmit={handleBidSubmit}>
                        <TextField
                            id="outlined-basic"
                            className="input"
                            label="Nouvelle enchère"
                            type="number"
                            value={offer}
                            onChange={(event) => setOffer(event.target.value)}
                        />
                        <Button variant="contained" type="submit">
                            Enchérir
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
}
