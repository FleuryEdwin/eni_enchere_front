import './Home.css';
import '../EnchereHome.css';
import { ProductList } from "../Component/Products/ProductList.jsx";
import { useLocation } from "react-router-dom";

export function Home() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const productAdded = searchParams.get('productAdded') === 'true';



    return (
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column"}}>
            {productAdded && <div style={{color:"green"}}>Le produit a été ajouté avec succès !</div>}

            <div className={"flex-box"}>
                <ProductList />
            </div>

        </div>
    );
}
