import { useEffect, useState } from 'react';

export function BidAPI() {

    const [bids, setBids] = useState([]);

    useEffect(() => {    fetch('http://localhost:8080/bids/')
        .then(response => response.json())
        .then(data => setBids(data));  }, []);

    return (
        <div>
            <h1>Liste des enchères</h1>
            <ul>
                {bids.map(bid => (
                    <li key={bid.idBid}>
                        {bid.bidDate} - {bid.offer} € par {bid.bidder.username} pour le produit {bid.product.nameProduct}
                    </li>
                ))}
            </ul>
        </div>
    );
}