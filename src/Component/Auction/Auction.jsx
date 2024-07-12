import './Auction.css'

export function Auction() {

    return(
        <div className="box">
            <div className="photo">
                <img src="lien-de-votre-image.jpg" alt="Photo"/>
            </div>
            <div className="description">
                <h3>Nom du produit</h3>
                <p>Prix : </p>
                <p>Fin de l'enchère : </p>
                <p>Vendeur : </p>
            </div>
        </div>
    )
}