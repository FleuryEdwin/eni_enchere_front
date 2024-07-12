import {useEffect, useState} from 'react';
import './Auction.css';

export function AuctionList() {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await fetch('http://localhost:8080/bids/');
                if (response.ok) {
                    const data = await response.json();
                    setBids(data);
                } else {
                    console.error('Error fetching bids:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchBids();
    }, []);

    return (

        <div className="auction-list" style={{display: 'flex', flexWrap: 'wrap', justifyContent:'center'}}>
            {bids.map((bid) => (
                <div className="box" key={bid.id}>
                    <div className="photo">
                        <img src="lien-de-votre-image.jpg" alt="Photo"/>
                    </div>
                    <div className="description">
                        <h3>{bid.product.nameProduct}</h3>
                        <p>Prix : {bid.offer} €</p>
                        <p>Fin de l'enchère : {bid.auctionEnd}</p>
                        <p>Vendeur : {bid.product.seller.username}</p>
                    </div>
                </div>
            ))}
        </div>

    );
}