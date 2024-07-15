import {useEffect, useState} from 'react';
import '../AuctionList/Auction.css';
import {useNavigate} from "react-router-dom";

export function ProductList() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/products/');
                if (response.ok) {
                    const data = await response.json();
                    console.error(data)
                    setProduct(data);
                } else {
                    console.error('Error fetching bids:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching bids:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleClick = (productId) => {
        navigate(`/products/${productId}/detail`);
    };

    return (
        <div className="auction-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {product.map((bid) => (
                <div className="box" key={bid.id}>
                    <div className="photo">
                        <img style={{ borderRadius: 25 }} src={product.urlImg} alt="Photo" />
                    </div>
                    <div className="description">
                        <h3 onClick={() => handleClick(product.idProduct)}>{product.nameProduct}</h3>
                        <p>Prix : {bid.offer} €</p>
                        <p>Fin de l'enchère : {product.auctionEnd}</p>
                        {/*<p>Vendeur : {product.seller.username}</p>*/}
                    </div>
                </div>
            ))}
        </div>
    );
}
